Spellweave Card Generator
=========================

## Prerequisites ##
`npm install vue webpack webpack-cli vue-loader url-loader sass-loader node-sass`

## Development ##
#### If using WebStorm ####
- Create SCSS File Watcher: `Preferences -> Tools -> File Watchers`
  - File type: `SCSS Style Sheet`
  - Program: `npx`
  - Arguments: `webpack`
  - Working directory: `$ProjectFileDir$/spellweave/cardgen`
  
- Create Vue File Watcher: `Preferences -> Tools -> File Watchers`
  - File type: `Vue.js template`
  - Program: `npx`
  - Arguments: `webpack`
  - Working directory: `$ProjectFileDir$/spellweave/cardgen`

#### Just run once ####
- Compile JavaScript: `npx webpack`
- Open `index.html`