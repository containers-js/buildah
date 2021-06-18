import fastCase from 'fast-case'
import fs from 'fs'
import globby from 'globby'
import path from 'path'
import prettier from 'prettier'
import * as commands from './commands'

const sources = globby.sync('src/internal/typedoc/*.md')
const docs = Object.fromEntries(
  sources.map((source) => [
    path.basename(source, '.md'),
    fs.readFileSync(source, {encoding: 'utf8'}) + '\n\n## @END_OF_FILE',
  ]),
)

function getDefinition(key: string, doc: string) {
  const regexp = new RegExp(`^## @${key}\\n(.+?)\\n## @`, 'ms')
  const matches = regexp.exec(doc)
  return matches ? matches[1].trim() : null
}

function formatAsDoc(doc: string) {
  const lines = doc
    .split(`\n`)
    .map((l) => ` * ${l}`)
    .join('\n')
  return `/**\n${lines}\n */`
}

const lines: string[] = []

for (const command of Object.values(commands)) {
  const typeName = command.typeName ?? `${fastCase.pascalize(command.name)}Options`

  lines.push(`export interface ${typeName} {`)
  for (const [prop, flag] of Object.entries(command.flags)) {
    let doc = getDefinition(prop, docs[typeName]) ?? 'TODO'

    if (doc.startsWith('@@')) {
      doc = getDefinition(doc.replace(/^@@/, ''), docs._common) ?? 'TODO'
    }

    lines.push(formatAsDoc(doc))
    lines.push(`${prop}${flag.required ? ':' : '?:'} ${flag.type}${flag.required ? '' : ' | undefined'}`)
    lines.push('')
  }
  lines.push('}', '')
}

const formatted = prettier.format(lines.join('\n'), {...require('../../.prettierrc.js'), parser: 'typescript'})
console.log(formatted)
