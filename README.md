# button-clicker

<kbd>button-clicker</kbd> is a template for creating [incremental games](https://wikipedia.org/wiki/Incremental_game).

Play the game on:

- [remarkablegames](https://remarkablegames.org/button-clicker/)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#readme)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/button-clicker.git
cd button-clicker
```

Rename the project:

```sh
git grep -l button-clicker | xargs sed -i '' -e 's/button-clicker/my-clicker/g'
```

```sh
git grep -l 'Button Clicker' | xargs sed -i '' -e 's/Button Clicker/My Clicker/g'
```

Update the files:

- [ ] `README.md`
- [ ] `index.html`
- [ ] `package.json`
- [ ] `public/manifest.json`

Install the dependencies:

```sh
npm install
```

## Environment Variables

Update the environment variables:

```sh
cp .env .env.local
```

Update the **Secrets** in the repository **Settings**.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

## Sources

Articles and diagrams that clarify idle game mechanics:

- [The Math of Idle Games](https://gameanalytics.com/blog/idle-game-mathematics.html)
- [Numbers Getting Bigger: The Design and Math of Incremental Games](https://gamedevelopment.tutsplus.com/articles/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023)
- [Cookies Calculator](https://coderpatsy.bitbucket.io/cookies/cookies.html)

## License

[MIT](LICENSE)
