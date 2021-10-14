# Mangasee-GraphQL-Search

[![TypeScript version][ts-badge]][typescript-4-4]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]


## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs]. Once you build and start it it will poll the manga4life server (identical to the mangasee server but with relaxed bot detection) once a minute and send out a subscription graphql feed to any clients. Minimising the required amount of polling.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/UserJHansen/Mangasee-GraphQL-Search
cd Mangasee-GraphQL-Search
npm install
```

### Download latest release

Download and unzip the current **main** branch or one of the tags:

```sh
wget https://github.com/UserJHansen/Mangasee-GraphQL-Search/archive/main.zip -O Mangasee-GraphQL-Search.zip
unzip Mangasee-GraphQL-Search.zip && rm Mangasee-GraphQL-Search.zip
```

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests

## Additional Informations

## License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.4-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2014.16-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[gha-badge]: https://github.com/UserJHansen/Mangasee-GraphQL-Search/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/UserJHansen/Mangasee-GraphQL-Search/actions/workflows/nodejs.yml
[typescript]: https://www.typescriptlang.org/
[typescript-4-4]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/UserJHansen/Mangasee-GraphQL-Search/blob/main/LICENSE
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
[volta]: https://volta.sh
[volta-getting-started]: https://docs.volta.sh/guide/getting-started
[gh-actions]: https://github.com/features/actions
