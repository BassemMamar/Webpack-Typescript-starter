# Webpack Typescript Starter

Simple TypeScript / ES6 starter powered by Webpack module bundler to generate pure es5 javascript library.


# Quick Start #

**Make sure you have Node version >= 8.x and NPM >= 5.x**
```bash
# clone our repo
git clone  https://github.com/BassemMamar/Webpack-Typescript-starter.git

# install starter dependencies with npm
npm install

# start development server
npm start

# build the app
npm run build

# run unit tests 
npm run test

```
The app will be automatically launched in [http://localhost:3001/](http://localhost:3001/).

---


# File Structure #

```
Webpack-Typescript-Starter/
 ├──src/                                        * Our source files that will be compiled to javascript.
 |   ├──index.html                              * Main html file
 |   ├──styles.scss                             * Main styles where we add our global styles, and also import other style files.
 |   ├──test.ts                                 * Configuration for karma test runner
 |   ├──tsconfig.app.json                       * Typescript configuration for the app
 |   ├──tsconfig.spec.json                      * Typescript configuration for tests
 │   │
 │   ├──app/                                    * WebApp: main typescript file goes here.
 │   │   ├──index.ts                            * Entry point module (bootstrapping module).
 │   │   ├──helper.ts                           * Helper module to provide public functionality.
 │   │   ├──config.ts                           * Default configuration for library to work properly.
 │   │   ├──ads-video-handler.ts                * Main service which control how the ads video should react in the view.
 │   │   ├──ads-state.ts                        * Enum state discribe various satuation for ads video.
 │   │   └──unit-test/                          * All unit tests goes here.
 │   │       ├──*.spec.ts                       
 │   │       ├──...                             
 │   │
 │   └──assets/                                 * Static assets are served here
 │       └──...                                 * 
 │  
 │
 │
 ├──webpack_config/                              * Webpack config files for various environments 
 │    
 ├──test-coverage/                              * Auto generated folder by Karma, jasmine and istanbul where you can see the code coverage in a fancy UI.
 │
 ├──build/                                      * Auto generated folder contains a build minimazed version from the app ready for production.
 │
 ├──documentaion/                               * Auto generated documentaion with fancy UI
 │
 ├──karma.conf.js                               * Karma configuration
 ├──tslint.json                                 * Typescript lint config.
 ├──tsconfig.json                               * Base Typescript config used outside webpack.
 └──package.json                                * what npm uses to manage its dependencies.

** More details is comming down. 
```


---


## Features

- [x] Webpack
- [x] TypeScript compilation
- [x] ts-lint
- [x] Webpack Development Server
- [x] Karma and Jasmine test execution


## How to use


### `npm start` 

Runs the app in development mode using Webpack dev server.
Open [http://localhost:3001](http://localhost:3001) 🎉 to view it in the browser.

### `npm test`

Runs the unit tests using Karma as test runner and Jasmine as testing framework.
test result will appear in the cmd console.
also `test-coverage` folder will be generated in the root directory so you can see the code coverage by navigate to `index.html` page in that folder

### `npm run build`

Creates a bundle into the `build` folder:

```sh
build
├── assets/                  # - Copied asset files
├── js/library.bundle.js     # - Main bundle of the library. name from webpack.config
├── js/library.bundle.js.map # - Sourcemap
├── css/styles.min.js        # - Styles bundle
└── index.html               # - HTML page referencing library.bundle.js
```

also `documentaion` folder will be generated which contains fancy documentaion UI discribe the project. you can see it by navigate to it's `index.html`.



## Note

Some images are provided in `sre/assets/doc_images/` for more information! 🙏


---

# Resources
 * Webpack
    * https://webpack.js.org/
 * Awesome webpack
    * https://github.com/webpack-contrib/awesome-webpack#testing
 * Typescript 
    * http://www.typescriptlang.org/ 
 * Jasmine unit test framework
    * https://jasmine.github.io/2.0/introduction.html   
 * Google developers
    * https://developers.google.com/web/updates/2017/09/autoplay-policy-changes      
 * HTMLVideoElement
    * https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
 * Stackoverflow reference
    * https://stackoverflow.com/a/22831887/3635406    
 * HTML Audio/Video DOM Reference
    * https://www.w3schools.com/tags/ref_av_dom.asp
 * Blisk browser for developer
    * https://blisk.io/    
 * Typedoc Documentation generator for TypeScript projects. 
    * https://github.com/TypeStrong/typedoc 
 * Dummy text generator
    * http://www.blindtextgenerator.com/lorem-ipsum   
 * Bootstrap4 simple responsive page
    * https://startbootstrap.com/template-overviews/bare/     
     

