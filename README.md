# button-clicker

<kbd>button-clicker</kbd> is a template for creating [incremental games](https://wikipedia.org/wiki/Incremental_game). It's built with HTML, CSS, and JavaScript.

The template was built with [Parcel](https://parceljs.org/). The demo is hosted on [remarkablegames](https://remarkablegames.org/).

[Click the button.](https://remarkablegames.org/button-clicker/)

## Games

Games that use this template:

- [Button Clicker](https://remarkablegames.org/button-clicker)
- [Replit Clicker](https://repl.it/talk/challenge/replit-clicker/13259)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/button-clicker.git
cd button-clicker
```

Rename the project:

```sh
git grep -l button-clicker | xargs sed -i '' -e 's/button-clicker/my-clicker/g'
git grep -l 'Button Clicker' | xargs sed -i '' -e 's/Button Clicker/My Clicker/g'
```

Update the files:

- [ ] `README.md`
- [ ] `package.json`
- [ ] `public/index.html`
- [ ] `public/manifest.json`

Install the dependencies:

```sh
npm install
```

Initialize a new repository:

```sh
rm -rf .git
git init
```

Make your first commit:

```sh
git add .
git commit -m 'feat: initialize game from button-clicker'
```

> Commit messages follow the [Conventional Commits](https://conventionalcommits.org/) format, which is used during release.

Once you're ready, [push the local repository to GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) (or another remote repository):

```sh
git remote add origin <remote-repository-url>
git push origin -u origin master
```

## Environment Variables

Copy the environment variables:

```sh
cp .env.example .env
```

Update the **Secrets** in the repository **Settings**.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

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
