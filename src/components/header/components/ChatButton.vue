<script lang="ts">
import type { ChatButtonUi } from '../theme'
interface ChatButtonProps {
  messageCount?: number
  ui?: ChatButtonUi
}
</script>
<script setup lang="ts">
import UiBadge from '../../badge/UiBadge.vue'
import UiButton from '../../button/UiButton.vue'
import UiIcon from '../../icon/UiIcon.vue'

withDefaults(defineProps<ChatButtonProps>(), {
  messageCount: 0,
  ui: undefined
})
</script>

<template>
  <UiButton :class="ui?.base" size="default" variant="ghost" data-test="chat-button">
    <UiIcon name="support" />
    <UiBadge v-if="messageCount" :class="ui?.badge" size="default" variant="counter">
      {{ messageCount }}
    </UiBadge>
  </UiButton>
</template>
