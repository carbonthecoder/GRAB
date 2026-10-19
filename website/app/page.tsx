'use client'

import { useState } from 'react'

const CURL_CMD = 'curl -fsSL https://raw.githubusercontent.com/carbonthecoder/GRAB/main/website/public/install.sh | bash'
const NPM_CMD = 'npm install -g grab'

export default function Home() {
  const [tab, setTab] = useState<'curl' | 'npm'>('curl')
  const [copied, setCopied] = useState(false)

  const activeCommand = tab === 'curl' ? CURL_CMD : NPM_CMD

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid #222222',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
            }}
          >
            GRAB
          </span>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: '#111111',
              border: '1px solid #222222',
              color: '#888888',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            v1.0.0
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="https://github.com/carbonthecoder/GRAB"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              color: '#888888',
              transition: 'color 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '64px 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <pre
            style={{
              fontSize: '11px',
              lineHeight: 1.25,
              color: '#ffffff',
              letterSpacing: '0.04em',
              background: '#050505',
              padding: '16px 20px',
              borderRadius: '8px',
              border: '1px solid #1a1a1a',
              display: 'inline-block',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >{`  ░██████   ░████████      ░███    ░████████  
 ░██   ░██  ░██     ░██   ░██░██   ░██     ░██
░██         ░██     ░██  ░██  ░██  ░██     ░██
░██   ░████ ░████████   ░█████████ ░████████  
░██      ░██░██   ░██   ░██    ░██ ░██     ░██
 ░██   ░██  ░██    ░██  ░██    ░██ ░██     ░██
  ░██████   ░██     ░██ ░██    ░██ ░████████  `}</pre>

          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              lineHeight: 1.15,
            }}
          >
            Download any video or audio directly from your terminal.
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 19px)',
              color: '#999999',
              lineHeight: 1.5,
              maxWidth: '680px',
            }}
          >
            Download any video or audio from YouTube, X, TikTok, and 1,800+ sites directly from your terminal.
          </p>

          {/* Install Box */}
          <div
            style={{
              width: '100%',
              maxWidth: '640px',
              marginTop: '12px',
              background: '#111111',
              border: '1px solid #222222',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setTab('curl')}
                style={{
                  background: tab === 'curl' ? '#222222' : 'transparent',
                  color: tab === 'curl' ? '#ffffff' : '#777777',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                curl (Standalone)
              </button>
              <button
                type="button"
                onClick={() => setTab('npm')}
                style={{
                  background: tab === 'npm' ? '#222222' : 'transparent',
                  color: tab === 'npm' ? '#ffffff' : '#777777',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                npm (Global)
              </button>
            </div>

            {/* Command Display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                background: '#000000',
                border: '1px solid #222222',
                borderRadius: '6px',
                padding: '12px 14px',
              }}
            >
              <code
                style={{
                  fontSize: '13px',
                  color: '#ededed',
                  fontFamily: 'var(--font-mono)',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  flex: 1,
                  textAlign: 'left',
                }}
              >
                {activeCommand}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  background: copied ? '#1e3822' : '#ededed',
                  color: copied ? '#86efac' : '#000000',
                  border: copied ? '1px solid #2d5a34' : 'none',
                  borderRadius: '5px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <section style={{ width: '100%', marginTop: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Extractor
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                1,800+ Sites
              </h3>
              <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.5 }}>
                Supports YouTube, X, TikTok, Instagram, Threads, Reddit, Vimeo, Twitch, and thousands more through the yt-dlp backend.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Audio
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Audio Extractor (MP3)
              </h3>
              <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.5 }}>
                Extract high-bitrate MP3 or original audio streams with a single keystroke. Bundled FFmpeg handles conversions automatically.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Clean
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Zero Ads / Zero Popups
              </h3>
              <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.5 }}>
                No fake download buttons, no redirects, and no tracking scripts. Clean terminal execution straight to your Downloads folder.
              </p>
            </div>

            {/* Card 4 */}
            <div
              style={{
                background: '#111111',
                border: '1px solid #222222',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#888888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Local UI
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Local Web Player
              </h3>
              <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.5 }}>
                Launch a sleek obsidian black web interface on localhost:3000 using <code style={{ color: '#fff', background: '#000', padding: '2px 4px', borderRadius: '3px' }}>grab --web</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Terminal Demo Section */}
        <section style={{ width: '100%', maxWidth: '840px' }}>
          <div
            style={{
              background: '#0c0c0c',
              border: '1px solid #222222',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#141414',
                padding: '12px 16px',
                borderBottom: '1px solid #222222',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333333' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333333' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333333' }} />
              <span style={{ fontSize: '12px', color: '#666666', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>
                bash — grab
              </span>
            </div>
            <pre
              style={{
                padding: '20px',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#ededed',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
              }}
            >
              <span style={{ color: '#888888' }}>$</span> grab https://youtu.be/dQw4w9WgXcQ{'\n'}
              <span style={{ color: '#6ee7b7' }}>▶</span> 1080p · mp4 · 42.1 MB{'\n'}
              <span style={{ color: '#888888' }}>  720p · mp4 · 24.3 MB{'\n'}  480p · mp4 · 14.8 MB{'\n'}</span>
              <span style={{ color: '#d8b4fe' }}>♪</span> MP3 audio · 320kbps · 3.4 MB{'\n'}
              {'\n'}
              <span style={{ color: '#6ee7b7' }}>✓ grabbed</span> → ~/Downloads/Rick Astley - Never Gonna Give You Up.mp4
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #222222',
          padding: '24px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#666666',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>GRAB — Created by <a href="https://github.com/carbonthecoder" target="_blank" rel="noopener noreferrer" style={{ color: '#ededed' }}>carbonthecoder</a></span>
          <a
            href="https://github.com/carbonthecoder/GRAB"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ededed' }}
          >
            GitHub Repository
          </a>
        </div>
      </footer>
    </div>
  )
}
