import execa from 'execa'

export abstract class Command<Options extends Record<string, any>> {
  abstract name: string
  abstract flags: FlagsFor<Options>

  /**
   * Path to the `buildah` binary, defaults to `buildah` (find Buildah via `PATH`)
   *
   * @default 'buildah'
   */
  binary: string

  /**
   * @param binary Path to the `buildah` binary, defaults to `buildah` (find Buildah via `PATH`)
   */
  constructor(binary: string = 'buildah') {
    this.binary = binary
  }

  args(options: Options): string[] {
    return Object.entries(this.flags).flatMap(([key, flag]) => {
      return flag.args((options as any)[key])
    })
  }

  /** this is the exec */
  exec = async (file: string, options: Options, ...args: string[]) => {
    return execa(file, [this.name, ...this.args(options), ...args])
  }
}

// Flags

export interface Flag<Type, Required extends boolean> {
  type: string
  name: string | false
  required?: Required
  args(value?: Type): string[]
}

export type FlagsFor<Options extends Record<string, any>> = {
  [K in keyof Options]-?: undefined extends Options[K] ? Flag<Options[K], boolean> : Flag<Options[K], true>
}

export function booleanFlag<Required extends boolean>(
  name: string | false,
  required?: Required,
): Flag<boolean, Required> {
  return {
    type: 'boolean',
    name,
    required,
    args: (v) => (name && v ? [name] : []),
  }
}

export function numberFlag<Required extends boolean>(
  name: string | false,
  required?: Required,
): Flag<number, Required> {
  return {
    type: 'number',
    name,
    required,
    args: (v) => (name && v != null ? [name, v.toString()] : []),
  }
}

export function numberArrayFlag<Required extends boolean>(
  name: string | false,
  required?: Required,
): Flag<number[], Required> {
  return {
    type: 'number[]',
    name,
    required,
    args: (v) => (name && v ? v.flatMap((i) => [name, i.toString()]) : []),
  }
}

export function stringFlag<Required extends boolean>(
  name: string | false,
  required?: Required,
): Flag<string, Required> {
  return {
    type: 'string',
    name,
    required,
    args: (v) => (name && v ? [name, v] : []),
  }
}

export function stringArrayFlag<Required extends boolean>(
  name: string | false,
  required?: Required,
): Flag<string[], Required> {
  return {
    type: 'string[]',
    name,
    required,
    args: (v) => (name && v ? v.flatMap((i) => [name, i]) : []),
  }
}

export function virtualFlag<Required extends boolean>(required?: Required): Flag<any, Required> {
  return {
    type: 'any',
    name: false,
    required,
    args: () => [],
  }
}
