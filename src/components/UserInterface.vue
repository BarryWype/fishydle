<template>
  <div class="user-interface">
    <div class="user-interface__header">
      <div>Score: {{ fishermanStore.score }}</div>
      <div>Money: ${{ fishermanStore.monney }}</div>
    </div>
    <div class="tabs">
      <button class="button" @click="tabOpen = 1">Store</button>
      <button class="button" @click="tabOpen = 2">Rods</button>
      <button class="button" @click="tabOpen = 3">History</button>
    </div>
    <div v-if="tabOpen === 1" class="tab-content">
      <fishing-shop />
    </div>
    <div v-if="tabOpen === 2" class="tab-content">
      <rods-info />
    </div>
    <div class="tab-content fish-history-tab" v-if="tabOpen === 3">
      <fisherman-history />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFishermanStore } from '@/stores/fisherman'

import FishingShop from './FishingShop.vue'
import RodsInfo from './RodsInfo.vue'
import FishermanHistory from './FishermanHistory.vue'

const fishermanStore = useFishermanStore()

const tabOpen = ref(1)
</script>

<style lang="scss">
.user-interface {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  &__header {
    padding: 12px;
    display: flex;
    background-color: var(--yellow);

    > div {
      width: 50%;
      text-align: center;
    }
  }
}

.tabs {
  width: 100%;
  flex: initial;
  box-shadow: 0px 5px 8px 0 var(--grey);
  display: flex;

  button {
    border-radius: 0;
    flex: 1;
    flex-shrink: 0;
  }
}

.tab-content {
  overflow: auto;
  padding-top: 8px;
  padding-inline: 12px;
  padding-top: 12px;
}
</style>
