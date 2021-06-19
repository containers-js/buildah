import {booleanFlag, Command, stringFlag} from './Command'

export interface ListContainersOptions {
  /**
   * List information about all containers, including those which were not created by and are not being used by Buildah. Containers created by Buildah are denoted with an `*` in the `BUILDER` column.
   */
  all?: boolean

  /**
   * Filter output based on conditions provided. Valid filters are listed below:
   *
   * - `id` - container's ID
   * - `name` - container's name
   * - `ancestor` - image or descendant used to create container
   */
  filter?: string
}

export class ContainersCommand extends Command<ListContainersOptions> {
  name = 'containers'
  flags = {
    all: booleanFlag('--all'),
    filter: stringFlag('--filter'),
  }
}
