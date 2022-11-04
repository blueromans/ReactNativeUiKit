<img alt="React Native Ui Kit" src="https://user-images.githubusercontent.com/29883389/197212969-5c3b98c8-63d2-4cf9-af35-05e1f26d4e37.png">

# React Native Ui Kit

A flexible and easy way to manage ui Android and IOS!

[![npm](https://img.shields.io/npm/v/@blueromans/react-native-ui-kit)](https://www.npmjs.com/package/@blueromans/react-native-ui-kit) ![Supports Android,iOS](https://img.shields.io/badge/platforms-android%20%7C%20ios-lightgrey.svg) [![NPM](https://img.shields.io/npm/dm/@blueromans/react-native-ui-kit)](https://www.npmjs.com/package/@blueromans/react-native-ui-kit)
![MIT License](https://img.shields.io/npm/l/@blueromans/react-native-ui-kit.svg)

## Installation

### With react-native-cli

1. Install library

   from npm

   ```bash
   npm install @blueromans/react-native-ui-kit
   ```

   from yarn

   ```bash
   yarn add @blueromans/react-native-ui-kit
   ```

2. Link native code

   ```bash
   cd ios && pod install
   ```

## Getting Started

Refer to the [getting started guide](https://www.reactnativeuikit.com) for instructions.

## Documentation

Check the components and their usage in our [documentation](https://www.reactnativeuikit.com).

## Author

- [Yasar Ozyurt](https://yasarozyurt.com)

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
