export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = bytes / Math.pow(k, i)

  const formattedValue = parseFloat(value.toFixed(1))

  return `${formattedValue} ${sizes[i]}`
}
