import { motion } from "motion/react";
import { RetroPostCard } from "./RetroPostCard";
import { RetroPostDetail } from "./RetroPostDetail";
import { RetroMarkdownPost } from "./RetroMarkdownPost";
import { PenTool, Star, Sparkles } from "lucide-react";
import { useState } from "react";

export function RetroPostPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showMarkdownPost, setShowMarkdownPost] = useState(false);

  const posts = [
    {
      title: "REACT CODE",
      titleKo: "리액트 코드 가이드",
      author: "CodePrincess",
      date: "2024-12-26",
      description: "리액트로 Y2K 스타일 웹사이트 만들기! Building a retro pixel website with React.",
      tag: "react, code, tutorial",
      content: `# 리액트 코드 가이드 • React Code Guide

## Y2K 스타일 컴포넌트 만들기

**핑크 픽셀** 감성으로 리액트 컴포넌트를 만들어봅시다! Create amazing retro components.

### 기본 컴포넌트 구조

\`\`\`
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
\`\`\`

### 인라인 코드 예제

컴포넌트를 만들 때는 \`useState\`와 \`useEffect\`를 활용하세요!

### 핑크 픽셀 버튼 만들기

\`\`\`
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
\`\`\`

> "코드 한 줄 한 줄에 핑크 감성을 담아보세요!" 💕

## 중요 포인트

- **상태 관리**: useState로 상태를 관리하세요
- **스타일링**: Tailwind CSS로 픽셀 감성 연출
- **애니메이션**: Motion으로 Y2K 효과 추가

\`\`\`
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
\`\`\``,
      tags: ["React", "코드", "Tutorial", "핑크"],
      likes: 333,
      comments: 88,
      views: 2999,
      color: "from-[#ff1493] to-[#ff69b4]",
    },
    {
      title: "PIXEL ART GUIDE",
      titleKo: "픽셀 아트 가이드",
      author: "PixelMaster",
      date: "2024-12-25",
      description: "레트로 픽셀 아트를 시작하는 방법! Start creating amazing pixel art with simple tools.",
      tag: "pixel art, tutorial",
      content: `# 픽셀 아트 가이드 • Pixel Art Guide

## 시작하기 • Getting Started

레트로 픽셀 아트를 시작하는 방법! **도트 하나하나에 영혼을 담아보세요.** Each pixel tells a story in this digital canvas.

### 필요한 도구 • Required Tools

1. MS Paint 또는 Aseprite
2. 16x16 캔버스로 시작
3. 제한된 컬러 팔레트

## 기본 원칙 • Basic Principles

> "단순함 속의 아름다움" - 픽셀 아트의 철학

- **작게 시작하기**: 16x16부터 시작해서 점점 큰 캔버스로
- **컬러 팔레트 제한**: 8색부터 시작
- **디테일보다 명확함**: 각 픽셀이 중요합니다

\`\`\`
// 픽셀 아트 기본 코드
canvas.size = 16x16
colors = palette.retro8bit
draw(pixel, x, y, color)
\`\`\``,
      tags: ["픽셀아트", "Pixel", "Tutorial", "레트로"],
      likes: 142,
      comments: 23,
      views: 1523,
      color: "from-[#e91e63] to-[#f06292]",
    },
    {
      title: "90s NOSTALGIA",
      titleKo: "90년대 향수",
      author: "RetroGamer",
      date: "2024-12-24",
      description: "Remember the good old days? 옛날 컴퓨터 앞에 앉아 게임하던 그 시절이 그립습니다.",
      tag: "nostalgia, retro",
      content: `# 90년대 향수 • 90s Nostalgia

## The Good Old Days

Remember the good old days? **옛날 컴퓨터 앞에 앉아 게임하던 그 시절이 그립습니다.**

### 추억의 사운드 • Nostalgic Sounds

- The sound of **dial-up internet**
- 256 colors
- Simple joys

> "Those were the golden times!" - Every 90s kid

## 플로피 디스크 시절

플로피 디스크에 소중한 파일을 저장하고, _MS Paint로 그림을 그리던 추억들._ 

| 항목 | 90년대 | 지금 |
|------|--------|------|
| 저장 공간 | 1.44 MB | 1 TB |
| 속도 | 56K | 1 Gbps |
| 감성 | ∞ | ? |`,
      tags: ["90s", "향수", "Retro", "추억"],
      likes: 256,
      comments: 45,
      views: 2341,
      color: "from-[#9c27b0] to-[#ba68c8]",
    },
    {
      title: "CHIPTUNE MUSIC",
      titleKo: "칩튠 음악의 세계",
      author: "8BitComposer",
      date: "2024-12-23",
      description: "8비트 음악의 매력에 빠져보세요! Creating music with only a few sound channels.",
      tag: "music, 8bit",
      content: `# 칩튠 음악의 세계 • Chiptune Music

## 8비트 사운드의 마법

8비트 음악의 매력에 빠져보세요! **제한된 음색으로 만들어내는 무한한 감성.**

### 칩튠이란? • What is Chiptune?

Creating music with only a **few sound channels**. The beeps and bloops that defined a generation.

## 기본 구성 • Basic Components

1. **Square Wave** - 기본 멜로디
2. **Triangle Wave** - 베이스라인
3. **Noise** - 드럼과 효과음
4. **DPCM** - 샘플 사운드

> "지금 들어도 설레는 그 사운드, 그것이 바로 칩튠의 힘입니다!" - 8BitComposer

\`\`\`javascript
// NES 사운드 칩 코드
const nes = {
  pulse1: square_wave,
  pulse2: square_wave,
  triangle: triangle_wave,
  noise: white_noise,
  dmc: sample
};
\`\`\``,
      tags: ["Music", "음악", "8bit", "Chiptune"],
      likes: 189,
      comments: 31,
      views: 1876,
      color: "from-[#00bcd4] to-[#4dd0e1]",
    },
    {
      title: "RETRO GAMING",
      titleKo: "레트로 게이밍",
      author: "ClassicPlayer",
      date: "2024-12-22",
      description: "옛날 게임들의 단순하지만 깊은 재미! Simple graphics, complex gameplay.",
      tag: "gaming, retro",
      content: `# 레트로 게이밍 • Retro Gaming

## Simple Graphics, Complex Gameplay

옛날 게임들의 단순하지만 깊은 재미! **그래픽보다 중요한 것은 게임성이었던 시절.**

### 왜 레트로 게임인가? • Why Retro Games?

- **순수한 게임성**: 화려한 그래픽이 없어도 재미있었던 게임들
- **도전적인 난이도**: 쉽게 클리어할 수 없는 짜릿함
- **픽셀 아트의 매력**: 제한된 색상으로 만들어낸 아름다움

## 명작 게임들 • Classic Games

| 게임 | 출시년도 | 장르 |
|------|---------|------|
| Super Mario Bros. | 1985 | Platform |
| The Legend of Zelda | 1986 | Adventure |
| Final Fantasy | 1987 | RPG |

> "Every game was a new adventure waiting to be discovered." - ClassicPlayer

오늘도 슈퍼 마리오를 켜봅니다. **Pressing START never gets old!**

~~최신 게임보다 재밌어요~~ 농담입니다 😊`,
      tags: ["게임", "Gaming", "Retro", "Classic"],
      likes: 301,
      comments: 67,
      views: 3205,
      color: "from-[#4caf50] to-[#81c784]",
    },
  ];

  // If markdown post is requested
  if (showMarkdownPost) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8 px-4">
        <RetroMarkdownPost onBack={() => setShowMarkdownPost(false)} />
      </div>
    );
  }

  // If a post is selected, show detail view
  if (selectedPost !== null) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
        <RetroPostDetail
          {...posts[selectedPost]}
          onBack={() => setSelectedPost(null)}
        />
      </div>
    );
  }

  // Otherwise show post list
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#9c27b0] via-[#e91e63] to-[#00bcd4] p-4 md:p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <h1
            className="text-white text-base md:text-xl text-center"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            PIXEL BLOG
          </h1>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
        </div>
        <p
          className="text-white/90 text-center text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          레트로 감성 블로그 • Retro Vibes Only
        </p>
      </motion.div>

      {/* New Post Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <PenTool className="w-4 h-4 md:w-5 md:h-5" />
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            새 글쓰기 • Write
          </span>
        </motion.button>
      </motion.div>

      {/* Posts List */}
      <div>
        {/* Featured Markdown Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onClick={() => setShowMarkdownPost(true)}
          className="mb-6 cursor-pointer"
        >
          <div className="bg-gradient-to-br from-[#FFE4E1] via-white to-[#FFB6C1] border-4 border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)] overflow-hidden" style={{ imageRendering: "pixelated" }}>
            {/* Featured Badge */}
            <div className="bg-gradient-to-r from-[#FF1493] to-[#FF69B4] px-3 py-2 border-b-3 border-[#C2185B] flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" style={{ imageRendering: "pixelated" }} />
              <span
                className="text-white text-xs"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                FEATURED POST
              </span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" style={{ imageRendering: "pixelated" }} />
              </motion.div>
            </div>

            <div className="p-4 md:p-6">
              <h3
                className="text-[#FF1493] text-base md:text-lg mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Markdown Examples
              </h3>
              <p
                className="text-[#C2185B] text-sm mb-3"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                마크다운 옵션의 모든 예제 보기 • View examples of all possible Markdown options
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-[#FFB6C1] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  web development
                </span>
                <span className="px-2 py-1 bg-[#FFE4E1] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  markdown
                </span>
                <span className="px-2 py-1 bg-[#FFC0CB] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  tutorial
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#9c27b0]" style={{ fontFamily: "'VT323', monospace" }}>
                <span>👤 You</span>
                <span>📅 2021/3/19</span>
                <span>👁️ 1,234 views</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regular Posts */}
        {posts.map((post, index) => (
          <RetroPostCard
            key={index}
            {...post}
            delay={0.5 + index * 0.15}
            onClick={() => setSelectedPost(index)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center mt-6 md:mt-8 mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="px-6 md:px-8 py-3 md:py-4 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0]"
        >
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            LOAD MORE
          </span>
          <div
            className="text-[10px] md:text-xs mt-1"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            더 보기
          </div>
        </motion.button>
      </motion.div>

      {/* Categories Sidebar Box */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
        className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-4 md:p-6 mb-6"
      >
        <h3
          className="text-[#e91e63] text-sm md:text-base mb-4 pb-2 border-b-2 border-[#fce4ec]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          CATEGORIES
        </h3>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {[
            { ko: "픽셀아트", en: "Pixel Art" },
            { ko: "음악", en: "Music" },
            { ko: "게임", en: "Gaming" },
            { ko: "디자인", en: "Design" },
            { ko: "코딩", en: "Coding" },
            { ko: "리뷰", en: "Review" },
          ].map((cat, i) => (
            <motion.button
              key={cat.en}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 md:p-3 bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-2 border-[#ec407a] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] text-center"
            >
              <div
                className="text-[10px] md:text-xs text-[#e91e63]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {cat.en}
              </div>
              <div
                className="text-xs md:text-sm text-[#4a0066] mt-1"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {cat.ko}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}