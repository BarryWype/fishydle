import { defineStore } from 'pinia'
import { ref } from 'vue'
import defaultRod from '@/data/defaultRod.json'

export const useFishermanStore = defineStore('fisherman', () => {
    const score = ref(0)
    const monney = ref(10)
    const currentRods = ref([])

    const getCurrentRod = () => {
        return currentRods.value
    }

    const initRods = () => {
        if (!currentRods.value.length) {
          currentRods.value.push({...defaultRod})
        }
    }

    const incrementScore = (addedScore) => {
        monney.value += addedScore
        score.value += addedScore
    }

    const changeMonney = (amount) => {        
        monney.value += amount
    }

    const addItem = (item, rod) => {
        if (rod) {
            rod.items.push(item)
        }
    }

    return {
        score,
        monney,
        currentRods,
        getCurrentRod,
        incrementScore,
        initRods,
        changeMonney,
        addItem
    }
})