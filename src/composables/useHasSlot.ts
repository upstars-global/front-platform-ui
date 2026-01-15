import { Comment, type Slot, type VNode } from 'vue'

export default function useHasSlot() {
  function hasSlotContent(slot: Slot | undefined, slotProps = {}): boolean {
    if (!slot) return false

    return slot(slotProps).some((node: VNode) => {
      if (node.type === Comment) return false

      if (Array.isArray(node.children) && !node.children.length) return false

      return node.type !== Text || (typeof node.children === 'string' && node.children.trim() !== '')
    })
  }

  return {
    hasSlotContent
  }
}
