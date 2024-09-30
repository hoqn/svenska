---
title: 안드로이드 6(M) 이하에서 한글을 포함한 URL이 제대로 작동되지 않는 문제
created_at: 2021-07-21 00:00:00
icon: 📦
series: project-hakkyoplus
tags:
  - 학교플러스
  - Android
---

## 문제점

안드로이드 6 이하 기기에서 학교 선택 시 학교 이름이나 종류(초등학교, 중학교...) 필터링 시 목록에 항상 0개만 노출되는 문제가 보고되었다. ~~최종 업데이트한 지 3개월이 넘게 몰랐다.~~

## 예상

Neis API 상에서 지역(관할 교육청) 코드는 `P10`, `E10` 등과 같이 기본 로마자와 숫자로만 이루어져 있다. 반면, 학교 이름이나 종류는 오직 한글로만 이루어져 있다.

그래서 안드로이드 버전에 따라 다르고, 지역 필터링은 작동하는 것을 보아 한글 인코딩 문제가 아닌가 생각했다.

## 해결

디버깅을 하다보니, 역시나 인코딩 문제가 맞았다. (~~이걸 3개월 넘게 몰랐다는 건 엄청난 잘못이다.~~)

해결방안으로는 API를 요청하기 전에 URL String에 `URLEncoder.encode (String s, String enc)`를 사용하면 된다.
(특별하게 다른 의도가 없다면 `enc`는 `UTF-8`로 하면 된다.)

## 원인

안드로이드 6 미만에선 URL Encoding이 기본적으로 UTF8으로 되어 있지 않았다.

`application/x-www-form-urlencoded` 형식의 데이터가 ASCII 기반으로 인코딩되는 방식이었고, 안드로이드 기본 API에서도 URL을 인코딩할 때 ISO-8859-1 인코딩을 사용하는 경우가 많았다고 한다.

6 이후로는 기본적으로 모두 UTF8 인코딩을 사용하기 때문에 비로마자 문자 사용 시에도 크게 신경 쓰지 않아도 된다.

https://stackoverflow.com/questions/49386588/volley-does-not-work-correctly-when-url-has-utf-8-on-android-version-less-than-5
