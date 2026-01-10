import React from "react";
import { RetroWindow } from "./components/RetroWindow";
import { KoreanRetroWindow } from "./components/KoreanRetroWindow";
import { Y2KSticker } from "./components/Y2KSticker";
import { Y2KTextBox } from "./components/Y2KTextBox";
import { DefaultLayout } from "./components/DefaultLayout";

export function About() {
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
              ABOUT
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
      
      {/* Retro Windows */}
      <div className="space-y-6 md:space-y-8">
        <RetroWindow />
        <KoreanRetroWindow />
      </div>
    </DefaultLayout>
  );
}
