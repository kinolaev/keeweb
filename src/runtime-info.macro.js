const { execSync } = require("child_process")
const { createMacro } = require("babel-plugin-macros")

const version = require("../package.json").version
const beta = process.env.BETA || ""
const date = new Date().toISOString().replace(/T.*/, "")
const commit = execSync("git rev-parse --short HEAD")
  .toString()
  .trim()
const devMode = process.env.NODE_ENV !== "production"

module.exports = createMacro(({ references, babel }) => {
  const t = babel.types
  const { VERSION = [], BETA = [], DATE = [], COMMIT = [], DEVMODE = [] } = references

  VERSION.forEach(referencePath => {
    referencePath.replaceWith(t.stringLiteral(version))
  })
  BETA.forEach(referencePath => {
    referencePath.replaceWith(t.stringLiteral(beta))
  })
  DATE.forEach(referencePath => {
    referencePath.replaceWith(t.stringLiteral(date))
  })
  COMMIT.forEach(referencePath => {
    referencePath.replaceWith(t.stringLiteral(commit))
  })
  DEVMODE.forEach(referencePath => {
    referencePath.replaceWith(t.booleanLiteral(devMode))
  })
})
