Spellweave Card Generator
=========================

## Prerequisites ##
`npm install vue`
`npm install sass`
`npm install webpack webpack-cli vue-loader`

## Development ##
#### If using WebStorm ####
- Create SCSS File Watcher: `Preferences -> Tools -> File Watchers`
  - File type: `SCSS Style Sheet`
  - Program: `sass`
  - Arguments: `--update $FileName$:$ProjectFileDir$/spellweave/cardgen/build/$FileNameWithoutExtension$.css`
  - Output paths: `$ProjectFileDir$/spellweave/cardgen/build/$FileNameWithoutExtension$.css:$ProjectFileDir$/spellweave/cardgen/build/$FileNameWithoutExtension$.css.map`
  
- Create Vue File Watcher: `Preferences -> Tools -> File Watchers`
  - File type: `Vue.js template`
  - Program: `npx`
  - Arguments: `webpack`
  - Working directory: `$ProjectFileDir$/spellweave/cardgen`

#### Just run once ####
- Compile styles: `npx sass src/css/style.scss build/style.css`
- Compile JavaScript: `npx webpack`
- Open `index.html`