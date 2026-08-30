# picker

[English](./README.md) | [한국어](./README.ko.md)

A category-based random picker — create a category, add items to it, and let it pick one for you. Merged from two earlier single-domain pickers (game / food) into one general tool.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## Features

- Create/delete categories (e.g. "Games", "Food", or anything else)
- Add/remove items within a category
- Randomly pick one item from the selected category
- Everything persists in `localStorage` — no backend

## Tech Stack

- **Vite + React + TypeScript**
- **Docker / Docker Compose** — isolated dev environment

## Getting Started

### Prerequisites

- Docker Desktop

### Run

```bash
git clone https://github.com/dev1f965x/picker.git
cd picker
docker compose up --build
```

Open `http://localhost:5173`.

## Roadmap

- [ ] Domain-specific weighted picking for common fixed categories (games, food) — may or may not happen; plain random is the baseline and stays the fallback either way
