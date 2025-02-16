<template>
  <div class="fish-history">
    <template v-if="fishingStore.getFishHistory.length">
      <div
        v-for="(fish, index) in fishingStore.getFishHistory"
        :key="index"
        :class="`rarity--${fish.rarity}`"
        class="fish-history__fish"
      >
        <span> {{ fish.name }} ({{ fish.size }}cm) - ${{ fish.value }} </span>
        <span v-if="fish.trophy" class="material-symbols-outlined" title="Biggest of it's category">
          crown
        </span>
      </div>
    </template>
    <span v-else>No fish... for now</span>
  </div>
</template>

<script setup>
import { useFishingStore } from '@/stores/fishing'

const fishingStore = useFishingStore()
</script>

<style lang="scss">
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
