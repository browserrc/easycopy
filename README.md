# Easy Copy

A browser extension that makes copying links easy. When you click the extension icon, it automatically copies the current tab's title and URL in markdown format: `[Page Title](https://example.com)`.

## Features

- **One-click copying**: Click the extension icon to copy the current page as a markdown link
- **Cross-browser support**: Works on Chrome and Firefox
- **Offscreen copying**: Uses modern browser APIs for secure clipboard access

## Development

### Prerequisites

- [Bun](https://bun.com) (JavaScript runtime and bundler)

### Setup

Install dependencies:

```bash
bun install
```

### Building

Build the extension for both Chrome and Firefox:

```bash
bun run index.tsx
```

This will generate the built extensions in the `dist/` directory.

### Development

The project uses [browserrc](https://github.com/browserrc/browserrc) for building browser extensions with Bun.

## Installation

### Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist/chrome/` directory

### Firefox
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file in the `dist/firefox/` directory

## Usage

1. Navigate to any webpage
2. Click the Easy Copy extension icon in your browser toolbar
3. The markdown link `[Page Title](https://example.com)` will be copied to your clipboard
4. Paste it anywhere you need a formatted link

## Permissions

The extension requires the following permissions:
- `clipboardWrite`: To copy text to clipboard
- `tabs`: To access current tab information
- `offscreen`: To use offscreen documents for clipboard operations
