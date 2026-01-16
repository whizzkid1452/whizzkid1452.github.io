import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    // Pink pixel cursor designs as SVG data URLs (larger size: 64x64)
    const pinkArrowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="18" width="6" height="6" fill="#FF69B4"/>
        <rect x="12" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="24" width="6" height="6" fill="#FFB6C1"/>
        <rect x="12" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="30" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="30" width="6" height="6" fill="#FFC0CB"/>
        <rect x="12" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="36" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="36" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="36" width="6" height="6" fill="#FFC0CB"/>
        <rect x="36" y="36" width="6" height="6" fill="#FFE4E1"/>
        <rect x="12" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="42" width="6" height="6" fill="#FFB6C1"/>
        <rect x="18" y="48" width="6" height="6" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkHeartCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="36" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="42" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="24" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="24" width="6" height="6" fill="#FFB6C1"/>
        <rect x="42" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="48" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="24" y="30" width="6" height="6" fill="#FFC0CB"/>
        <rect x="30" y="30" width="6" height="6" fill="#FFE4E1"/>
        <rect x="36" y="30" width="6" height="6" fill="#FFC0CB"/>
        <rect x="42" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="48" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="36" width="6" height="6" fill="#FFB6C1"/>
        <rect x="24" y="36" width="6" height="6" fill="#FFC0CB"/>
        <rect x="30" y="36" width="6" height="6" fill="#FFE4E1"/>
        <rect x="36" y="36" width="6" height="6" fill="#FFC0CB"/>
        <rect x="42" y="36" width="6" height="6" fill="#FFB6C1"/>
        <rect x="48" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="30" y="42" width="6" height="6" fill="#FFB6C1"/>
        <rect x="36" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="42" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="48" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="48" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="48" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="54" width="6" height="6" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkStarCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="12" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="18" width="6" height="6" fill="#FFB6C1"/>
        <rect x="36" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="30" y="24" width="6" height="6" fill="#FFE4E1"/>
        <rect x="36" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="42" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="30" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="30" width="6" height="6" fill="#FFC0CB"/>
        <rect x="36" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="42" y="30" width="6" height="6" fill="#FF69B4"/>
        <rect x="48" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="36" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="48" width="6" height="6" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkBowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="42" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="48" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="36" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="42" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="48" y="24" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="30" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="30" width="6" height="6" fill="#FFB6C1"/>
        <rect x="42" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="36" width="6" height="6" fill="#FFE4E1"/>
        <rect x="36" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="42" width="6" height="6" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkPawCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <!-- Left toe -->
        <rect x="12" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="18" y="24" width="6" height="6" fill="#FF1493"/>
        <!-- Middle toe -->
        <rect x="26" y="12" width="6" height="6" fill="#FF1493"/>
        <rect x="26" y="18" width="6" height="6" fill="#FF69B4"/>
        <rect x="32" y="18" width="6" height="6" fill="#FF1493"/>
        <!-- Right toe -->
        <rect x="42" y="18" width="6" height="6" fill="#FF1493"/>
        <rect x="42" y="24" width="6" height="6" fill="#FF69B4"/>
        <rect x="48" y="24" width="6" height="6" fill="#FF1493"/>
        <!-- Main pad outline -->
        <rect x="18" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="36" y="30" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="36" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="36" width="6" height="6" fill="#FFB6C1"/>
        <rect x="30" y="36" width="6" height="6" fill="#FFB6C1"/>
        <rect x="36" y="36" width="6" height="6" fill="#FF69B4"/>
        <rect x="42" y="36" width="6" height="6" fill="#FF1493"/>
        <rect x="12" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="24" y="42" width="6" height="6" fill="#FFC0CB"/>
        <rect x="30" y="42" width="6" height="6" fill="#FFC0CB"/>
        <rect x="36" y="42" width="6" height="6" fill="#FF69B4"/>
        <rect x="42" y="42" width="6" height="6" fill="#FF1493"/>
        <rect x="18" y="48" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="48" width="6" height="6" fill="#FF69B4"/>
        <rect x="30" y="48" width="6" height="6" fill="#FF69B4"/>
        <rect x="36" y="48" width="6" height="6" fill="#FF1493"/>
        <rect x="24" y="54" width="6" height="6" fill="#FF1493"/>
        <rect x="30" y="54" width="6" height="6" fill="#FF1493"/>
      </svg>
    `)}`;
    
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
          cursor: url("${randomCursor}") 12 12, auto !important;
        }
        a, button, [role="button"], [type="button"], [type="submit"], [type="reset"],
        select, summary, [onclick], .cursor-pointer {
          cursor: url("${pinkPawCursor}") 30 30, pointer !important;
        }
        input[type="text"], input[type="email"], input[type="password"], input[type="search"],
        input[type="tel"], input[type="url"], input[type="number"], textarea, [contenteditable="true"] {
          cursor: url("${randomCursor}") 12 12, text !important;
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
}
