<template>
  <div class="sprite-container">
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
import { useFishermanStore } from '../stores/fisherman'

const fishermanStore = useFishermanStore()

const rods = toRef(fishermanStore.getCurrentRod)

onMounted(() => {
  fishermanStore.initRods()
})
</script>

<style lang="scss" scoped>
.sprite-container {
  height: 300px;
  width: 100%;
  background-color: green;
  background: url('../assets/pixel-lake.webp');
  background-size: cover;
}

.fishing-rod-container {
  align-items: flex-end;
  display: flex;
  gap: 40px;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.rod {
  &:last-child:not(:first-child) {
    transform: rotateY(180deg);
  }
}
</style>
