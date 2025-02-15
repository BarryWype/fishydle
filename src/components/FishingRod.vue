<template>
  <div class="rod-wrapper">
    <span v-if="active" class="rod-info" :class="`rarity--${fish.rarity}`">{{ fish.name }}</span>
    <img
      @click="handleRodClick"
      class="rod"
      :class="{ 'rod--active': active }"
      src="../assets/rod.webp"
      alt=""
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScoreStore } from '@/stores/score'
import { getRandomNumber } from '@/composables/helper'

const scoreStore = useScoreStore()

const active = ref(false)
const autoPick = ref(null)
const fish = ref({})
const fishList = [
  { name: 'Spotty', rarity: 'common', value: 1, interval: [0, 6499] },
  { name: 'Trevally', rarity: 'uncommon', value: 3, interval: [6500, 8999] },
  { name: 'Snapper', rarity: 'rare', value: 5, interval: [8999, 9799] },
  { name: 'Kingfish', rarity: 'epic', value: 10, interval: [9800, 9999] },
  { name: 'Whale', rarity: 'legendary', value: 100, interval: [9999, 10000] },
]

const handleRodClick = () => {
  if (active.value) {
    if (autoPick.value) {
      clearTimeout(autoPick.value)
    }
    console.log('You caught a', fish.value.name)

    scoreStore.incrementScore(fish.value.value)
    scoreStore.addFish(fish.value)
    active.value = false
    initRod()
  }
}

const generateFish = () => {
  const randomIndex = getRandomNumber(0, 10000)
  fish.value = fishList.find((f) => randomIndex <= f.interval[1] && randomIndex >= f.interval[0])
}

const initRod = () => {
  setTimeout(
    () => {
      active.value = true
      generateFish()
      autoPick.value = setTimeout(() => {
        handleRodClick()
      }, 5000)
    },
    getRandomNumber(5000, 20000),
  )
}

onMounted(() => {
  initRod()
})
</script>

<style lang="scss" scoped>
.rod-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
}

.rod-info {
  bottom: 220px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--rarity-colour);
  height: 40px;
  width: 50px;
  border: 3px solid black;
  border-radius: 20px;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

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
