---
title: CORS란 무엇인가 (feat. nodejs cors)
toc: true
created_at: 2022-10-07 14:10:31
tags:
---

# CORS: Cross-Origin Resource Sharing

> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
> 주로 여기를 참고해서 정리했습니다. 제 개인 공부용으로 적어놓은 거라 그냥 참고만 해주세요^^

CORS는 추가 HTTP 헤더를 사용하여, 한 출처(Origin)에서 실행 중인 웹 애플리케이션이 다른 출처(Origin)의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다.
— mdn web docs

CORS는 한국어로 ‘교차 출처 리소스 공유’로 번역될 수 있다.

일단, **출처**가 무엇일까? 여기서 말하는 출처는 **Origin**을 번역한 말이다. Origin은 쉽게 말해 **‘프로토콜 + 도메인 + 포트’** 세트를 일컫는다. 따라서 ‘CORS’라는 말은 이 Origin이 다른 서버끼리의 자원 공유를 말한다. 구체적으로 보자면 도메인이나 포트 따위가 다른 서버의 리소스를 요청하고 받아오는 것이다.

웹 애플리케이션은 리소스가 자신의 출처와 다른 출처의 것이라면, cross-origin HTTP 요청을 실행한다. 하지만 웹 애플리케이션은 기본적으로 같은 출처에 대해서만 리소스를 정상적으로 받아올 수 있다. (이를 same-origin policy라 한다) 다른 출처에 대해서는 보안 목적으로 차단하는 것이다. 예를 들어, `Fetch API`나 `XMLHttpRequest`는 same-origin policy를 따르기 때문에 동일 출처 리소스만 불러올 수 있다. 다른 출처의 리소스를 원한다면 그 출처에서 올바른 CORS 헤더를 추가로 포함해 반환해야 한다.

이런 상황이 일어나는 경우는 아주 많다. 요즘은 프론트엔드와 백엔드를 분리해서 개발하기 때문에 도메인이나 포트가 다른 서버에서 리소스를 받아와 처리해야 할 때가 많다. 예컨대 React.js가 3000 포트에서 실행되고 있고, 백엔드 서버가 8080 포트에서 실행되고 있다면, 프론트엔드에서 백엔드의 리소스를 받아오려면 CORS에 의해 통제되는 것이다. 그렇다면 이러한 통제를 어떻게 처리할 수 있을까?

## CORS 접근 제어 방법

### 1. Access-Control-Allow-Origin 헤더

브라우저에서 서버로 데이터를 전송했다고 가정해보자. 서버가 받는 요청은 아래와 같다.

```
GET /resources/public-data/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
```

요청 헤더에 `Origin`이 포함되어 어느 Origin에서 온 요청인지가 나타나있다.

서버는 이에 대한 응답으로 `Access-Control-Allow-Origin` 헤더를 다시 전송하면 된다.

```
(생략)
Access-Control-Allow-Origin: https://foo.example -> https://foo.example의 요청에 대해서만 허용한다.
Access-Control-Allow-Origin: * -> 모든 요청에 대해서 허용한다.
(생략)

```

**Preflighted Request**

앞서 설명한 Access-Control-Allow-Origin 헤더 값으로만 해결하는 ‘단순 요청’과 달리, ‘Preflighted Request’는 `OPTIONS` 메소드를 통해 다른 도메인의 리소스로 HTTP 요청을 보내 실제 요청이 전송하기에 안전한지 확인한다. Cross-origin 요청은 유저 데이터에 영향을 줄 수 있어 이와 같이 미리 전송한다. (Preflighted)

… 라고 하는데, 아직은 잘 모르겠다.
https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#%ED%94%84%EB%A6%AC%ED%94%8C%EB%9D%BC%EC%9D%B4%ED%8A%B8_%EC%9A%94%EC%B2%AD
여기 참고 바람.

### 2. 기타 방법

본질적으로는 Access-Control-Allow-Origin 헤더를 이용하는 방식이지만, 헤더를 직접 추가해서 보내는 건 번거롭기도 하고, 실수할 여지가 커 보인다.

이를 더욱 간단하고 안전하게 수행하기 위해 많은 백엔드 프레임워크에서는 CORS 제어를 위한 미들웨어를 제공한다.

예를 들어, Node.js에서는 `CORS`라는 미들웨어가 존재한다.

```js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
	// Config
	origin: 'https://localhost:8080',
	credentials: true,
}));
```

Dynamic하게 Origin 목록을 다룰 수도 있다.

```js
const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptions = {
	origin: (origin, callback) => {
		if(whitelist.indexOf(origin) != -1 || !origin) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	}
}

app.use(cors(corsOptions));
```

Preflighted Request로 수행하도록 설정할 수도 있다.

```js
app.options('/products/:id', cors()); // Preflight Request
app.del('/products/:id', cors(), function(req, res, next) {
	console.log('This is CORS-enabled for all origins.');
});

// app.options('*', cors()); 로 모든 Origin에 대해서도 설정할 수 있다.
```
