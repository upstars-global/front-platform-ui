import type { Decorator } from '@storybook/vue3-vite'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const MockComponent = {
  template: `<div></div>`
}

export const defaultRoutes: RouteRecordRaw[] = [{ path: '/', component: MockComponent }]

export const vueRouter = (routes = defaultRoutes, options?: RouterOptions): Decorator => {
  return (story) => ({
    setup() {
      const vm = getCurrentInstance()
      const app = vm?.appContext?.app

      let router

      const existingRouter = app?.config?.globalProperties?.$router

      if (!existingRouter) {
        router = createRouter({
          history: createWebHashHistory(),
          routes,
          ...options
        })
        app?.use(router)
      }

      return () => h(story())
    }
  })
}
