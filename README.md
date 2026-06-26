# BBC Latest News

A simple Node.js web application that fetches and displays the latest headlines from the BBC News RSS feed.

## Features

- Fetches live headlines from `https://feeds.bbci.co.uk/news/rss.xml`
- Responsive card-based grid layout
- Thumbnail images, descriptions, and publication dates
- Links to full articles on bbc.co.uk

## Getting Started

### Prerequisites

- Node.js 18+

### Install & Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Set the `PORT` environment variable to change the listening port (default: `3000`).

```bash
PORT=8080 npm start
```
