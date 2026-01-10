import React from "react";
import { RetroImage } from "./RetroImage";
import { KoreanPixelGallery } from "./KoreanPixelGallery";
import { PixelGrid } from "./PixelGrid";

export function CodePage() {
  return (
    <div className="w-full">
      <RetroImage />
      <KoreanPixelGallery />
      <PixelGrid />
    </div>
  );
}
