<template>
  <div class="user-interface">
    <div>Score: {{ scoreStore.score }}</div>
    <div>
      <span> Fish history: </span>
      <div class="fish-history">
        <span
          v-for="(fish, index) in scoreStore.getFishHistory"
          :key="index"
          :class="`rarity--${fish.rarity}`"
          class="fish-history__fish"
          >{{ fish.name }} ({{ fish.value }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreStore } from '@/stores/score'

const scoreStore = useScoreStore()
</script>

<style lang="scss">
.user-interface {
  max-height: 400px;
  overflow: auto;
}

.fish-history {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__fish {
    color: var(--rarity-colour);
  }
}
</style>
