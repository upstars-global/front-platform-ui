import plugin from 'tailwindcss/plugin.js'

export const carouselPlugin = plugin(({ addComponents }) => {
  addComponents({
    '.carousel-gap': {
      gap: 'var(--carousel-gap)'
    },
    '.carousel-grid-cols': {
      gridTemplateColumns: 'repeat(auto-fill, var(--carousel-item-width))'
    },
    '.carousel-auto-cols': {
      gridAutoColumns: 'minmax(var(--carousel-item-width), 1fr)'
    }
  })
})
