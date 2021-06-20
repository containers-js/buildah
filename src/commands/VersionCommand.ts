import {Command} from './Command'

export class VersionCommand extends Command<{}> {
  name = 'version'
  flags = {}
}
