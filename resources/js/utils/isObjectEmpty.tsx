export const isObjectEmpty = (obj: Record<string, unknown> | null | undefined): boolean => {
  return (obj == null) || (typeof obj === 'object' && (Object.keys(obj).length === 0))
}
