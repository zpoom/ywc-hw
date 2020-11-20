export const insertAssetPrefix = (path: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return path
  }
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`
}
