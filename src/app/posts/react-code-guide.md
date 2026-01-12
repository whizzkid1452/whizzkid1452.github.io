---
title: REACT CODE
titleKo: 리액트 코드 가이드
author: CodePrincess
date: 2024-12-26
description: 리액트로 Y2K 스타일 웹사이트 만들기! Building a retro pixel website with React.
tag: react, code, tutorial
tags:
  - React
  - 코드
  - Tutorial
  - 핑크
likes: 333
comments: 88
views: 2999
color: from-[#ff1493] to-[#ff69b4]
---

# 리액트 코드 가이드 • React Code Guide

## Y2K 스타일 컴포넌트 만들기

**핑크 픽셀** 감성으로 리액트 컴포넌트를 만들어봅시다! Create amazing retro components.

### 기본 컴포넌트 구조

```
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
```

### 인라인 코드 예제

컴포넌트를 만들 때는 `useState`와 `useEffect`를 활용하세요!

### 핑크 픽셀 버튼 만들기

```
function PixelButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pink-pixel-button"
    >
      CLICK ME! 💖
    </button>
  );
}
```

> "코드 한 줄 한 줄에 핑크 감성을 담아보세요!" 💕

## 중요 포인트

- **상태 관리**: useState로 상태를 관리하세요
- **스타일링**: Tailwind CSS로 픽셀 감성 연출
- **애니메이션**: Motion으로 Y2K 효과 추가

```
// 간단한 import 예제
import { motion } from "motion/react";
import { useState } from "react";

const App = () => {
  // 여기에 코드를 작성하세요
  const [count, setCount] = useState(0);
  
  return (
    <motion.div animate={{ scale: 1.2 }}>
      <h1>Hello Pixel World!</h1>
    </motion.div>
  );
};
```
