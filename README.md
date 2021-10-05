# aliceandbob.io - Desktop app 🖥️🔐

A free, light and easy to use desktop app to generate PGP key pairs, encrypt and decrypt messages. The desktop app works fully offline to ensure maximum security to the user.

**⚡ Looking for the online PGP tool from aliceandbob.io instead? Go [here](https://aliceandbob.io/online-pgp-tool) or on its [GitHub's page](https://github.com/aliceandbob-io/aliceandbob).**

## Download it ⬇️

- From the repo's Github page: [releases]( https://www.electronjs.org/apps/aliceandbob-io)
- From [aliceandbobio](https://aliceandbob.io/)

## Installation

⚠️ If you install the app on windows, you might get a warning from your anti-virus. It is because Windows builds are not signed. No worries, just add an exception for the app in your anti-virus software.

## Features ✨

- 🗝️ Generate PGP key pairs
- 🔒 Encrypt messages with the public PGP key of the receiver
- 🔓 Decrypt messages with your private PGP key

## Tech 🔧

- [Electron.js](https://www.electronjs.org/): Electron.js helps building cross-platform desktop apps with JavaScript, HTML, and CSS
- [Electron-forge](https://www.electronforge.io/): Electron Forge is a complete tool for creating, publishing, and installing modern Electron applications
- HTML/CSS/Javascript
- [Stimulus JS (v2.0.0)](https://stimulus.hotwire.dev/): A modest JavaScript framework
- [Webpack](https://webpack.js.org/): The whole app is bundle with webpack through the electron-forge webpack plugin

## Library 📚

OpenPGP.js (v4.10.7), a JavaScript implementation of the OpenPGP protocol. Find out more on [openpgpjs.org](https://openpgpjs.org/).

## Contributing 🍰

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Refer first to the open issues then create a branch, add commits, and open a pull request!

You can also read the [`CODE OF CONDUCT`](CODE_OF_CONDUCT.md).

When forking and cloning the repo, don't forget to do the following:
1. Make sure to have `node`, `npm` and `yarn` installed on your machine
2. run `yarn install` from the cloned repo.
3. Then, `yarn start` to launch aliceandbob.io Desktop App in dev mode.

⚠️ If you get any errors and warnings, install the necessary apps, packages or updates your platform may require.

Find more info regarding the process and the configuration on the [electronforge.io](https://www.electronforge.io/) page.

## Building the desktop app locally 🏗️

If you want to package and build the app on your machine, run `yarn make --platform=<target build platform> --arch=<target arch>`.
As for the platform, you can choose either:
- `win32`,
- `linux`,
- `darwin`, or
- `mas`.

As for the arch, you can choose either:
- `x64`,
- `ia32`,
- `armv7l`,
- `arm64`, or
- `mips64el`.

See all available options on the [electronPackager page](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

Note that some specific builds cannot be done from some platforms. Learn more [here](https://www.electronforge.io/config/makers).

## Want to support the app? ❤️

<a href="https://www.buymeacoffee.com/aliceandbobio" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="35"/></a>

## License 📄

Licensed under the [MIT License](LICENSE.md).
