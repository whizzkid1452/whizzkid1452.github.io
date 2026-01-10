import { RetroDateClock } from "./components/RetroDateClock";
import { RetroPlanner } from "./components/RetroPlanner";
import { RetroWindow } from "./components/RetroWindow";
import { PixelBackground } from "./components/PixelBackground";
import { FloatingHearts } from "./components/FloatingHearts";
import { RetroImage } from "./components/RetroImage";
import { PixelGrid } from "./components/PixelGrid";
import { RetroSidebar } from "./components/RetroSidebar";
import { KoreanRetroWindow } from "./components/KoreanRetroWindow";
import { KoreanPixelGallery } from "./components/KoreanPixelGallery";
import { RetroPostPage } from "./components/RetroPostPage";
import { RetroDiaryPage } from "./components/RetroDiaryPage";
import { CursorSparkles } from "./components/CursorSparkles";
import { PixelCDPlayer } from "./components/PixelCDPlayer";
import { Y2KCollageBackground } from "./components/Y2KCollageBackground";
import { Y2KTextBox } from "./components/Y2KTextBox";
import { Y2KSticker } from "./components/Y2KSticker";
import { RetroMiniGame } from "./components/RetroMiniGame";
import { PrincessRunnerGame } from "./components/PrincessRunnerGame";
import { RetroTVGame } from "./components/RetroTVGame";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Pink pixel cursor designs as SVG data URLs (larger size: 32x32)
    const pinkArrowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkHeartCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkStarCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="9" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="12" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkBowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="24" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkPawCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <!-- Left toe -->
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Middle toe -->
        <rect x="13" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="13" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="16" y="9" width="3" height="3" fill="#FF1493"/>
        <!-- Right toe -->
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Main pad outline -->
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="27" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;
    
    const cursorImages = [pinkArrowCursor, pinkHeartCursor, pinkStarCursor, pinkBowCursor, pinkPawCursor];
    
    const handleClick = () => {
      // Pick random cursor (excluding paw for general cursor)
      const generalCursors = [pinkArrowCursor, pinkHeartCursor, pinkStarCursor, pinkBowCursor];
      const randomCursor = generalCursors[Math.floor(Math.random() * generalCursors.length)];
      
      // Apply cursor to all elements
      const style = document.createElement('style');
      style.id = 'dynamic-cursor-style';
      
      // Remove previous dynamic style if exists
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      style.innerHTML = `
        *, *::before, *::after {
          cursor: url("${randomCursor}") 6 6, auto !important;
        }
        a, button, [role="button"], [type="button"], [type="submit"], [type="reset"],
        select, summary, [onclick], .cursor-pointer {
          cursor: url("${pinkPawCursor}") 15 15, pointer !important;
        }
        input[type="text"], input[type="email"], input[type="password"], input[type="search"],
        input[type="tel"], input[type="url"], input[type="number"], textarea, [contenteditable="true"] {
          cursor: url("${randomCursor}") 6 6, text !important;
        }
      `;
      
      document.head.appendChild(style);
    };

    // Set initial cursor
    handleClick();
    
    // Add click listener to entire document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 relative overflow-x-hidden"
      style={{ cursor: 'inherit' }}
    >
      {/* Y2K Collage Background */}
      <Y2KCollageBackground />
      
      {/* Cursor Sparkles */}
      <CursorSparkles />
      
      {/* Sidebar */}
      <RetroSidebar />
      
      {/* Main Content - with left margin on desktop for sidebar */}
      <div className="relative z-10 py-4 md:py-8 px-4 lg:ml-64">
        {/* Y2K Hero Section with Stickers */}
        <div className="relative mb-12">
          {/* Floating stickers decoration */}
          <div className="absolute -top-8 -left-4 md:-left-8">
            <Y2KSticker type="star" size={80} rotation={-15} />
          </div>
          <div className="absolute -top-4 -right-4 md:-right-8">
            <Y2KSticker type="heart" size={60} rotation={20} />
          </div>
          <div className="absolute top-20 left-4">
            <Y2KSticker type="sparkle" size={40} rotation={45} />
          </div>
          
          {/* Main Title in Y2K style boxes */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            <Y2KTextBox variant="pink" rotation={-3}>
              <span 
                className="text-2xl md:text-4xl font-bold text-purple-900"
                style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "3px 3px 0px rgba(255, 105, 180, 0.5)"
                }}
              >
                TALK
              </span>
            </Y2KTextBox>
            
            <Y2KTextBox variant="purple" rotation={2}>
              <span 
                className="text-2xl md:text-4xl font-bold text-pink-600"
                style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "3px 3px 0px rgba(147, 112, 219, 0.5)"
                }}
              >
                TO
              </span>
            </Y2KTextBox>
            
            <Y2KTextBox variant="gradient" rotation={-2}>
              <span 
                className="text-2xl md:text-4xl font-bold text-white"
                style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)"
                }}
              >
                THE
              </span>
            </Y2KTextBox>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Y2KTextBox variant="white" rotation={3}>
              <span 
                className="text-2xl md:text-4xl font-bold text-pink-500"
                style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "3px 3px 0px rgba(255, 20, 147, 0.3)"
                }}
              >
                HAND
              </span>
            </Y2KTextBox>
            
            <Y2KTextBox variant="pink" rotation={-1}>
              <span 
                className="text-xl md:text-2xl text-purple-700"
                style={{ 
                  fontFamily: "'DungGeunMo', monospace",
                }}
              >
                💕✨
              </span>
            </Y2KTextBox>
          </div>

          {/* More decorative stickers */}
          <div className="absolute bottom-0 right-8 md:right-20">
            <Y2KSticker type="cd" size={70} rotation={15} />
          </div>
          <div className="absolute bottom-4 left-1/3">
            <Y2KSticker type="sparkle" size={35} rotation={-30} />
          </div>
        </div>
        
        {/* Date Clock at the top */}
        <RetroDateClock />
        
        {/* Planner below the clock */}
        <RetroPlanner />
        
        <RetroWindow />
        <KoreanRetroWindow />
        <RetroPostPage />
        <RetroDiaryPage />
        <RetroImage />
        <KoreanPixelGallery />
        <PixelGrid />
        <PixelCDPlayer />
        <RetroMiniGame />
        <PrincessRunnerGame />
        <RetroTVGame />
      </div>
      
      {/* Footer with Y2K style */}
      <div className="relative z-10 text-center py-6 md:py-8 mt-6 md:mt-8 lg:ml-64">
        <Y2KTextBox variant="gradient" className="inline-block">
          <p 
            className="text-purple-900 text-xs md:text-sm mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ♥ Y2K VIBES FOREVER ♥
          </p>
          <p 
            className="text-pink-600 text-sm md:text-base"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            ♥ 2000년대 감성 영원히 ♥
          </p>
        </Y2KTextBox>
        
        {/* Footer stickers */}
        <div className="mt-4 flex justify-center gap-4">
          <Y2KSticker type="star" size={40} rotation={0} />
          <Y2KSticker type="heart" size={40} rotation={0} />
          <Y2KSticker type="sparkle" size={40} rotation={0} />
        </div>
      </div>
    </div>
  );
}