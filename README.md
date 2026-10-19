# GRAB

```
  ░██████   ░████████      ░███    ░████████  
 ░██   ░██  ░██     ░██   ░██░██   ░██     ░██
░██         ░██     ░██  ░██  ░██  ░██     ░██
░██   ░████ ░████████   ░█████████ ░████████  
░██      ░██░██   ░██   ░██    ░██ ░██     ░██
 ░██   ░██  ░██    ░██  ░██    ░██ ░██     ░██
  ░██████   ░██     ░██ ░██    ░██ ░████████  
```

Download videos and audio from YouTube, X, TikTok, Instagram, and 1,800+ sites directly from your terminal. Paste a URL, pick a resolution or MP3 audio, and save without popups or ads.

## Install

Via shell script:

```sh
curl -fsSL https://raw.githubusercontent.com/carbonthecoder/GRAB/main/website/public/install.sh | bash
```

Via npm:

```sh
npm install -g grab
```

Or run directly without installing:

```sh
npx grab
```

Requires Node 18+. The runtime downloads or bundles yt-dlp and ffmpeg automatically on first execution.

## Usage

```sh
$ grab https://youtu.be/dQw4w9WgXcQ    # Open format picker directly
$ grab                                 # Prompt for URL or detect clipboard
$ grab --web                           # Launch local obsidian web player on http://127.0.0.1:3000
$ grab --theme light                   # Force light palette (default: auto)
```

GRAB runs full-screen in the terminal and restores scrollback on exit. Navigate formats with arrow keys (`↑`/`↓`), vim keys (`j`/`k`), or numbers, then press Enter. Mouse clicks work across format buttons, hints, and the logo. Files save to `~/Downloads`.

## Features

- **1,800+ sites** — YouTube, X, TikTok, Instagram, Threads, Reddit, Vimeo, Twitch, and Bilibili via yt-dlp.
- **Audio extractor** — Extract MP3 or best audio with a single keystroke.
- **Local Web Player** — Start an obsidian dark web UI at `http://127.0.0.1:3000` via `grab --web`.
- **Terminal themes** — Auto, light, and dark palettes matching your terminal emulator.
- **Mouse + keyboard** — Full input support for arrows, vim keys, and mouse clicks.
- **Clipboard detection** — Automatically suggests URLs currently copied in your clipboard.
- **History tracking** — Stores recent URLs for fast re-downloads.

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `↑` / `↓` | Navigate format list |
| `↵` | Select and download |
| `esc` | Back / cancel |
| `^t` | Cycle theme mode |
| `^c` | Exit |

## Configuration

- **yt-dlp binary** — Stored in `~/.grab/bin/`.
- **History** — Saved in `~/.config/grab/history.json`.
- **Downloads** — Saved to `~/Downloads`.

## Author

**carbonthecoder**
- GitHub: [carbonthecoder](https://github.com/carbonthecoder)
- Repository: [carbonthecoder/GRAB](https://github.com/carbonthecoder/GRAB)

## License

MIT
