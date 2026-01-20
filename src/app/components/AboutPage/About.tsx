import React from "react";
import { RetroWindow } from "../layouts/RetroWindow";
import { KoreanRetroWindow } from "../layouts/KoreanRetroWindow";

export function About() {
  return (
    <div className="space-y-6 md:space-y-8">
      <RetroWindow />
      <KoreanRetroWindow />
    </div>
  );
}
