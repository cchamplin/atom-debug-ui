#!/usr/bin/env node

// usage: node gen-docs.js -c ./conf.json --no-cache
'use strict'
const tool = require('command-line-tool')
const fastGlob = require('fast-glob')
const path = require('path')
const version = "1.0"

const cli = parseCommandLine()
let options = cli.options._all
options = loadStoredConfig(options)

/* jsdoc2md --help */
if (options.help) {
  tool.printOutput(cli.usage)

  /* jsdoc2md --version */
} else if (options.version) {
  tool.printOutput(version)

  /* jsdoc2md --clear */
} else if (options.clear) {
  const jsdoc2md = require('../')
  jsdoc2md._interface = 'cli'
  jsdoc2md.clear().catch(handleError)
} else {
  const jsdoc2md = require('jsdoc-to-markdown')
  jsdoc2md._interface = 'cli'

  /* jsdoc2md --config */
  if (options.config) {
    const omit = require('lodash.omit')
    tool.stop(JSON.stringify(omit(options, 'config'), null, '  '))
  }

  /* input files (jsdoc-options) required from here */
  /* input validation */
  /*try {
    const assert = require('assert')
    options.files = options.files || []
    assert.ok(options.files.length || options.source, 'Must supply either --files or --source')
  } catch (err) {
    tool.printOutput(cli.usage)
    handleError(err)
  }*/

  /* jsdoc2md --json */
  if (options.json) {
    jsdoc2md.getTemplateData(options)
      .then(function(json) {
        tool.printOutput(JSON.stringify(json, null, '  '))
      })
      .catch(handleError)

    /* jsdoc2md --jsdoc */
  } else if (options.jsdoc) {
    jsdoc2md
      .getJsdocData(options)
      .then(function(json) {
        tool.printOutput(JSON.stringify(json, null, '  '))
      })
      .catch(handleError)

    /* jsdoc2md --namepaths */
  } else if (options.namepaths) {
    jsdoc2md
      .getNamepaths(options)
      .then(function(namepaths) {
        tool.printOutput(JSON.stringify(namepaths, null, '  '))
      })
      .catch(handleError)

    /* jsdoc2md [<options>] --src <files> */
  } else {
    const fs = require('fs')
    if (options.template) options.template = fs.readFileSync(options.template, 'utf8')
    let files = fastGlob.sync('lib/*.js')
    for (let file of files) {
      console.log(file)
      options.files = file
      jsdoc2md
        .render(options)
        .then(output => {
          console.log('writing: ' + 'docs/'+path.basename(file).replace('.js',".md"))
          fs.writeFile('docs/'+path.basename(file).replace('.js',".md"), output)
        })
        .catch(handleError)
    }

    files = fastGlob.sync('lib/services/*.js')
    for (let file of files) {
      console.log(file)
      options.files = file
      jsdoc2md
        .render(options)
        .then(output => {
          console.log('writing: ' + 'docs/'+path.basename(file).replace('.js',".md"))
          fs.writeFile('docs/services/'+path.basename(file).replace('.js',".md"), output)
        })
        .catch(handleError)
    }

    files = fastGlob.sync('lib/models/*.js')
    for (let file of files) {
      console.log(file)
      options.files = file
      jsdoc2md
        .render(options)
        .then(output => {
          console.log('writing: ' + 'docs/'+path.basename(file).replace('.js',".md"))
          fs.writeFile('docs/'+path.basename(file).replace('.js',".md"), output)
        })
        .catch(handleError)
    }
  }
}

function loadStoredConfig(options) {
  const loadConfig = require('config-master')
  const jsdoc2mdConfig = loadConfig('jsdoc2md')
  return Object.assign(jsdoc2mdConfig, options)
}

function parseCommandLine() {
  const cliData = require('./node_modules/jsdoc-to-markdown/lib/cli-data')
  try {
    return tool.getCli(cliData.definitions, cliData.usageSections)
  } catch (err) {
    handleError(err)
  }
}

function handleError(err) {
  tool.halt(err.toString())
}
