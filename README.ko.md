# picker

[English](./README.md) | [한국어](./README.ko.md)

카테고리 기반 랜덤 선택 도구 — 카테고리를 만들고, 안에 항목을 넣고, 랜덤으로 하나 골라줍니다. 원래 게임/음식 각각 단일 도메인이던 두 개의 picker를 하나의 범용 도구로 합쳤습니다.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## 기능

- 카테고리 생성/삭제 (예: "게임", "음식", 뭐든 자유롭게)
- 카테고리 안에 항목 추가/삭제
- 선택한 카테고리 안에서 항목 랜덤 뽑기
- 전부 `localStorage`에 저장 — 백엔드 없음

## 기술 스택

- **Vite + React + TypeScript**
- **Docker / Docker Compose** — 격리된 개발 환경

## 시작하기

### 필요한 것

- Docker Desktop

### 실행

```bash
git clone https://github.com/dev1f965x/picker.git
cd picker
docker compose up --build
```

`http://localhost:5173` 접속.

## 로드맵

- [ ] 게임/음식처럼 자주 쓰는 고정 카테고리에 한해 도메인 특화 가중치 뽑기 — 추가될 수도, 안 될 수도 있음. 그냥 랜덤이 기본값이고 언제나 대체 동작으로 남음
