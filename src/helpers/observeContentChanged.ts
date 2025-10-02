interface ObserverParams {
  target: Element
  callback: MutationCallback
  handleAttributes?: boolean
  deep?: boolean
}
export function observeContentChanged(params: ObserverParams) {
  const { target, callback, handleAttributes = false, deep = true } = params
  const observer = new MutationObserver(callback)

  observer.observe(target, {
    childList: true,
    subtree: deep,
    characterData: true,
    attributes: handleAttributes
  })

  return () => {
    observer.disconnect()
  }
}
