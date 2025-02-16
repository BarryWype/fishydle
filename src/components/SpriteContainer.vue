<template>
  <div class="sprite-container">
    <button @click="resetGame" class="restart icon-button" title="Reset all data">
      <span class="material-symbols-outlined"> delete_sweep </span>
    </button>
    <div class="fishing-rod-container">
      <fishing-rod
        v-for="(rod, index) in rods"
        :key="rod"
        :config="{ ...rod, index }"
      ></fishing-rod>
    </div>
  </div>
</template>

<script setup>
import { onMounted, toRef } from 'vue'
import FishingRod from './FishingRod.vue'
import { useFishermanStore } from '@/stores/fisherman'
import { useFishingStore } from '@/stores/fishing'

const fishermanStore = useFishermanStore()
const fishingStore = useFishingStore()

const rods = toRef(fishermanStore.getCurrentRod)

const resetGame = () => {
  localStorage.removeItem('score')
  localStorage.removeItem('money')
  localStorage.removeItem('currentRods')
  localStorage.removeItem('fishHistory')

  fishermanStore.initFisherman()
  fishingStore.initFishing()
}

onMounted(() => {
  fishermanStore.initFisherman()
})
</script>

<style lang="scss" scoped>
.sprite-container {
  height: 300px;
  width: 100%;
  background-color: green;
  background: url('../assets/pixel-lake.webp');
  background-size: cover;
  position: relative;
}

.fishing-rod-container {
  align-items: flex-end;
  display: flex;
  gap: 40px;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.restart {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--error);
  border-radius: 50%;
  padding: 4px;
  margin: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--error);
    color: white;
  }
}
</style>
