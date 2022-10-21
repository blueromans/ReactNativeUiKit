# <img src="https://user-images.githubusercontent.com/29883389/197210085-7c91126f-14fc-4915-90be-34c234099840.png">

# React Native Ui Kit

A flexible and easy way to manage ui Android and IOS!

[![npm](https://img.shields.io/npm/v/@blueromans/react-native-ui-kit)](https://www.npmjs.com/package/@blueromans/react-native-ui-kit) ![Supports Android,iOS](https://img.shields.io/badge/platforms-android%20%7C%20ios-lightgrey.svg) [![NPM](https://img.shields.io/npm/dm/@blueromans/react-native-ui-kit)](https://www.npmjs.com/package/@blueromans/react-native-ui-kit)
![MIT License](https://img.shields.io/npm/l/@blueromans/react-native-ui-kit.svg)

## Table of Contents

- [React Native Ui Kit](#react-native-ui-kit)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [With react-native-cli](#with-react-native-cli)
  - [Components](#components)
  - [Troubleshooting](#troubleshooting)

## Requirements

- [React Native 0.64.0+](https://reactnative.dev)
- [React Native Safe Area Context](https://www.npmjs.com/package/react-native-safe-area-context)
- [React Native Svg](https://www.npmjs.com/package/react-native-svg)
- [React Native Masket Text](https://www.npmjs.com/package/react-native-masked-text)
- [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons)

## Installation

### With react-native-cli

1. Install library

   from npm

   ```bash
   npm install @blueromans/react-native-ui-kit react-native-safe-area-context react-native-svg react-native-masked-text react-native-vector-icons
   ```

   from yarn

   ```bash
   yarn add @blueromans/react-native-ui-kit react-native-safe-area-context react-native-svg react-native-masked-text react-native-vector-icons
   ```

2. Link native code

   ```bash
   cd ios && pod install
   ```

## Components

## Troubleshooting

If you have build errors, then it might be caused by caching issues, please try:

```bash
watchman watch-del-all
rm -fr $TMPDIR/react-*
react-native start --reset-cache

Or,

rm -rf node_modules
yarn
react-native start --reset-cache
```
