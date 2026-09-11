# picker

[English](./README.md) | [한국어](./README.ko.md)

뭘 할지 못 정할 때 대신 골라주는 랜덤 뽑기입니다. 카테고리를 만들고 항목을 넣은 뒤 하나를 뽑습니다.

데이터는 브라우저 `localStorage`에 저장됩니다.

## 실행

```bash
docker compose up --build
```

`http://localhost:5173`에서 열립니다.

## 빌드

```bash
npm ci
npm run build
```

결과물은 `dist/`에 만들어집니다.
