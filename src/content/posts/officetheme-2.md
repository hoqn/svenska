---
title: 글꼴을 다루는 웹 앱
subtitle: "MS Office Theme Tools #2"
created_at: 2024-06-30
edited_at: 2024-07-08
series: project-officetheme
tags:
  - Local Font Access API
---
> [!info] 배포 중이에요!
> [https://officetheme.netlify.app](https://officetheme.netlify.app)

## 글꼴 테마

#### 글꼴 테마 형식

글꼴 테마를 구성하는 xml 형식은 다음과 같다. ([MS OpenXml 스펙](https://learn.microsoft.com/en-us/dotnet/api/documentformat.openxml.drawing.fontscheme?view=openxml-3.0.1))

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

스펙은 정말 스펙만 나열되어 있을 뿐, 실제 적용되는지는 직접 테스트해봐야 했다. 다음 조건을 충족해야 했다.

- 필수 조건
	- `a` 네임스페이스 사용
	- `majorFont`, `minorFont`
	- `latin`, `ea`, `cs`는 필수로 존재
- 선택 조건
	- `font script="..."`는 `latin`, `ea`, `cs` 외에 더 구체적으로 문자에 대해 글꼴을 설정할 때만 사용하면 된다.

#### 글꼴 테마 구성 UX

글꼴 테마 구성 기능을 이용할 때 필요한 사용자 경험이 무엇이 있을지 생각해보았다.

- 사용자 글꼴 목록 조회: 애초에 Office의 글꼴 테마는 사용자 글꼴에서 불러오는 게 기본이다. 따라서 설정할 때 사용자 글꼴 목록이 조회되면 좋다. 물론, 사용자 글꼴 목록에 없다고 선택할 수 없도록 하는 건 좀 위험할 듯

- 글꼴 실시간 적용: 어찌보면 당연한 UX다. Word에서 글꼴 선택 창을 누르면 글꼴 이름이 해당 글꼴이 적용된 채로 목록에 표시된다. 이런 UX를 제공해야 한다.

- Xml 바로 적용: 당연히, 구성된 xml이 바로 특정 경로에 저장돼서 바로 적용되면 좋을 듯 하다!

## 개발

#### 사용자 글꼴 목록 조회 – Local Font Access API

웹에서 사용자 글꼴 목록을 조회할 수 있을까? 결론은, **제한적으로 가능**하다.

Web API에는 [Local Font Access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API)가 있다. 이는 정확히 내가 원하는 기능을 제공한다. 사용자 컴퓨터에 설치된 글꼴 정보를 브라우저에서 불러올 수 있다. 하지만, *실험적 기능*으로 올라와 있으며, Blink 계열(크롬, 엣지)에서만 지원한다.

이런 문제점이 있긴 하지만… 애초에 다른 대안이 없기 때문에 크롬에 대해서 사용자 글꼴 목록을 불러오는 것으로 개발 방향을 정하였다. 동시에 사파리와 같은 미지원 브라우저에 대해서는 안내 멘트를 제공해야 할 것이다.

이 API에 대해서는 별도의 문서에서 다루겠다.

#### 글꼴 실시간 적용

글꼴을 실시간으로 적용하는 것은 간단하다. CSS의 `font-family`에 해당 글꼴 이름을 넣어주면 된다. 존재하지 않으면, 알아서 fallback 폰트를 적용하기 때문에 큰 문제는 없을 것 같다.

다만, 구현 이후 성능에 대해 평가를 해볼 필요는 있어 보인다.

> [!note] 사파리에서의 문제점
> 
> 사파리에서는 로컬 폰트를 불러올 수 없다. Browser Fingerprinting을 막기 위한 조치라고 한다. [관련 기사](https://gizmodo.com/apple-declares-war-on-browser-fingerprinting-the-sneak-1826549108)
> 
> 아쉽지만, 이건 어쩔 수 없는 부분인 것 같다. 그래도 크롬 같은 다른 브라우저에선 매우 원활히 작동하니 다행이라 생각해야 할까.

#### XML 바로 적용

가장 좋은 UX 흐름은 당연히, XML 파일을 직접 다운로드받아 특정 경로에 옮기는 것이 아니라, 자동으로 특정 경로에 넣어주는 것이다. 하지만, 너무나 당연하게도 이런 동작은 **너무 위험하다**.

찾아보니, 당연히 이런 동작은 막혀있다. ㅎㅎ

#### File System API

File System API가 2023년 이후로 모든 브라우저에서 지원되는 기쁜 소식이 있었다. 나도 이 API를 활용하려 했다. 최초에 한 번만 해당 경로를 선택하게 해준 뒤 웹에서 생성되는 XML 파일을 자동으로 넣어주는 식으로 동작하면 될 거라 생각했다. 그러나…

###### File System API는 시스템 폴더에 대한 접근을 막습니다!

우선, macOS에서 글꼴 테마가 관리되는 경로는 다음과 같다. (Powerpoint, Word, Excel 등 모든 Office 계열 공통으로 사용되는 경로라 공유가 된다!)

```
~/Library/Group Containers/UBF8T346G9.Office/User Content.localized/Themes.localized/Theme Fonts
```

그러나 File System API로 이 경로를 선택하면 다음과 같은 메시지를 만날 수 있다.

```
이 폴더에는 시스템 파일이 포함되어 있으므로 ~에서 열 수 없습니다.
```

아마 `~/Library`와 같은 경로는 보안 상 차단하는 것 같았다. 방법은 최대한 찾아보고 있으나, 일단은 활용하지 못한다고 생각해야 할 것 같다 :(

## 개발 22 – OpenXML 처리

#### 자료 구조

OpenXML 처리를 위한 클래스들을 작성했다. 스펙 시트를 최대한 참고하였으나, 필요한 부분만 남겼다 :)

```ts
export class OpenXmlElement {
	public localName: string;
	public attributes: Record<string, any>;
	public childElements: OpenXmlElement[];
	
	constructor(localName: string) {
	this.localName = localName;
	this.attributes = {};
	this.childElements = [];
	}
	
	// 자식에 추가
	public appendChild
	... (생략)
}

export class MOLatinFont extends MOTextFontType {
  declare localName: "latin";
  ... (생략)
}
```

#### Class → XML String

이후 XML 관련 라이브러리로 대체할 예정이지만, 일단은 아래와 같이 직접 XML String을 만드는 코드를 작성해주었다.

```ts
// XML string 생성
public toXmlString(prefix?: string): string {
	let ret = "";

	// TODO: 현재는 구현의 편의를 위해 재귀적으로 구현. 추후 외부 라이브러리 또는 다른 방법으로 성능을 높여야 할 듯!

	const tag = prefix ? `${prefix}:${this.localName}` : `${this.localName}`;
	
	// Attributes 적용
	ret += "<";
	ret += [tag, ...Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`)].join(" ");
	
	if (this.childElements && this.childElements.length > 0) {
	  // 하위 엘리먼트 존재
	  ret += ">\n";
	  for (const child of this.childElements) {
		ret += child.toXmlString(prefix);
	  }
	  ret += "</" + tag + ">\n";
	} else {
	  // 단말 엘리먼트
	  ret += "/>\n";
	}
	
	return ret;
}
  ```

기능을 어느 정도 완성했으니, UI를 만들어보자!





