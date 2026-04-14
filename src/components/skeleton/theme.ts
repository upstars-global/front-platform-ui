const skeleton = {
  base: 'relative overflow-hidden bg-backdrop-alt-1 after:animate-skeleton after:absolute after:inset-0',
  gradient:
    'after:bg-gradient-to-l after:from-transparent after:from-0% after:via-white/10 after:via-50% after:to-transparent after:to-100%'
}

export type SkeletonUi = typeof skeleton

export default skeleton
