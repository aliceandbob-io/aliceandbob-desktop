const path = require('path');

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, 'src/img/icon'),
    executableName: "aliceandbob.io"
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        iconUrl: "https://raw.githubusercontent.com/aliceandbob-io/files/main/icon.ico",
        setupIcon: path.resolve(__dirname, 'src/img/icon.ico')
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/index.html",
              js: "./src/renderer.js",
              name: "main_window"
            }
          ]
        },
        mainConfig: "./webpack.main.config.js"
      }
    ]
  ]
}
