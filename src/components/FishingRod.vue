<template>
  <img
    @click="handleRodClick"
    class="rod"
    :class="{ 'rod--active': active }"
    src="../assets/rod.webp"
    alt=""
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScoreStore } from '@/stores/score'
import { getRandomNumber } from '@/composables/helper'

const scoreStore = useScoreStore()

const active = ref(false)
const autoPick = ref(null)

const handleRodClick = () => {
  if (active.value) {
    if (autoPick.value) {
      clearTimeout(autoPick.value)
    }
    scoreStore.incrementScore()
    active.value = false
    initRod()
  }
}

const initRod = () => {
  setTimeout(
    () => {
      active.value = true
      autoPick.value = setTimeout(() => {
        handleRodClick()
      }, 5000)
    },
    getRandomNumber(500, 2000),
  )
}

onMounted(() => {
  initRod()
})
</script>

<style lang="scss" scoped>
.rod {
  width: 90px;
  height: 200px;

  &--active {
    animation: wave 1s infinite ease-in-out;
    transform-origin: bottom center;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}
</style>
