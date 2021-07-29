# Brontosaurus-Web

[![Continuous Integration](https://github.com/SudoDotDog/Brontosaurus-Web/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Brontosaurus-Web/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Brontosaurus-Web/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Brontosaurus-Web)
[![npm version](https://badge.fury.io/js/%40brontosaurus%2Fweb.svg)](https://badge.fury.io/js/%40brontosaurus%2Fweb)
[![downloads](https://img.shields.io/npm/dm/@brontosaurus/web.svg)](https://www.npmjs.com/package/@brontosaurus/web)

:boar: Brontosaurus integration for web

## Usage

You have to get a `Brontosaurus` server running to use this SDK. Get more information from [Brontosaurus Project](https://github.com/SudoDotDog/Brontosaurus).

### Initialize

```ts
import { Brontosaurus } from "@brontosaurus/web";

Brontosaurus.hydrate(<Server>, <Application Key>);
Brontosaurus.hydrate(<Server>, <Application Key>, true); // If visitor is available
```

### Get token

```ts
import { Brontosaurus, Token } from "@brontosaurus/web";

const token: Token = Brontosaurus.hard();
```
