<template>
  <div></div>
</template>

<script lang="ts">
import { initGame } from '~/game/bootstrap'

export default {
  setup() {
    onMounted(initGame)
  },
}
</script>
