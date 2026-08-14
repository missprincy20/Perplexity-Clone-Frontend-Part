# Perplexity Clone — Frontend

Frontend application for the Perplexity-style AI search interface.

Built with React, TypeScript, Vite, Tailwind CSS and the existing application components for chat, search results, sources, videos, images, suggestions and different focus modes.

## Features

* Perplexity-style chat interface
* Streaming AI answers
* SSE response handling
* Search source display
* Source metadata display
* Source URL preservation
* Web search
* Academic search
* Reddit search
* YouTube search
* Video results
* Image results
* Writing mode
* Suggestions
* Markdown rendering
* Code highlighting
* Math rendering
* Independent sidebar scrolling
* Independent chat scrolling
* Fixed bottom composer
* Responsive chat layout
* Dark UI

## Focus Modes

The application supports the existing focus modes:

```text
Academic
Web
Reddit
YouTube
Videos
Images
Writing
Labs
```

The common chat/layout components are shared across these modes.

## Streaming

The frontend receives backend SSE events and updates the current assistant message as events arrive.

Main events handled by the frontend include:

```text
token
status
documents_found
sources
data
suggestions
completed
error
```

### Answer Streaming

Normal search and writing responses stream through `token` events.

The streamed answer is kept separate from structured source/result data.

### Sources

Search source information is stored separately from the main answer.

The frontend can display:

```text
Sources (N)
```

with source cards containing available information such as:

* Source index
* Title
* Domain
* Source type
* Snippet/content
* Metadata
* Thumbnail when available
* Clickable source URL

The frontend does not create fake sentence-level citations when the backend does not provide citation mappings.

## Source Types

The source UI supports:

```text
Web
Academic
Reddit
YouTube
Image
```

Source-specific information is displayed when it is available from the backend.

### Web Sources

Can display:

* Title
* Domain
* URL
* Snippet
* Source type
* Metadata

### Academic Sources

Can display:

* Paper title
* Authors when available
* Venue/publication information when available
* Date when available
* Domain
* URL
* Abstract/content/snippet
* Metadata

### Reddit Sources

Can display:

* Post title
* Reddit domain
* Author when available
* Subreddit when available
* Date when available
* Snippet/content
* Exact Reddit URL
* Source type

### YouTube Sources

Can display:

* Video title
* Thumbnail
* Channel/author when available
* Date when available
* Description/snippet
* YouTube source type
* Exact YouTube URL
* Additional provider metadata when available

YouTube source URLs are kept unchanged.

### Image Sources

Can display:

* Image/result title
* Thumbnail/image
* Source domain
* Source page URL
* Metadata
* Source type

## Video Results

Video results are handled separately from normal answer text.

The frontend accepts structured video data such as:

```json
{
  "type": "data",
  "data": {
    "type": "videos",
    "data": []
  }
}
```

The video UI supports:

* Video title
* Thumbnail
* Description
* Clickable URL
* Multiple video results
* Different thumbnail formats

The video section does not depend on `fullAnswer`.

Therefore this valid state is supported:

```text
answer: ""
videos: [...]
```

## Chat State

Incoming SSE data is processed and attached to the relevant assistant message.

The message can contain independent fields such as:

```text
answer
videos
sources
suggestions
loading
```

This allows structured results to remain available even when the normal answer text is empty.

## Source Normalization

The frontend normalizes source data before rendering.

It can extract:

```text
title
url
domain
snippet
content
sourceType
thumbnail
metadata
```

The original URL is preserved.

Domain information is derived for display purposes, while the source URL remains the actual backend/provider URL.

## Chat Layout

The application uses a shared chat layout for the different agents.

Current layout behavior:

```text
Application
├── Sidebar
│   └── Independent vertical scroll
│
└── Main Chat
    ├── Scrollable messages
    └── Fixed bottom composer
```

### Sidebar

The sidebar:

* Occupies the available viewport height
* Has its own vertical scrolling area
* Does not scroll the main chat
* Keeps navigation accessible
* Keeps the profile section accessible on smaller viewport heights

### Main Chat

The main chat:

* Uses the available horizontal space
* Avoids unnecessary right-side whitespace
* Uses the viewport height
* Has its own vertical scrolling area
* Prevents long conversations from expanding the whole page

### Composer

The chat composer remains at the bottom of the chat interface.

Long responses and streaming responses do not push the composer outside the viewport.

The existing input controls and functionality remain unchanged.

## Responsive Layout

The layout is designed to work across:

* Desktop
* Laptop
* Smaller viewport heights
* Narrower browser widths

The main chat uses the available width while keeping the existing visual spacing and dark theme.

## Main Frontend Structure

```text
src/
├── api/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
├── types/
├── App.css
├── App.tsx
└── main.tsx

public/
package.json
vite.config.ts
tsconfig.json
```

## Important Components

The frontend implementation includes shared components for:

* Chat
* Chat window
* Chat input
* Sidebar
* Answer cards
* Source cards/source UI
* Markdown rendering
* Video results
* Image results
* Suggestions

The exact component structure can evolve, but agent-specific functionality remains connected through the shared chat architecture.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Framer Motion
* React Markdown
* Remark GFM
* Remark Math
* Rehype Highlight
* Rehype KaTeX
* Lucide React
* Recharts
* React Syntax Highlighter

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the frontend development server:

```bash
npm run dev
```

Vite is used as the frontend development server.

The frontend should be configured to communicate with the running backend API.

## Production Build

```bash
npm run build
```

The build performs TypeScript compilation and creates the Vite production bundle.

## TypeScript Check

```bash
npx tsc --noEmit
```

## Lint

```bash
npm run lint
```

## Preview Production Build

```bash
npm run preview
```

## Backend Connection

The frontend expects the backend service to be running separately.

Typical local development setup:

```text
Frontend
Vite
   │
   │ SSE / API
   ▼
Backend
Express + TypeScript
   │
   ▼
Search / AI Agents
```

The frontend does not implement search logic itself.

Search, source retrieval, reranking, structured video results and answer generation remain backend responsibilities.

## Existing Functionality

The frontend keeps the following functionality:

* Web answers
* Academic answers
* Reddit answers
* YouTube results
* Video results
* Image results
* Writing responses
* Streaming tokens
* Sources
* Source metadata
* Suggestions
* Markdown
* Code blocks
* Mathematical content
* Chat history
* Focus modes
* Sidebar navigation

## Verification

The implemented frontend has been checked with:

```bash
npx tsc --noEmit
```

and:

```bash
npm run build
```

Browser-based visual verification was not available in the previous verification environment, so UI behavior should be manually checked in a real browser.

## Repository

Frontend repository:

https://github.com/missprincy20/Perplexity-Clone-Frontend-Part
