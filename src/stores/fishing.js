import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getRandomNumber } from '@/composables/helper'
import fishList from '@/data/fishList.json'

export const useFishingStore = defineStore('fishing', () => {
  const fishHistory = ref([])

  const addFish = (fish) => fishHistory.value.push(fish)

  const getFishHistory = computed(() => fishHistory.value)

  const getFish = (randomIndex) => {
    const fishCategory = fishList.find(list => randomIndex <= list.interval[1] && randomIndex >= list.interval[0])
    const rand = getRandomNumber(0, fishCategory.fishes.length -1)
    return {...fishCategory.fishes[rand], rarity: fishCategory.name}
  }
  
  return {
    addFish,
    getFishHistory,
    getFish
  }
})
