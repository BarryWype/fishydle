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
    <div class="fish-counter">
      <h3>Fish Counter</h3>
      <ul>
        <li 
        v-for="({ fishType, count }) in sortedFishCounts" 
        :key="fishType"
        :class="`rarity--${fishRarity[fishType]}`"
        >
        {{ fishType }}: {{ count }}
      </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFishingStore } from '@/stores/fishing'
import fishList from '@/data/fishList'

const fishingStore = useFishingStore()

const fishCounts = computed(() => {
  const counts = fishingStore.getFishHistory.reduce((acc, fish) => {
    if (acc[fish.name]) {
      acc[fish.name]++
    } else {
      acc[fish.name] = 1
    }
    return acc
  }, {})
  return Object.keys(counts).map(fishType => ({ fishType, count: counts[fishType] }))
})

const sortedFishCounts = computed(() => {
  return [...fishCounts.value].sort((a, b) => b.count - a.count)
})

const fishRarity = fishList.reduce((acc, category) => {
  category.fishes.forEach(fish => {
    acc[fish.name] = category.name
  })
  return acc
}, {})
</script>

<style lang="scss">
.fish-history-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
