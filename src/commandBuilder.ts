export function booleanFlag(name: string, value?: boolean): string[] {
  return value ? [name] : []
}

export function numberFlag(name: string, value?: number): string[] {
  return value != null ? [name, `${value}`] : []
}

export function stringFlag(name: string, value?: string): string[] {
  return value ? [name, value] : []
}

export function stringArrayFlag(name: string, value?: string[]): string[] {
  return value ? value.flatMap((i) => [name, i]) : []
}
