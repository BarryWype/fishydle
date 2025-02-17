<template>
  <div class="fish-counter">
    <h3>Fish Counter</h3>
    <ul>
      <li
        v-for="{ fishType, count, rarity } in fishCounts"
        :key="fishType"
        :class="`rarity--${rarity}`"
      >
        {{ fishType }}: {{ count }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFishingStore } from '@/stores/fishing'

const fishingStore = useFishingStore()

const fishCounts = computed(() =>
  fishingStore.getFishHistory
    .reduce((acc, fish) => {
      const existing = acc.find((f) => f.fishType === fish.name)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ fishType: fish.name, count: 1, rarity: fish.rarity })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count),
)
</script>

<style lang="scss" scoped>
.fish-counter {
  width: 35%;
  background-color: var(--beige);
  border: 2px solid var(--dark-yellow);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: var(--rarity-colour);
    }
  }
}
</style>
