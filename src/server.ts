import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import {
  ensureYtDlp,
  probe,
  buildChoices,
  download,
  findFfmpeg,
  type DownloadChoice,
  type VideoInfo,
} from './lib/ytdlp.js'

const OUT_DIR = path.join(os.homedir(), 'Downloads')

function getYoutubeId(url: string): string | null {
  const match = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(url)
  return match ? match[1] : null
}

function renderHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GRAB — Local Web Player</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #000000;
      color: #ededed;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Geist", Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 16px;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      width: 100%;
      max-width: 840px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #222222;
      padding-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: #ffffff;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    }
    .tag {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: #111111;
      border: 1px solid #222222;
      color: #888888;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .links a {
      color: #888888;
      text-decoration: none;
      font-size: 13px;
      transition: color 0.15s ease;
    }
    .links a:hover {
      color: #ededed;
    }
    .card {
      background: #111111;
      border: 1px solid #222222;
      border-radius: 10px;
      padding: 24px;
    }
    .input-group {
      display: flex;
      gap: 10px;
    }
    input[type="text"] {
      flex: 1;
      background: #000000;
      border: 1px solid #222222;
      border-radius: 6px;
      padding: 12px 16px;
      color: #ededed;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s ease;
    }
    input[type="text"]:focus {
      border-color: #555555;
    }
    input[type="text"]::placeholder {
      color: #555555;
    }
    button {
      background: #ededed;
      color: #000000;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      padding: 12px 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s ease, opacity 0.15s ease;
      white-space: nowrap;
    }
    button:hover:not(:disabled) {
      background: #ffffff;
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    button.secondary {
      background: #161616;
      color: #ededed;
      border: 1px solid #222222;
    }
    button.secondary:hover:not(:disabled) {
      background: #222222;
    }
    .preview-box {
      margin-top: 16px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #222222;
      background: #000000;
    }
    .player-frame {
      width: 100%;
      aspect-ratio: 16 / 9;
      border: none;
      display: block;
      background: #080808;
    }
    .video-thumb {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      display: block;
    }
    .video-meta {
      padding: 18px;
    }
    .video-title {
      font-size: 16px;
      font-weight: 600;
      color: #ededed;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .video-sub {
      font-size: 13px;
      color: #888888;
      display: flex;
      gap: 14px;
    }
    .formats-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #777777;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .formats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }
    .format-card {
      background: #0a0a0a;
      border: 1px solid #222222;
      border-radius: 8px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      transition: border-color 0.15s ease;
    }
    .format-card:hover {
      border-color: #383838;
    }
    .format-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-kind {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge-video {
      background: #182218;
      color: #6ee7b7;
      border: 1px solid #1f3b25;
    }
    .badge-audio {
      background: #231c2d;
      color: #d8b4fe;
      border: 1px solid #3c2a55;
    }
    .format-label {
      font-size: 14px;
      font-weight: 600;
      color: #ededed;
    }
    .progress-wrap {
      margin-top: 16px;
      background: #000000;
      border: 1px solid #222222;
      border-radius: 8px;
      padding: 16px;
    }
    .progress-bar-bg {
      background: #1f1f1f;
      height: 6px;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 10px;
    }
    .progress-bar-fill {
      background: #ededed;
      height: 100%;
      width: 0%;
      transition: width 0.2s ease;
    }
    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #888888;
    }
    .status-msg {
      font-size: 13px;
      margin-top: 10px;
      color: #aaaaaa;
    }
    .done-alert {
      margin-top: 16px;
      background: #081408;
      border: 1px solid #1b4d1b;
      border-radius: 8px;
      padding: 16px;
      color: #86efac;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .error-alert {
      margin-top: 16px;
      background: #180808;
      border: 1px solid #4d1b1b;
      border-radius: 8px;
      padding: 16px;
      color: #fca5a5;
      font-size: 13px;
    }
    .filepath-box {
      background: #000000;
      border: 1px solid #222222;
      border-radius: 4px;
      padding: 8px 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      color: #ededed;
      word-break: break-all;
    }
    footer {
      text-align: center;
      font-size: 12px;
      color: #555555;
      padding-top: 12px;
      border-top: 1px solid #1a1a1a;
    }
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-top-color: #000000;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <span class="logo">GRAB</span>
        <span class="tag">Local Player</span>
      </div>
      <div class="links">
        <a href="https://github.com/carbonthecoder/GRAB" target="_blank" rel="noopener">GitHub</a>
      </div>
    </header>

    <div class="card">
      <form id="urlForm" class="input-group">
        <input
          type="text"
          id="urlInput"
          placeholder="Paste video URL from YouTube, X, TikTok, 1,800+ sites..."
          required
        />
        <button type="submit" id="probeBtn">
          <span>Inspect</span>
        </button>
      </form>

      <div id="errorBox" class="error-alert" style="display: none;"></div>

      <div id="resultBox" style="display: none;">
        <div class="preview-box">
          <div id="playerSlot"></div>
          <div class="video-meta">
            <h2 id="videoTitle" class="video-title"></h2>
            <div class="video-sub">
              <span id="videoUploader"></span>
              <span id="videoDuration"></span>
            </div>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <div class="formats-title">Available Formats</div>
          <div id="formatsGrid" class="formats-grid"></div>
        </div>

        <div id="progressWrap" class="progress-wrap" style="display: none;">
          <div class="progress-info">
            <span id="progressStatus">Downloading...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress-bar-bg">
            <div id="progressBarFill" class="progress-bar-fill"></div>
          </div>
          <div id="progressDetails" class="status-msg"></div>
        </div>

        <div id="doneBox" class="done-alert" style="display: none;">
          <div>✓ File downloaded successfully!</div>
          <div id="donePath" class="filepath-box"></div>
          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <button type="button" class="secondary" id="copyPathBtn" style="padding: 6px 12px; font-size: 12px;">Copy Path</button>
          </div>
        </div>
      </div>
    </div>

    <footer>
      GRAB · Minimal terminal & local web downloader · Saved to ~/Downloads
    </footer>
  </div>

  <script>
    const form = document.getElementById('urlForm');
    const input = document.getElementById('urlInput');
    const probeBtn = document.getElementById('probeBtn');
    const errorBox = document.getElementById('errorBox');
    const resultBox = document.getElementById('resultBox');
    const playerSlot = document.getElementById('playerSlot');
    const videoTitle = document.getElementById('videoTitle');
    const videoUploader = document.getElementById('videoUploader');
    const videoDuration = document.getElementById('videoDuration');
    const formatsGrid = document.getElementById('formatsGrid');
    const progressWrap = document.getElementById('progressWrap');
    const progressStatus = document.getElementById('progressStatus');
    const progressPercent = document.getElementById('progressPercent');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressDetails = document.getElementById('progressDetails');
    const doneBox = document.getElementById('doneBox');
    const donePath = document.getElementById('donePath');
    const copyPathBtn = document.getElementById('copyPathBtn');

    let currentProbe = null;

    // Prefill from query parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('url')) {
      input.value = urlParams.get('url');
      probeUrl(input.value);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetUrl = input.value.trim();
      if (targetUrl) probeUrl(targetUrl);
    });

    async function probeUrl(url) {
      errorBox.style.display = 'none';
      resultBox.style.display = 'none';
      doneBox.style.display = 'none';
      progressWrap.style.display = 'none';
      probeBtn.disabled = true;
      probeBtn.innerHTML = '<span class="spinner"></span> <span>Inspecting...</span>';

      try {
        const res = await fetch('/api/probe', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({url})
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          throw new Error(data.error || 'Failed to inspect media URL.');
        }

        currentProbe = data;
        renderResult(data);
      } catch (err) {
        errorBox.textContent = err.message;
        errorBox.style.display = 'block';
      } finally {
        probeBtn.disabled = false;
        probeBtn.innerHTML = '<span>Inspect</span>';
      }
    }

    function formatDuration(sec) {
      if (!sec) return '';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function renderResult(data) {
      videoTitle.textContent = data.title;
      videoUploader.textContent = data.uploader ? 'By ' + data.uploader : '';
      videoDuration.textContent = data.duration ? formatDuration(data.duration) : '';

      playerSlot.innerHTML = '';
      if (data.youtubeId) {
        const iframe = document.createElement('iframe');
        iframe.className = 'player-frame';
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + data.youtubeId;
        iframe.allowFullscreen = true;
        playerSlot.appendChild(iframe);
      } else if (data.thumbnail) {
        const img = document.createElement('img');
        img.className = 'video-thumb';
        img.src = data.thumbnail;
        img.alt = data.title;
        playerSlot.appendChild(img);
      }

      formatsGrid.innerHTML = '';
      data.choices.forEach((choice) => {
        const card = document.createElement('div');
        card.className = 'format-card';

        const top = document.createElement('div');
        top.className = 'format-header';

        const kindBadge = document.createElement('span');
        kindBadge.className = 'badge-kind ' + (choice.kind === 'audio' ? 'badge-audio' : 'badge-video');
        kindBadge.textContent = choice.kind;

        top.appendChild(kindBadge);

        const lbl = document.createElement('div');
        lbl.className = 'format-label';
        lbl.textContent = choice.label;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Download';
        btn.onclick = () => startDownload(choice.index);

        card.appendChild(top);
        card.appendChild(lbl);
        card.appendChild(btn);
        formatsGrid.appendChild(card);
      });

      resultBox.style.display = 'block';
    }

    function startDownload(choiceIndex) {
      if (!currentProbe) return;
      doneBox.style.display = 'none';
      progressWrap.style.display = 'block';
      progressStatus.textContent = 'Initializing download...';
      progressPercent.textContent = '0%';
      progressBarFill.style.width = '0%';
      progressDetails.textContent = '';

      const evtSource = new EventSource(
        '/api/download-stream?url=' + encodeURIComponent(currentProbe.url) +
        '&choiceIndex=' + choiceIndex +
        '&infoJsonPath=' + encodeURIComponent(currentProbe.infoJsonPath || '')
      );

      evtSource.addEventListener('progress', (e) => {
        const p = JSON.parse(e.data);
        if (p.totalBytes && p.downloadedBytes) {
          const pct = Math.min(100, Math.round((p.downloadedBytes / p.totalBytes) * 100));
          progressPercent.textContent = pct + '%';
          progressBarFill.style.width = pct + '%';
        }
        progressStatus.textContent = p.part && p.totalParts && p.totalParts > 1
          ? 'Downloading part ' + p.part + ' of ' + p.totalParts + '...'
          : 'Downloading...';

        const parts = [];
        if (p.speed) {
          const mb = (p.speed / (1024 * 1024)).toFixed(1);
          parts.push(mb + ' MB/s');
        }
        if (p.eta) {
          parts.push(p.eta + 's remaining');
        }
        progressDetails.textContent = parts.join(' · ');
      });

      evtSource.addEventListener('processing', () => {
        progressStatus.textContent = 'Processing / Merging formats...';
        progressBarFill.style.width = '100%';
        progressPercent.textContent = '100%';
        progressDetails.textContent = 'Finalizing file...';
      });

      evtSource.addEventListener('done', (e) => {
        const res = JSON.parse(e.data);
        evtSource.close();
        progressWrap.style.display = 'none';
        donePath.textContent = res.filepath;
        doneBox.style.display = 'block';

        copyPathBtn.onclick = () => {
          navigator.clipboard.writeText(res.filepath);
          copyPathBtn.textContent = 'Copied!';
          setTimeout(() => (copyPathBtn.textContent = 'Copy Path'), 2000);
        };
      });

      evtSource.addEventListener('err', (e) => {
        evtSource.close();
        progressWrap.style.display = 'none';
        const res = JSON.parse(e.data);
        errorBox.textContent = res.message || 'Download failed.';
        errorBox.style.display = 'block';
      });

      evtSource.onerror = () => {
        evtSource.close();
      };
    }
  </script>
</body>
</html>`
}

function parseJsonBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => (body += chunk))
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

export function startServer(port = 3000): Promise<{server: http.Server; port: number; url: string}> {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = new URL(req.url ?? '/', `http://${req.headers.host || '127.0.0.1'}`)
      const pathname = parsedUrl.pathname

      // CORS headers for local API usage
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
      }

      // Root: Serve HTML
      if (pathname === '/' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(renderHtml())
        return
      }

      // API: Probe
      if (pathname === '/api/probe' && req.method === 'POST') {
        try {
          const body = await parseJsonBody(req)
          const targetUrl = typeof body?.url === 'string' ? body.url.trim() : ''
          if (!targetUrl) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ok: false, error: 'A valid URL is required.'}))
            return
          }

          const ytdlp = await ensureYtDlp(() => {})
          const probeResult = await probe(ytdlp, targetUrl)
          const choices = buildChoices(probeResult.info)
          const youtubeId = getYoutubeId(targetUrl)

          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(
            JSON.stringify({
              ok: true,
              url: targetUrl,
              title: probeResult.info.title || 'Untitled Video',
              uploader: probeResult.info.uploader,
              duration: probeResult.info.duration,
              youtubeId,
              thumbnail: youtubeId
                ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
                : undefined,
              choices: choices.map((c, i) => ({
                index: i,
                label: c.label,
                kind: c.kind,
              })),
              infoJsonPath: probeResult.infoJsonPath,
            }),
          )
        } catch (err: any) {
          res.writeHead(500, {'Content-Type': 'application/json'})
          res.end(JSON.stringify({ok: false, error: err.message || 'Inspection failed.'}))
        }
        return
      }

      // API: Download via SSE stream
      if (pathname === '/api/download-stream' && req.method === 'GET') {
        const targetUrl = parsedUrl.searchParams.get('url') || ''
        const choiceIndexStr = parsedUrl.searchParams.get('choiceIndex') || '0'
        const infoJsonPath = parsedUrl.searchParams.get('infoJsonPath') || undefined
        const choiceIndex = parseInt(choiceIndexStr, 10)

        if (!targetUrl) {
          res.writeHead(400, {'Content-Type': 'text/plain'})
          res.end('Missing url parameter')
          return
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })

        const sendEvent = (event: string, data: any) => {
          res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        }

        try {
          const ytdlp = await ensureYtDlp(() => {})
          const ffmpeg = await findFfmpeg()

          let choice: DownloadChoice | undefined
          if (infoJsonPath && fs.existsSync(infoJsonPath)) {
            const raw = JSON.parse(fs.readFileSync(infoJsonPath, 'utf8')) as VideoInfo
            const choices = buildChoices(raw)
            choice = choices[choiceIndex] || choices[0]
          }

          if (!choice) {
            const probeResult = await probe(ytdlp, targetUrl)
            const choices = buildChoices(probeResult.info)
            choice = choices[choiceIndex] || choices[0]
          }

          if (!choice) {
            sendEvent('err', {message: 'No suitable format selected.'})
            res.end()
            return
          }

          const filepath = await download(
            {
              ytdlp,
              ffmpegLocation: ffmpeg,
              url: targetUrl,
              infoJsonPath,
              choice,
              outDir: OUT_DIR,
            },
            {
              onProgress: progress => sendEvent('progress', progress),
              onProcessing: () => sendEvent('processing', {}),
            },
          )

          sendEvent('done', {filepath})
          res.end()
        } catch (err: any) {
          sendEvent('err', {message: err.message || 'Download failed.'})
          res.end()
        }
        return
      }

      // 404
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end('Not Found')
    })

    server.listen(port, '127.0.0.1', () => {
      resolve({
        server,
        port,
        url: `http://127.0.0.1:${port}`,
      })
    })

    server.on('error', reject)
  })
}

// Allow running standalone: node dist/server.js
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  const port = parseInt(process.env.PORT || '3000', 10)
  startServer(port).then(({url}) => {
    console.log(`GRAB local web server running at: ${url}`)
  })
}
