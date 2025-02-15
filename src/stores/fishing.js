import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import defaultRod from '@/data/defaultRod.json'

export const useFishingStore = defineStore('fishing', () => {
  const score = ref(0)
  const fishHistory = ref([])
  const currentRods = ref([])

  const incrementScore = (addedScore) => score.value += addedScore
  const addFish = (fish) =>
    fishHistory.value.push(fish)

  const getFishHistory = computed(() => fishHistory.value)

  const getDefaultRod = computed(() => defaultRod)

  const initRods = () => {
    if (!currentRods.value.length) {
      currentRods.value.push(defaultRod)
    }
  }

  const getRods = computed(() => currentRods.value)

  const addItem = (item) => {
    item.effects.forEach(effect => {
      switch (effect.namespace) {
        case 'rod':{
          const rod = currentRods.value[0];
          const minVal = rod[`${effect.dataKey}Min`];
          if (currentRods.value[0][effect.dataKey] + effect.value >= minVal) {
            currentRods.value[0][effect.dataKey] += effect.value;
          }
          break;
        }
        default:
          break;
      }
    });
  }
  
  return {
    score,
    incrementScore,
    addFish,
    getFishHistory,
    getDefaultRod,
    getRods,
    initRods,
    addItem
  }
})
