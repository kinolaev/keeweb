const path = require("path")
const fs = require("fs")
const mkdirp = require("mkdirp")
const { createMacro } = require("babel-plugin-macros")
const Handlebars = require("handlebars")

const macro = ({ references, state }) => {
  const { requireRaw = [], requireBase64 = [], requireHbs = [] } = references
  const resolveOpts = { paths: [path.dirname(state.file.opts.filename), __dirname] }

  requireRaw.forEach(fileToModule(resolveOpts, raw))
  requireBase64.forEach(fileToModule(resolveOpts, base64))
  requireHbs.forEach(fileToModule(resolveOpts, hbs))
}

const fileToModule = (resolveOpts, content) => refPath => {
  const reqpath = refPath.parentPath.node.arguments[0].value
  const abspath = resolve(reqpath, resolveOpts)
  if (!abspath.startsWith(process.cwd())) {
    throw new Error("Can't include external file " + abspath)
  }
  const relpath = path.relative(process.cwd(), abspath)
  const dirname = path.join(__dirname, "__generated__", path.dirname(relpath))
  const dstpath = path.join(dirname, path.basename(relpath, ".js") + ".js")
  const modpath = path
    .relative(resolveOpts.paths[0], dstpath)
    .replace(/\\/g, "/")

  mkdirp.sync(dirname)
  fs.writeFileSync(dstpath, "/* eslint-disable */\nexport default " + content(abspath))
  refPath.parentPath.replaceWithSourceString(`require('${modpath}').default`)
}

const resolve = (reqpath, resolveOpts) => {
  try {
    return require.resolve(reqpath, resolveOpts)
  } catch (e) {
    return path.resolve(__dirname, reqpath)
  }
}

const raw = abspath => JSON.stringify(fs.readFileSync(abspath, "utf8"))
const base64 = abspath => JSON.stringify(fs.readFileSync(abspath, "base64"))
const hbs = abspath => {
  const content = fs.readFileSync(abspath, "utf8")
  const compiled = Handlebars.precompile(content)
  return `require("handlebars/runtime").template(${compiled})`
}

module.exports = createMacro(macro)
