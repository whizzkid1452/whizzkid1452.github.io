import React from "react";
import { RetroDateClock } from "./components/RetroDateClock";
import { RetroPlanner } from "./components/RetroPlanner";
import { RetroWindow } from "./components/RetroWindow";
import { RetroImage } from "./components/RetroImage";
import { KoreanRetroWindow } from "./components/KoreanRetroWindow";
import { KoreanPixelGallery } from "./components/KoreanPixelGallery";
import { RetroPostPage } from "./components/RetroPostPage";
import { RetroDiaryPage } from "./components/RetroDiaryPage";
import { PixelCDPlayer } from "./components/PixelCDPlayer";
import { Y2KTextBox } from "./components/Y2KTextBox";
import { Y2KSticker } from "./components/Y2KSticker";
import { RetroMiniGame } from "./components/RetroMiniGame";
import { PrincessRunnerGame } from "./components/PrincessRunnerGame";
import { RetroTVGame } from "./components/RetroTVGame";
import { PixelGrid } from "./components/PixelGrid";
import { DefaultLayout } from "./components/DefaultLayout";

export function Home() {
  return (
    <DefaultLayout>
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
      
      <RetroPostPage />
      <RetroDiaryPage />
      <RetroImage />
      <KoreanPixelGallery />
      <PixelGrid />
      <PixelCDPlayer />
      <RetroMiniGame />
      <PrincessRunnerGame />
      <RetroTVGame />
    </DefaultLayout>
  );
}
