# Dice-Probability

[![Deploy](https://github.com/Jona898/Dice-Probability-RPG-Games/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)](https://github.com/Jona898/Dice-Probability-RPG-Games/actions/workflows/deploy.yml)

This program is to calculate the probability to roll a specific value with the selected dice.

Currently it is optimized for [The One Ring](https://freeleaguepublishing.com/games/the-one-ring/) but can be easily expanded to other games, where you try to reach a Value.

## Life-Hosting

Newest Version is served on github Pages:
[https://jona898.github.io/Dice-Probability-RPG-Games/](https://jona898.github.io/Dice-Probability-RPG-Games/)

## Expand with other dices

To add a dice you have to change in [diceSettingsStore](src/stores/diceSettingsStore.ts) to the variable dices a new entry.

## Vue build Information

This template should help get you started developing with Vue 3 in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
