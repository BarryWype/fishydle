import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useScoreStore = defineStore('score', () => {
  const score = ref(0)
  const fishHistory = ref([])

  const incrementScore = (addedScore) => score.value += addedScore
  const addFish = (fish) =>
    fishHistory.value.push(fish)

    const getFishHistory = computed(() => fishHistory.value)
    
  return { score, incrementScore, addFish, getFishHistory }
})
