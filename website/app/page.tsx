'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [copied, setCopied] = useState(false)
  const [installMethod, setInstallMethod] = useState<'curl' | 'git'>('curl')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'light' || current === 'dark') {
      setTheme(current)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('grab-theme', next)
    } catch {}
  }

  const curlCmd = 'curl -fsSL https://raw.githubusercontent.com/carbonthecoder/GRAB/main/website/public/install.sh | bash'
  const gitCmd = 'git clone https://github.com/carbonthecoder/GRAB.git && cd GRAB && npm i && npm link'

  const activeCmd = installMethod === 'curl' ? curlCmd : gitCmd

  const copyCmd = () => {
    navigator.clipboard.writeText(activeCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container">
      <div className="top-bar">
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className={`theme-icon ${theme === 'light' ? 'rotate-sun' : 'rotate-moon'}`}>
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </span>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className="badge">
        <span className="badge-dot"></span>
        <span>v1.0.0 released</span>
      </div>

      <h1 className="logo">GRAB</h1>

      <p className="tagline">
        Download video and audio from YouTube, X, TikTok, and 1,800+ sites.
        <br />
        Paste a URL, choose a resolution or MP3, and save with zero ad redirects.
      </p>

      <div className="screenshot">
        <div className="mockup-frame">
          <div className="mockup-header">
            <span className="mockup-dot" style={{ background: '#ef4444' }}></span>
            <span className="mockup-dot" style={{ background: '#eab308' }}></span>
            <span className="mockup-dot" style={{ background: '#22c55e' }}></span>
            <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px', fontFamily: 'monospace' }}>grab ~ terminal</span>
          </div>
          <div className="mockup-body">
            <div style={{ color: '#22c55e', marginBottom: '8px' }}>$ grab https://youtube.com/watch?v=dQw4w9WgXcQ</div>
            <div style={{ color: '#888', marginBottom: '14px' }}>⚡ Resolving streams across 1,800+ extractors...</div>
            <div style={{ background: '#111', padding: '12px', borderRadius: '8px', border: '1px solid #222' }}>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '6px' }}>Select Format:</div>
              <div style={{ color: '#38bdf8' }}>▶ [1] 1080p Full HD (video/mp4) · 84.2 MB</div>
              <div style={{ color: '#aaa' }}>  [2] 720p HD (video/mp4) · 41.5 MB</div>
              <div style={{ color: '#aaa' }}>  [3] Audio Only (audio/mp3 320kbps) · 4.8 MB</div>
            </div>
            <div style={{ marginTop: '12px', color: '#666', fontSize: '12px' }}>
              Saved to ~/Downloads · Enter to download · Esc to cancel
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-section">
        <div className="tab-pill">
          <code>↑ / ↓</code> Select format
        </div>
        <div className="tab-pill">
          <code>Enter</code> Start download
        </div>
        <div className="tab-pill">
          <code>--web</code> Local player UI
        </div>
      </div>

      <div className="install-box" onClick={copyCmd} title="Click to copy command">
        <div className="install-header">
          <div className="install-tabs">
            <span className="install-label">Install</span>
            <button
              type="button"
              className={`install-tab-btn ${installMethod === 'curl' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setInstallMethod('curl')
              }}
            >
              curl
            </button>
            <span className="install-tab-divider">/</span>
            <button
              type="button"
              className={`install-tab-btn ${installMethod === 'git' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setInstallMethod('git')
              }}
            >
              git + npm
            </button>
          </div>
          <span className={`copy-hint ${copied ? 'copied' : ''}`}>
            {copied ? '✓ Copied' : 'Click to copy'}
          </span>
        </div>
        <div className="install-cmd">
          <span className="prompt">$</span>
          {activeCmd}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-title">
            <span>1,800+ Supported Sites</span>
          </div>
          <div className="feature-desc">
            YouTube, X, Instagram, TikTok, Threads, Reddit, Twitch, and more via yt-dlp.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">
            <span>Audio & MP3 Extraction</span>
          </div>
          <div className="feature-desc">
            Extract pure 320kbps MP3 audio tracks directly with one keystroke.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">
            <span>Zero Popups & Zero Ads</span>
          </div>
          <div className="feature-desc">
            Direct streams bypassing hostile web ad redirect networks and fake download buttons.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">
            <span>Obsidian Local Player UI</span>
          </div>
          <div className="feature-desc">
            Run grab --web to inspect metadata, preview streams, and download via localhost:3000.
          </div>
        </div>
      </div>

      <div className="links">
        <a
          href="https://github.com/carbonthecoder/GRAB"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://github.com/carbonthecoder/GRAB/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT License
        </a>
      </div>

      <div className="footer">
        <span>GRAB</span>
        <span>·</span>
        <a
          href="https://github.com/carbonthecoder"
          target="_blank"
          rel="noopener noreferrer"
        >
          carbonthecoder
        </a>
      </div>
    </div>
  )
}
