import {isThemeMode, type ThemeMode} from '../theme.js'

export type CliArgs = {
  help: boolean
  version: boolean
  web?: boolean
  port?: number
  initialUrl?: string
  themeMode?: ThemeMode
  error?: string
}

export function parseArgs(args: string[]): CliArgs {
  const result: CliArgs = {help: false, version: false}
  const positional: string[] = []

  for (let index = 0; index < args.length; index++) {
    const arg = args[index]!
    if (arg === '-h' || arg === '--help') {
      result.help = true
    } else if (arg === '-v' || arg === '--version') {
      result.version = true
    } else if (arg === '--web') {
      result.web = true
    } else if (arg === '--port') {
      const value = args[++index]
      const portNum = Number(value)
      if (!value || Number.isNaN(portNum)) return {...result, error: '--port needs a numeric value'}
      result.port = portNum
    } else if (arg.startsWith('--port=')) {
      const value = arg.slice('--port='.length)
      const portNum = Number(value)
      if (!value || Number.isNaN(portNum)) return {...result, error: '--port needs a numeric value'}
      result.port = portNum
    } else if (arg === '--theme') {
      const value = args[++index]
      if (!value) return {...result, error: '--theme needs a value: auto, light, or dark'}
      if (!isThemeMode(value)) return {...result, error: `unknown theme “${value}” — use auto, light, or dark`}
      result.themeMode = value
    } else if (arg.startsWith('--theme=')) {
      const value = arg.slice('--theme='.length)
      if (!isThemeMode(value)) return {...result, error: `unknown theme “${value}” — use auto, light, or dark`}
      result.themeMode = value
    } else if (arg.startsWith('-')) {
      return {...result, error: `unknown option “${arg}”`}
    } else {
      positional.push(arg)
    }
  }

  if (positional.length > 0 && positional[0] === 'web' && !result.web) {
    result.web = true
    positional.shift()
  }

  if (positional.length > 1) return {...result, error: 'expected a single url'}
  if (positional.length === 1) result.initialUrl = positional[0]
  return result
}
