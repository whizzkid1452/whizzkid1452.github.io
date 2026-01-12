import { motion } from "motion/react";
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Clock, User, Tag, Eye, 
  Code, Link as LinkIcon, Quote, List, ListOrdered, FileText, Book
} from "lucide-react";
import { useState, useEffect } from "react";
import { useBackButton } from "../../contexts/BackButtonContext";

interface RetroMarkdownPostProps {
  onBack: () => void;
}

export function RetroMarkdownPost({ onBack }: RetroMarkdownPostProps) {
  const { setHasBackButton } = useBackButton();

  useEffect(() => {
    setHasBackButton(true);
    return () => {
      setHasBackButton(false);
    };
  }, [setHasBackButton]);
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([
    {
      author: "DevPixel90",
      text: "마크다운 예제 정말 유용하네요! 감사합니다 😊",
      date: "2026-01-03 10:30",
    },
    {
      author: "RetroWebDev",
      text: "테이블 스타일링이 특히 예쁘네요! Great work!",
      date: "2026-01-03 11:15",
    },
  ]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setCommentList([
        ...commentList,
        {
          author: "Guest User",
          text: commentText,
          date: new Date().toLocaleString("ko-KR"),
        },
      ]);
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto pt-16 md:pt-20"
    >
      {/* Back Button - Fixed */}
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="fixed top-4 left-4 md:left-6 lg:left-[280px] z-50 flex items-center gap-2 px-4 py-2 bg-white border-4 border-[#FF1493] shadow-[4px_4px_0px_0px_rgba(255,20,147,0.5)] text-[#e91e63]"
        style={{ imageRendering: "pixelated" }}
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        <span
          className="text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          목록으로 • Back to List
        </span>
      </motion.button>

      {/* Main Post Container */}
      <motion.article
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-4 border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.4)]"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493] p-4 md:p-6 border-b-4 border-[#C2185B]">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" style={{ imageRendering: "pixelated" }} />
            <h1
              className="text-white text-sm md:text-lg lg:text-xl"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Markdown Examples
            </h1>
          </div>
          <p
            className="text-white/90 text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            마크다운 옵션의 모든 예제 보기 • View examples of all possible Markdown options.
          </p>
        </div>

        {/* Meta Info */}
        <div className="bg-[#FFE4E1] p-3 md:p-4 border-b-3 border-[#FFB6C1] flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 md:w-5 md:h-5 text-[#e91e63]" />
            <span style={{ fontFamily: "'DungGeunMo', monospace" }}>You</span>
          </div>
          <div className="flex items-center gap-[0.25rem]">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
            <span style={{ fontFamily: "'VT323', monospace" }}>2021/3/19</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#00bcd4]" />
            <span style={{ fontFamily: "'VT323', monospace" }}>1,234 views</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 md:w-5 md:h-5 text-[#FF1493]" />
            <span
              className="px-2 py-1 bg-[#FFB6C1] border-2 border-[#FF1493] text-[10px]"
              style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
            >
              web development
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-12">
          {/* Main Title */}
          <div className="mb-8 pb-6 border-b-4 border-[#FFB6C1]">
            <h1
              className="text-[#FF1493] text-xl md:text-2xl lg:text-3xl mb-3"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              # Markdown Examples
            </h1>
          </div>

          {/* h2 Heading */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## h2 Heading
            </h2>

            {/* h3 Heading */}
            <h3
              className="text-[#FF69B4] text-base md:text-lg mb-3"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ### h3 Heading
            </h3>

            {/* h4 Heading */}
            <h4
              className="text-[#FF1493] text-sm md:text-base mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              #### h4 Heading
            </h4>

            {/* h5 Heading */}
            <h5
              className="text-[#C2185B] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ##### h5 Heading
            </h5>

            {/* h6 Heading */}
            <h6
              className="text-[#880E4F] text-xs mb-2"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ###### h6 Heading
            </h6>
          </div>

          {/* Emphasis */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Emphasis
            </h2>
            <div className="space-y-2" style={{ fontFamily: "'DungGeunMo', monospace" }}>
              <p className="text-[#1a0033] text-sm md:text-base">
                <strong className="text-[#FF1493]">**This is bold text**</strong>
              </p>
              <p className="text-[#1a0033] text-sm md:text-base">
                <em className="text-[#9c27b0]">_This is italic text_</em>
              </p>
              <p className="text-[#1a0033] text-sm md:text-base">
                <del className="text-gray-500">~~Strikethrough~~</del>
              </p>
            </div>
          </div>

          {/* Blockquotes */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Blockquotes
            </h2>
            <div className="bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB] border-l-4 border-[#FF1493] p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]" style={{ imageRendering: "pixelated" }}>
              <Quote className="w-6 h-6 text-[#FF69B4] mb-2" style={{ imageRendering: "pixelated" }} />
              <p
                className="text-[#C2185B] text-sm md:text-base"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                Develop. Preview. Ship. – Vercel
              </p>
            </div>
          </div>

          {/* Lists */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Lists
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Unordered List */}
              <div className="bg-[#FFF0F5] border-3 border-[#FFB6C1] p-4 shadow-[4px_4px_0px_0px_rgba(255,182,193,0.5)]" style={{ imageRendering: "pixelated" }}>
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-5 h-5 text-[#FF69B4]" />
                  <h3
                    className="text-[#FF1493] text-sm"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Unordered
                  </h3>
                </div>
                <ul className="space-y-2 text-[#1a0033] text-xs md:text-sm" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1493] mt-1">●</span>
                    <span>Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1493] mt-1">●</span>
                    <span>Consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF1493] mt-1">●</span>
                    <span>Integer molestie lorem at massa</span>
                  </li>
                </ul>
              </div>

              {/* Ordered List */}
              <div className="bg-[#F0F8FF] border-3 border-[#00bcd4] p-4 shadow-[4px_4px_0px_0px_rgba(0,188,212,0.5)]" style={{ imageRendering: "pixelated" }}>
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="w-5 h-5 text-[#00bcd4]" />
                  <h3
                    className="text-[#00bcd4] text-sm"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Ordered
                  </h3>
                </div>
                <ol className="space-y-2 text-[#1a0033] text-xs md:text-sm" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00bcd4]">1.</span>
                    <span>Lorem ipsum dolor sit amet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00bcd4]">2.</span>
                    <span>Consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00bcd4]">3.</span>
                    <span>Integer molestie lorem at massa</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Code */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Code
            </h2>

            {/* Inline Code */}
            <p className="text-[#1a0033] text-sm md:text-base mb-4" style={{ fontFamily: "'DungGeunMo', monospace" }}>
              Inline{" "}
              <code
                className="px-2 py-1 bg-[#2d2d2d] text-[#00ff00] border-2 border-[#00ff00] text-xs"
                style={{ fontFamily: "'VT323', monospace", imageRendering: "pixelated" }}
              >
                code
              </code>
            </p>

            {/* Code Block */}
            <div className="my-8 bg-[#c0c0c0] border-4 border-[#ff1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)] overflow-hidden" style={{ imageRendering: "pixelated" }}>
              {/* Window Title Bar */}
              <div 
                className="bg-gradient-to-r from-[#ff1493] to-[#ff69b4] px-3 py-2 border-b-4 border-[#c71585] flex items-center justify-between"
                style={{
                  boxShadow: "inset -1px -1px 0 0 rgba(0,0,0,0.5), inset 1px 1px 0 0 rgba(255,255,255,0.5)"
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border-2 border-black flex items-center justify-center">
                    <Code className="w-3 h-3 text-[#ff1493]" />
                  </div>
                  <span className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}>
                    CODE_BLOCK.EXE
                  </span>
                  <div className="flex gap-1 ml-2">
                    <div className="w-2 h-2 bg-[#00ff00] border border-black animate-pulse"></div>
                    <div className="w-2 h-2 bg-[#ffff00] border border-black"></div>
                    <div className="w-2 h-2 bg-[#ff00ff] border border-black"></div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#a0a0a0] font-bold"
                    style={{ boxShadow: "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #ffffff" }}>
                    _
                  </button>
                  <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#a0a0a0] font-bold"
                    style={{ boxShadow: "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #ffffff" }}>
                    □
                  </button>
                  <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-black flex items-center justify-center text-[10px] hover:bg-[#ff0000] font-bold"
                    style={{ boxShadow: "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #ffffff" }}>
                    ×
                  </button>
                </div>
              </div>

              {/* Menu Bar */}
              <div 
                className="bg-[#c0c0c0] px-3 py-1 border-b-2 border-[#808080] flex gap-3 text-[10px]"
                style={{ 
                  fontFamily: "'VT323', monospace",
                  boxShadow: "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #ffffff"
                }}
              >
                <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">File</span>
                <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">Edit</span>
                <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">View</span>
                <span className="hover:bg-[#ff1493] hover:text-white px-2 cursor-pointer border-2 border-transparent hover:border-black">Help</span>
              </div>
              
              {/* Code Content */}
              <div className="bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#1a0033] p-4 md:p-6">
                <div className="bg-black/40 border-4 border-[#ff69b4]/30 p-4 shadow-[inset_4px_4px_8px_rgba(255,20,147,0.2)]">
                  <div className="flex gap-2">
                    {/* Line Numbers */}
                    <div className="pr-4 border-r-4 border-[#ff1493]/50 select-none bg-[#2d0a4e]/50 px-2">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div
                          key={i}
                          className="text-[#ff69b4] text-sm leading-relaxed text-right py-[2px]"
                          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                        >
                          {String(i + 1).padStart(3, '0')}
                        </div>
                      ))}
                    </div>
                    
                    {/* Code Lines */}
                    <div className="flex-1 overflow-x-auto">
                      <pre className="text-sm leading-relaxed" style={{ fontFamily: "'VT323', monospace" }}>
                        {[
                          'export default function App({ Component, pageProps }) {',
                          '  return (',
                          '    <>',
                          '      <Head>',
                          '        <link',
                          '          rel="alternate"',
                          '          type="application/rss+xml"',
                          '          title="RSS"',
                          '          href="/feed.xml"',
                          '        />',
                          '        <link',
                          '          rel="preload"',
                          '          href="/fonts/Inter-roman.latin.var.woff2"',
                          '          as="font"',
                          '          type="font/woff2"',
                          '          crossOrigin="anonymous"',
                          '        />',
                          '      </Head>',
                          '      <Component {...pageProps} />',
                          '    </>',
                          '  )',
                          '}'
                        ].map((line, index) => {
                          // Enhanced syntax highlighting for pink pixel theme
                          
                          // Comments
                          if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                            return (
                              <div key={index} className="text-[#bd93f9] py-[2px] opacity-70">
                                💭 {line}
                              </div>
                            );
                          }
                          
                          // Function/Class declarations
                          if (line.includes('function') || line.includes('class') || line.includes('const') || line.includes('let') || line.includes('var')) {
                            return (
                              <div key={index} className="py-[2px]">
                                <span className="text-[#ff79c6] font-bold">★ </span>
                                <span className="text-[#ff79c6]">{line}</span>
                              </div>
                            );
                          }
                          
                          // Import/Export
                          if (line.includes('import') || line.includes('export')) {
                            return (
                              <div key={index} className="text-[#8be9fd] py-[2px]">
                                ⚡ {line}
                              </div>
                            );
                          }
                          
                          // Return statements
                          if (line.includes('return')) {
                            return (
                              <div key={index} className="text-[#50fa7b] py-[2px]">
                                ← {line}
                              </div>
                            );
                          }
                          
                          // Strings
                          if (line.includes('"') || line.includes("'") || line.includes('`')) {
                            return (
                              <div key={index} className="text-[#f1fa8c] py-[2px]">
                                ✿ {line}
                              </div>
                            );
                          }
                          
                          // JSX tags
                          if (line.includes('<') && line.includes('>')) {
                            return (
                              <div key={index} className="text-[#ffb86c] py-[2px]">
                                ♦ {line}
                              </div>
                            );
                          }
                          
                          // Default
                          return (
                            <div key={index} className="text-[#f8f8f2] py-[2px]">
                              {line || ' '}
                            </div>
                          );
                        })}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Bar */}
              <div 
                className="bg-[#c0c0c0] px-4 py-2 border-t-2 border-[#808080] flex items-center justify-between text-[10px]"
                style={{ 
                  fontFamily: "'VT323', monospace",
                  boxShadow: "inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #ffffff"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#ff1493] border border-black"></div>
                    <span className="text-black">LINES: 20</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-[#00ff00] border border-black animate-pulse"></div>
                    <span className="text-black">READY</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black">UTF-8</span>
                  <span className="text-[#808080]">│</span>
                  <span className="text-black">CRLF</span>
                  <span className="text-[#808080]">│</span>
                  <span className="text-black">PIXEL MODE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Tables
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-4 border-[#FF1493] shadow-[6px_6px_0px_0px_rgba(255,20,147,0.3)]" style={{ imageRendering: "pixelated" }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#FF1493] to-[#FF69B4]">
                    <th
                      className="border-2 border-[#C2185B] px-4 py-3 text-left text-white text-xs md:text-sm"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      Option
                    </th>
                    <th
                      className="border-2 border-[#C2185B] px-4 py-3 text-left text-white text-xs md:text-sm"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: "'DungGeunMo', monospace" }}>
                  <tr className="bg-[#FFE4E1] hover:bg-[#FFB6C1] transition-colors">
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#FF1493] text-xs md:text-sm">
                      First
                    </td>
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#1a0033] text-xs md:text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-[#FFB6C1] transition-colors">
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#FF1493] text-xs md:text-sm">
                      Second
                    </td>
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#1a0033] text-xs md:text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </td>
                  </tr>
                  <tr className="bg-[#FFE4E1] hover:bg-[#FFB6C1] transition-colors">
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#FF1493] text-xs md:text-sm">
                      Third
                    </td>
                    <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#1a0033] text-xs md:text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Links */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ## Links
            </h2>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-4 py-2 bg-[#FFE4E1] border-3 border-[#FF1493] hover:bg-[#FFB6C1] transition-colors shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]"
                style={{ fontFamily: "'DungGeunMo', monospace", imageRendering: "pixelated" }}
              >
                <LinkIcon className="w-4 h-4 text-[#FF1493]" />
                <span className="text-[#FF1493] text-sm">Next.js</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit px-4 py-2 bg-[#FFE4E1] border-3 border-[#FF1493] hover:bg-[#FFB6C1] transition-colors shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]"
                style={{ fontFamily: "'DungGeunMo', monospace", imageRendering: "pixelated" }}
              >
                <LinkIcon className="w-4 h-4 text-[#FF1493]" />
                <span className="text-[#FF1493] text-sm">Vercel</span>
              </motion.a>
            </div>
          </div>

          {/* Footnotes */}
          <div className="mb-8">
            <h2
              className="text-[#e91e63] text-lg md:text-xl mb-4 pb-2 border-b-3 border-[#FFB6C1]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              ### Footnotes
            </h2>
            <div className="space-y-3" style={{ fontFamily: "'DungGeunMo', monospace" }}>
              <p className="text-[#1a0033] text-sm md:text-base">
                - Footnote{" "}
                <sup className="text-[#FF1493] text-xs">
                  <a href="#fn1" className="hover:underline">[^1]</a>
                </sup>
                .
              </p>
              <p className="text-[#1a0033] text-sm md:text-base">
                - Footnote{" "}
                <sup className="text-[#FF1493] text-xs">
                  <a href="#fn2" className="hover:underline">[^2]</a>
                </sup>
                .
              </p>

              <div className="mt-6 pt-6 border-t-3 border-[#FFB6C1] space-y-4">
                <div id="fn1" className="bg-[#FFF0F5] border-l-4 border-[#FF1493] p-3">
                  <p className="text-[#1a0033] text-xs md:text-sm">
                    <sup className="text-[#FF1493]">[^1]:</sup> Footnote{" "}
                    <strong className="text-[#FF1493]">can have markup</strong>
                  </p>
                  <p className="text-[#1a0033] text-xs md:text-sm mt-2">
                    and multiple paragraphs.
                  </p>
                </div>
                <div id="fn2" className="bg-[#FFF0F5] border-l-4 border-[#FF1493] p-3">
                  <p className="text-[#1a0033] text-xs md:text-sm">
                    <sup className="text-[#FF1493]">[^2]:</sup> Footnote text.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Ending */}
          <div className="mt-12 pt-6 border-t-4 border-[#FFB6C1] text-center">
            <div className="inline-block bg-gradient-to-r from-[#FFE4E1] via-[#FFB6C1] to-[#FFE4E1] border-3 border-[#FF1493] px-6 py-3 shadow-[6px_6px_0px_0px_rgba(255,20,147,0.4)]" style={{ imageRendering: "pixelated" }}>
              <Book className="w-6 h-6 text-[#FF1493] mx-auto mb-2" style={{ imageRendering: "pixelated" }} />
              <p
                className="text-[#FF1493] text-xs"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                END OF MARKDOWN GUIDE
              </p>
              <p
                className="text-[#C2185B] text-sm mt-2"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                마크다운 가이드 끝 • Happy Coding!
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 md:p-6 border-t-4 border-[#FFB6C1] bg-gradient-to-r from-[#FFE4E1] to-white">
          <div className="flex gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 border-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                isLiked
                  ? "bg-[#FF1493] text-white border-[#C2185B]"
                  : "bg-white text-[#FF1493] hover:bg-[#FFE4E1] border-[#FF1493]"
              }`}
              style={{ imageRendering: "pixelated" }}
            >
              <Heart
                className={`w-5 h-5 md:w-6 md:h-6 ${isLiked ? "fill-current" : ""}`}
              />
              <span
                className="text-sm md:text-base"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {likes}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white border-3 border-[#9c27b0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0] hover:bg-[#f3e5f5] transition-colors"
              style={{ imageRendering: "pixelated" }}
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              <span
                className="text-sm md:text-base"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {commentList.length}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-white border-3 border-[#00bcd4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#00bcd4] hover:bg-[#e0f7fa] transition-colors ml-auto"
              style={{ imageRendering: "pixelated" }}
            >
              <Share2 className="w-5 h-5 md:w-6 md:h-6" />
              <span
                className="text-sm md:text-base hidden md:inline"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                공유 • Share
              </span>
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white border-4 border-[#9c27b0] shadow-[8px_8px_0px_0px_rgba(156,39,176,0.4)]"
        style={{ imageRendering: "pixelated" }}
      >
        <div className="bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] p-3 md:p-4 border-b-4 border-[#7b1fa2]">
          <h3
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            COMMENTS • 댓글 ({commentList.length})
          </h3>
        </div>

        {/* Comment Input */}
        <div className="p-4 md:p-6 border-b-4 border-[#f3e5f5]">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요 • Write a comment..."
            className="w-full p-3 md:p-4 border-4 border-[#9c27b0] bg-[#f3e5f5] text-[#1a0033] text-xs md:text-sm mb-3 resize-none"
            style={{ fontFamily: "'DungGeunMo', monospace", imageRendering: "pixelated" }}
            rows={3}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCommentSubmit}
            className="px-4 md:px-6 py-2 bg-gradient-to-r from-[#9c27b0] to-[#ba68c8] text-white border-4 border-[#7b1fa2] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            style={{ imageRendering: "pixelated" }}
          >
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              댓글 작성 • Post Comment
            </span>
          </motion.button>
        </div>

        {/* Comment List */}
        <div className="divide-y-2 divide-[#f3e5f5]">
          {commentList.map((comment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="p-4 md:p-6 hover:bg-[#f3e5f5]/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#FF1493] to-[#9c27b0] border-2 border-black flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[#9c27b0] text-xs md:text-sm"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {comment.author}
                    </span>
                    <span
                      className="text-[#FF69B4] text-[10px] md:text-xs"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {comment.date}
                    </span>
                  </div>
                  <p
                    className="text-[#1a0033] text-xs md:text-sm leading-relaxed"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    {comment.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
