import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code, Quote, List, ListOrdered } from 'lucide-react';

interface RetroMarkdownRendererProps {
  content: string;
}

export function RetroMarkdownRenderer({ content }: RetroMarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1
            className="text-[#FF1493] text-xl md:text-2xl mb-6 pb-3 border-b-4 border-[#FFB6C1]"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className="text-[#e91e63] text-lg md:text-xl mb-4 mt-8 pb-2 border-b-3 border-[#FFB6C1]"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className="text-[#FF69B4] text-base md:text-lg mb-3 mt-6"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            className="text-[#FF1493] text-sm md:text-base mb-2 mt-4"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </h4>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p
            className="text-[#1a0033] text-sm md:text-base mb-4 leading-relaxed"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </p>
        ),

        // Bold
        strong: ({ children }) => (
          <strong className="text-[#FF1493] font-bold">{children}</strong>
        ),

        // Italic
        em: ({ children }) => (
          <em className="text-[#9c27b0] not-italic underline decoration-wavy">{children}</em>
        ),

        // Strikethrough
        del: ({ children }) => (
          <del className="text-gray-500 line-through">{children}</del>
        ),

        // Blockquote
        blockquote: ({ children }) => (
          <div className="bg-gradient-to-br from-[#FFE4E1] to-[#FFC0CB] border-l-4 border-[#FF1493] p-4 md:p-6 my-6 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]" style={{ imageRendering: "pixelated" }}>
            <Quote className="w-6 h-6 text-[#FF69B4] mb-2" style={{ imageRendering: "pixelated" }} />
            <div style={{ fontFamily: "'DungGeunMo', monospace" }}>{children}</div>
          </div>
        ),

        // Unordered List
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 bg-[#FFF0F5] border-3 border-[#FFB6C1] p-4 shadow-[4px_4px_0px_0px_rgba(255,182,193,0.5)]" style={{ imageRendering: "pixelated" }}>
            <div className="flex items-center gap-2 mb-3">
              <List className="w-5 h-5 text-[#FF69B4]" />
            </div>
            {children}
          </ul>
        ),

        // Ordered List
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 bg-[#F0F8FF] border-3 border-[#00bcd4] p-4 shadow-[4px_4px_0px_0px_rgba(0,188,212,0.5)]" style={{ imageRendering: "pixelated" }}>
            <div className="flex items-center gap-2 mb-3">
              <ListOrdered className="w-5 h-5 text-[#00bcd4]" />
            </div>
            {children}
          </ol>
        ),

        // List Items
        li: ({ children }) => (
          <li
            className="flex items-start gap-2 text-[#1a0033] text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            <span className="text-[#FF1493] mt-1">●</span>
            <span>{children}</span>
          </li>
        ),

        // Inline Code
        code: ({ inline, children }) => {
          if (inline) {
            return (
              <code
                className="px-3 py-1 bg-gradient-to-r from-[#ff1493] to-[#ff69b4] text-white border-3 border-[#ff1493] text-xs mx-1 shadow-[3px_3px_0px_0px_rgba(255,20,147,0.6)] hover:shadow-[5px_5px_0px_0px_rgba(255,20,147,0.8)] transition-all"
                style={{ 
                  fontFamily: "'VT323', monospace", 
                  imageRendering: "pixelated",
                  boxShadow: "inset -1px -1px 0 0 rgba(0,0,0,0.3), inset 1px 1px 0 0 rgba(255,255,255,0.3)"
                }}
              >
                ⟨ {children} ⟩
              </code>
            );
          }
          return children;
        },

        // Code Block
        pre: ({ children }) => {
          const codeContent = typeof children === 'object' && 
            children !== null && 
            'props' in children ? 
              String(children.props.children).trim() : 
              String(children).trim();
          
          const lines = codeContent.split('\n');
          
          return (
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
                      {lines.map((_, index) => (
                        <div
                          key={index}
                          className="text-[#ff69b4] text-sm leading-relaxed text-right py-[2px]"
                          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
                        >
                          {String(index + 1).padStart(3, '0')}
                        </div>
                      ))}
                    </div>
                    
                    {/* Code Lines */}
                    <div className="flex-1 overflow-x-auto">
                      <pre className="text-sm leading-relaxed" style={{ fontFamily: "'VT323', monospace" }}>
                        {lines.map((line, index) => {
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
                    <span className="text-black">LINES: {lines.length}</span>
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
          );
        },

        // Table
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full border-4 border-[#FF1493] shadow-[6px_6px_0px_0px_rgba(255,20,147,0.3)]" style={{ imageRendering: "pixelated" }}>
              {children}
            </table>
          </div>
        ),

        // Table Header
        thead: ({ children }) => (
          <thead className="bg-gradient-to-r from-[#FF1493] to-[#FF69B4]">
            {children}
          </thead>
        ),

        // Table Header Cell
        th: ({ children }) => (
          <th
            className="border-2 border-[#C2185B] px-4 py-3 text-left text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {children}
          </th>
        ),

        // Table Body
        tbody: ({ children }) => (
          <tbody style={{ fontFamily: "'DungGeunMo', monospace" }}>
            {children}
          </tbody>
        ),

        // Table Row
        tr: ({ children }) => (
          <tr className="bg-white hover:bg-[#FFB6C1] transition-colors">
            {children}
          </tr>
        ),

        // Table Data Cell
        td: ({ children }) => (
          <td className="border-2 border-[#FFB6C1] px-4 py-3 text-[#1a0033] text-xs md:text-sm">
            {children}
          </td>
        ),

        // Link
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FF1493] underline hover:text-[#C2185B] transition-colors"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {children}
          </a>
        ),

        // Horizontal Rule
        hr: () => (
          <hr className="my-8 border-t-4 border-[#FFB6C1]" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}