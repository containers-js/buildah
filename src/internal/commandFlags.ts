import execa from 'execa'

export abstract class Command {
  abstract name: string
  abstract flags: Record<string, Flag<any, boolean>>

  typeName?: string

  args<T extends Command>(this: T, options: TypeOf<T['flags']>): string[] {
    return Object.entries(this.flags).flatMap(([key, flag]) => {
      return flag.args((options as any)[key])
    })
  }

  async exec<T extends Command>(this: T, file: string, options: TypeOf<T['flags']>, ...args: string[]) {
    return await execa(file, [this.name, ...this.args(options), ...args])
  }
}

export interface Flag<Type, Required extends boolean> {
  type: string
  name: string | false
  required?: Required
  args(value?: Type): string[]
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

// Type helpers used to ensure internal type safety

export type RequiredProps<T extends Record<string, Flag<any, boolean>>> = {
  [K in keyof T]: T[K] extends Flag<any, true> ? K : never
}[keyof T]

export type OptionalProps<T extends Record<string, Flag<any, boolean>>> = Exclude<keyof T, RequiredProps<T>>

export type Resolve<A extends any> = A extends Function ? A : {[K in keyof A]: A[K]} & unknown

export type TypeOf<T extends Record<string, Flag<any, boolean>>> = Resolve<
  {
    [K in keyof T]?: T[K] extends Flag<infer Type, boolean> ? Type : never
  } &
    {
      [K in RequiredProps<T>]: T[K] extends Flag<infer Type, true> ? Type : never
    }
>
