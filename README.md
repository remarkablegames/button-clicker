# web-app-template

A framework-agnostic web app template.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) but also ejected with dependencies like React removed.

[See demo.](https://remarkablemark.github.io/web-app-template/)

## Prerequisites

- [Node.js 8.6+](https://nodejs.org/en/download/)
- [npm 5.3+](https://www.npmjs.com/get-npm) or [Yarn 1+](https://yarnpkg.com/lang/en/docs/install/)

## Installation

Clone repository:

```sh
$ git clone https://github.com/remarkablegames/web-app-template.git
```

Rename project:

```sh
$ mv web-app-template my-app
$ cd my-app
$ git grep -l web-app-template | xargs sed -i '' -e 's/web-app-template/my-app/g'
$ git grep -l 'Web App Template' | xargs sed -i '' -e 's/Web App Template/My App/g'
```

You should also update the following files:

- [ ] README.md
- [ ] package.json
- [ ] public/index.html
- [ ] public/manifest.json
- [ ] src/index.js

Install dependencies:

```sh
# with npm
$ npm install

# or with yarn
$ yarn
```

Initialize new repository:

```sh
$ rm -rf .git
$ git init
```

Make first commit:

```sh
$ git add .
$ git commit -m "feat: initialize project from web-app-template"
```

> Commit messages follow the [Conventional Commits](https://conventionalcommits.org/) format. (Used when releasing a new version.)

Don't forget to [push the local repository to GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) or to another remote repository:

```sh
$ git remote add origin <remote-repository-url>
$ git push origin -u origin master
```

## Scripts

Start development server:

```sh
# with npm
$ npm start

# or with yarn
$ yarn start
```

Build production artifacts:

```sh
# with npm
$ npm run build

# or with yarn
$ yarn build
```

> **Note**: Make sure the `"homepage"` field in `package.json` is correct.

Create a release using [standard-version](https://github.com/conventional-changelog/standard-version):

```sh
# with npm
$ npm run release

# or with yarn
$ yarn release
```

Deploy to [GitHub Pages](https://pages.github.com/):

```sh
# with npm
$ npm run deploy

# or with yarn
$ yarn deploy
```

It force pushes the `./build/` directory to the remote repository's `gh-pages` branch.

## Environment Variables

Environment variables work the same as [create-react-app](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) except the custom environment variables begin with `APP_` instead of `REACT_APP_`.

## Test

There are no tests, just linting:

```sh
# with npm
$ npm run lint
$ npm run lint:fix

# with yarn
$ yarn lint
$ yarn lint:fix
```

Feel free to add a [testing framework](https://github.com/sorrycc/awesome-javascript#testing-frameworks).

For manual testing, you can build the (production) app locally:

```sh
# git stash
$ sed -i '' '/homepage/d' package.json
$ npm run build # yarn build
# git checkout -- package.json
# git stash pop
```

Start a local server:

```sh
$ cd build
$ python -m SimpleHTTPServer
# press `Ctrl + C` to stop the server
```

And access it on `localhost:8000`:

```sh
$ open http://localhost:8000
```

## Layout

Directory structure (dotfiles are omitted):

```sh
$ tree -I 'build|node_modules'
.
├── LICENSE
├── README.md
├── config
│   ├── env.js
│   ├── paths.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package.json
├── public
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   └── start.js
└── src
    ├── index.css
    ├── index.js
    └── serviceWorker.js

4 directories, 14 files
```

## Diff

Compared to `create-react-app`, the additional dependencies saved to `package.json` are:

- [@commitlint/{cli,config-conventional}](https://github.com/conventional-changelog/commitlint)
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [gitploy](https://github.com/remarkablemark/gitploy)
- [husky](https://github.com/typicode/husky)
- [jsonlint](https://github.com/zaach/jsonlint)
- [lint-staged](https://github.com/okonet/lint-staged)
- [prettier](https://github.com/prettier/prettier)
- [standard-version](https://github.com/conventional-changelog/standard-version)

## License

[MIT](LICENSE)
