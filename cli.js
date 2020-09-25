#!/usr/bin/env node

const { Command } = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

const program = new Command()
program.version(pkg.version, '-v, --version', 'output the current version')

program.command('add').description('add a task').action(api.add)

program.command('clear').description('clear all task').action(api.clear)

program.command('show').description('clear all task').action(api.show)

program.parse(process.argv)

if (process.argv.length === 2) {
  // 说明用户直接运行 node cli.js
  void api.start()
}
