---
title: "React Server Component에서 주소를 먼저 변경하는 트릭"
created_at: 2023-10-12
draft: true
---

그러니까 내가 원하는 것은 아래와 같았다.

(검색 버튼 클릭) -> (주소가 ?q=value로 변경 + 데이터 fetch 시작, 로딩 화면 제공) -> (데이터 fetch 완료, 검색 결과 제공)

하지만 현실은 아래와 같았다.

(검색 버튼 클릭) -> (데이터 fetch 시작, 이전 화면에서 멈춤) -> (주소가 ?q=value로 변경 + 데이터 fetch 완료, 검색 결과 제공)


