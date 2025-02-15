import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getRandomNumber } from '@/composables/helper'
import { useFishermanStore } from '@/stores/fisherman'
import fishList from '@/data/fishList.json'

export const useFishingStore = defineStore('fishing', () => {
  const fishermanStore = useFishermanStore()
  const fishHistory = ref([])

  const addFish = (fish) => fishHistory.value.push(fish)

  const getFishHistory = computed(() => fishHistory.value)

  const getFish = (randomIndex) => {
    const fishCategory = fishList.find(list => randomIndex <= list.interval[1] && randomIndex >= list.interval[0])
    const rand = getRandomNumber(0, fishCategory.fishes.length -1)
    return {...fishCategory.fishes[rand], rarity: fishCategory.name}
  }

  const addItem = (item) => {
    item.effects.forEach(effect => {
      switch (effect.namespace) {
        case 'rod':{
          const rod = fishermanStore.currentRods.value[0];
          const minVal = rod[`${effect.dataKey}Min`];
          if (fishermanStore.currentRods.value[0][effect.dataKey] + effect.value >= minVal) {
            fishermanStore.currentRods.value[0][effect.dataKey] += effect.value;
          }
          break;
        }
        default:
          break;
      }
    });
  }
  
  return {
    addFish,
    getFishHistory,
    addItem,
    getFish
  }
})
