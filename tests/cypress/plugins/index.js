/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const fs = require('fs')
const stream = fs.createWriteStream("data/timeline.txt", {flags:'a'});


// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    testTimings (attributes) {
        console.log('Test "%s" has finished in %dms', attributes.title, attributes.duration)
        console.log(attributes)
        stream.write(JSON.stringify(attributes));
        stream.write("\n");
        return null
    },
  })
}
