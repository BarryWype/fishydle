import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import { getRandomNumber } from '@/composables/helper'
import fishList from '@/data/fishList.json'

export const useFishingStore = defineStore('fishing', () => {
  const fishHistory = ref([])

  const addFish = async (fish) => {
    fishHistory.value.push(fish)
    await nextTick()
    makePersistFishHistory()
  }

  const getFishHistory = computed(() => fishHistory.value)

  const getFish = (randomIndex) => {
    const fishCategory = fishList.find(list => randomIndex <= list.interval[1] && randomIndex >= list.interval[0])
    const rand = getRandomNumber(0, fishCategory.fishes.length -1)
    const rawFishData = fishCategory.fishes[rand]
    const size = getRandomNumber(rawFishData.size[0], rawFishData.size[1])
    const selectedFish = {
      name: rawFishData.name,
      value: rawFishData.value,
      size,
      trophy: size === rawFishData.size[1],
      rarity: fishCategory.name
    }
    return selectedFish
  }

  const makePersistFishHistory = () => {
      localStorage.setItem('fishHistory', JSON.stringify({
          fishHistory: fishHistory.value
      }))
  }

  const initFishing = () => {
    const localFishHistory = JSON.parse(localStorage.getItem('fishHistory'))
    if (localFishHistory) {
      fishHistory.value = localFishHistory.fishHistory
    }
  }
  
  return {
    addFish,
    getFishHistory,
    getFish,
    makePersistFishHistory,
    initFishing
  }
})
