<template>
  <rod-info v-for="rod in fishermanStore.currentRods" :key="rod.name" :rod="rod" />
</template>

<script setup>
import { useFishermanStore } from '@/stores/fisherman'

import RodInfo from './RodInfo.vue'

const fishermanStore = useFishermanStore()
</script>

<style lang="scss" scoped>
.rod {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--beige);
  border: 2px solid var(--dark-yellow);
  padding: 12px;

  > div {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__info-label {
    width: 155px;
    flex-shrink: 0;
  }

  &__name-input {
    width: 100%;
    padding: 4px;
    border: 1px solid var(--dark-yellow);
    border-radius: 4px;
  }

  &__info-data {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .material-symbols-outlined {
      font-size: 20px;
    }
  }
}
</style>
