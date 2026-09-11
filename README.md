# picker

[English](./README.md) | [한국어](./README.ko.md)

Random picker for when you can't decide. Create categories, add options, and let it choose one. Runs in the browser, on Windows, and on Android.

Data is stored locally on each device.

## Web

```bash
docker compose up --build
```

Open `http://localhost:5173`.

## Windows

Requires [Node.js](https://nodejs.org), [Rust](https://rustup.rs), and the Visual Studio C++ Build Tools.

```bash
npm ci
npx tauri build
```

The installer is written to `src-tauri/target/release/bundle/nsis`.

## Android

Also requires the Android SDK and NDK, with `NDK_HOME` set to the NDK directory.

```bash
npx tauri android build --apk --target aarch64
adb install -r src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk
```

## License

[MIT](./LICENSE)
