export function isExternalUrl(url: string) {
  const externalUrlRegExp = /https?:\/\/((?:[\w-]+\.)+\w{2,})/i

  return externalUrlRegExp.test(url)
}
