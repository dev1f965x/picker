# picker

[English](./README.md) | [한국어](./README.ko.md)

뭘 할지 못 정할 때 대신 골라주는 랜덤 뽑기입니다. 카테고리를 만들고 항목을 넣은 뒤 하나를 뽑습니다. 브라우저, Windows, Android에서 실행됩니다.

데이터는 기기마다 따로 저장됩니다.

## 웹

```bash
docker compose up --build
```

`http://localhost:5173`에서 열립니다.

## Windows

[Node.js](https://nodejs.org), [Rust](https://rustup.rs), Visual Studio C++ Build Tools가 필요합니다.

```bash
npm ci
npx tauri build
```

설치 파일은 `src-tauri/target/release/bundle/nsis`에 만들어집니다.

## Android

추가로 Android SDK와 NDK가 필요하고, `NDK_HOME`에 NDK 경로를 지정해야 합니다.

```bash
npx tauri android build --apk --target aarch64
adb install -r src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk
```

## 라이선스

[MIT](./LICENSE)
