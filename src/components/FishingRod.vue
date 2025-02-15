<template>
  <div class="rod-wrapper">
    <span v-if="active" class="catch catch__warning">!</span>
    <span v-if="showInfo" class="catch catch__info" :class="`rarity--${fish.rarity}`">
      <span>
        {{ fish.name }}
      </span>
      <span> +${{ fish.value }} </span>
    </span>
    <img
      @click="catchFish"
      class="rod"
      :class="{ 'rod--active': active }"
      src="../assets/rod.webp"
      alt=""
    />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { useFishingStore } from '@/stores/fishing'
import { useFishermanStore } from '@/stores/fisherman'
import { getRandomNumber, delay } from '@/composables/helper'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const { config } = toRefs(props)

const fishingStore = useFishingStore()
const fishermanStore = useFishermanStore()

const active = ref(false)
const showInfo = ref(false)
const autoPick = ref(null)
const fish = ref({})

const catchFish = async () => {
  if (active.value) {
    if (autoPick.value) {
      clearTimeout(autoPick.value)
    }
    fishermanStore.incrementScore(fish.value.value)
    fishingStore.addFish(fish.value)
    active.value = false
    showInfo.value = true

    await delay(3000)
    showInfo.value = false

    initRod()
  }
}

const generateFish = () => {
  fish.value = fishingStore.getFish(getRandomNumber(0, 10000))
}

const initRod = async () => {
  await delay(
    getRandomNumber(config.value.readyToFishTime * 1000, config.value.maxWaitTimeFishing * 1000),
  )
  active.value = true
  generateFish()
  autoPick.value = setTimeout(() => {
    catchFish()
  }, config.value.autoPickTime * 1000)
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

.catch {
  position: absolute;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  bottom: 220px;

  &__info {
    border: 3px solid black;
    border-radius: 8px;
    padding: 8px;
    max-width: 100%;
    background-color: var(--rarity-colour);
    display: flex;
    flex-direction: column;
  }

  &__warning {
    border: 3px solid black;
    padding: 24px;
    background-color: white;
    font-weight: 900;
    color: red;
  }
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
