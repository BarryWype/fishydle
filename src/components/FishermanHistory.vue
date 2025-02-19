<template>
  <div class="fish-history-container">
    <div class="fish-history">
      <template v-if="fishingStore.getFishHistory.length">
        <h3>Fish History</h3>
        <div
          v-for="(fish, index) in fishingStore.getFishHistory"
          :key="index"
          :class="`rarity--${fish.rarity}`"
          class="fish-history__fish"
        >
          <span> {{ fish.name }} ({{ fish.size }}cm) - ${{ fish.value }} </span>
          <span
            v-if="fish.trophy"
            class="material-symbols-outlined"
            title="Biggest of it's category"
          >
            crown
          </span>
        </div>
      </template>
      <span v-else>No fish... for now</span>
    </div>
    <FishCounter />
  </div>
</template>

<script setup>
import { useFishingStore } from '@/stores/fishing'
import FishCounter from '@/components/FishermanFishCounter.vue'

const fishingStore = useFishingStore()
</script>

<style lang="scss">
.fish-history-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
  flex: 1;
  flex-shrink: 0;
}

.fish-history {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--beige);
  border: 2px solid var(--dark-yellow);
  padding: 12px;

  &__fish {
    width: 100%;
    color: var(--rarity-colour);
    display: flex;
    justify-content: space-between;

    > span {
      display: flex;
      align-items: center;
    }

    .material-symbols-outlined {
      color: var(--gold);
      font-size: 20px;
    }
  }
}
</style>
