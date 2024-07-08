---
title: MS Office Theme Tools 개발
subtitle: "MS Office Theme Tools #1"
created_at: 2024-06-29
edited_at: 2024-07-08
series: project-officetheme
tags:
  - shadcn-ui
---

> [!info] 배포 중이에요!
> 
> [https://officetheme.netlify.app](https://officetheme.netlify.app)

난 MS Office를 많이 활용하는 편이다. 그래서 이런저런 기능을 많이 활용한다. 특히 이놈의 디자인 시스템 강박 때문에, 색상이나 글꼴은 거의 대부분 임의로 설정하지 않고 ‘테마’로 등록한 뒤에만 사용했다. 마치 개발 시에 임의의 hex color는 사용하지 않고 디자인 시스템의 token만 선택하는 것과 같이 말이다.

#### macOS에서의 Office는 이상한 곳에서 기능이 빠져있다.

하지만 황당하게도 macOS에서는 개인 테마 설정이 불가능하다. (간단한 건데 왜… ㅠㅠ) 다행히 찾아보니, 글꼴과 색상 테마 모두 특정 경로 아래의 xml 파일로 관리되고 있으며, 임의로 작성해 추가한 xml도 인식했다.

하지만 xml 파일의 형식을 제대로 파악하는 데 조금 시간이 걸렸다. 다행히 잘 정리된 글들도 보이긴 했지만, 어떤 구조라 이렇다! 하는 글보다는 그냥 일단 따라하기만 하라는 식의 글이 많았기 때문에 개인적으로 파악하는 데 시간이 조금 걸렸다.

> 아니 그럼, 이 xml을 생성해주는 서비스 자체가 있으면 되는 거 아닌가?

그래서 한 번 찾아보았다. 의외로(!) 이런 서비스나 개발된 패키지가 존재하지 않았다. 그럼 내가 만들어보자! 일단은 웹 프런트엔드만으로 충분히 커버 가능한 부분일 것 같았다.

> 의외로 색상 테마는 word에서는 추가할 수 없지만 powerpoint에서는 추가할 수 있다.(대체 왜?) 그래서 글꼴 테마 구성 기능부터 개발하기로 선택했다.

그럼 이를 서비스화할 수 있을까?

#### OpenXML

일단, XML의 형식은 MS에서 OpenXML이란 스펙으로 공개해놓고 있다. 확인해 본 결과, 설명이 조금 빈약한 부분이 분명 있긴 하지만(필수적인 항목, 옵셔널한 항목의 구분이 잘 되어 있지 않다던지..) 직접 테스트 해보며 구체화할 수 있었다.

참고로, 글꼴 테마의 경우 대략적으로 다음과 같은 형식을 따른다.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:fontScheme name="132123123" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
	<a:majorFont>
		<a:latin typeface="Pretendard"/>
		<a:ea typeface="Pretendard"/>
		<a:cs typeface="Pretendard"/>
		<a:font script="" typeface="Wawati SC"/>
	</a:majorFont>
	<a:minorFont>
		<a:latin typeface="Pretendard"/>
		<a:ea typeface="Pretendard"/>
		<a:cs typeface="Pretendard"/>
	</a:minorFont>
</a:fontScheme>
```

## 기획

글꼴과 색상 테마 xml을 생성해주는 서비스를 만들자. 더 확장한다면, 이 파일들을 공유할 수 있는 환경이 제공된다면 더 좋을 듯하다.

#### 개발 스택

개발 스택은 무얼 사용할까. 빠르게 완성도 있게 만들어보는 것이 목표였기에, Next.js까지는 도입하지 않고자 했다.(물론, 나중에 공유와 같은 커뮤니티 기능을 추가하다 보면 필요할지도 모르겠다. 그때 생각하기로!) 그냥 react-router-dom과 React.lazy를 적절히 조합해 사용하자.

- TypeScript
- React
- Vite
- react-router-dom

XML을 만드는 작업은 일단 직접 구현하기로 했다. 다만, 이후에는 XML을 파싱할 필요(불러오기 기능과 같이)도 있을 것 같아 관련 라이브러리를 계속 찾아보고 있다.

#### 디자인

이번에는 `shadcn/ui`를 활용해 빠르게 디자인 컴포넌트를 만들어보고자 한다. (이후 개발하며 느낀 것이지만, 완성도가 높고 간단한 라이브러리지만 은탄환은 아니었다.. 부딪히며 개선해야 할 부분이 매우 많았다.)

> [!info] shadcn/ui
> 
> Shadcn님이 만드신 UI 라이브러리 ‘빌드’ 툴로,  
> 엄밀히 말하면 간단히 가져다 쓰는 컴포넌트 라이브러리라기보다는 미리 선언된 컴포넌트들을 내 앱에 복붙해주는 느낌에 가깝다.  
> 
> RadixUI Primitives와 Tailwindcss에 기반해 만들어졌으며, 컴포넌트의 전체 코드가 복붙되기 때문에 커스텀에 조금 더 용이한 면이 있다.
>
> https://ui.shadcn.com/
