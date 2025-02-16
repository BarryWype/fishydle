import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'
import defaultRod from '@/data/defaultRod.json'

export const useFishermanStore = defineStore('fisherman', () => {
    const score = ref(0)
    const money = ref(10)
    const currentRods = ref([])

    const getCurrentRod = () => {
        return currentRods.value
    }

    const incrementScore = async (addedScore) => {
        score.value += addedScore
        changeMoney(addedScore)
        await nextTick()
        makePersistScore()
    }

    const changeMoney = async (amount) => {        
        money.value += amount
        await nextTick()
        makePersistMoney()
    }

    const addItem = async (item, rod) => {
        if (rod) {
            rod.items.push(item)
        }
        
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

        await nextTick()
        makePersistRods()
    }

    const makePersistScore = () => {
        localStorage.setItem('score', score.value)
    }
    
    const makePersistMoney = () => {
        localStorage.setItem('money', money.value)
    }
    
    const makePersistRods = () => {
        localStorage.setItem('currentRods', JSON.stringify(currentRods.value))
    }

    const initFisherman = () => {
        const persistedScore = JSON.parse(localStorage.getItem('score'))
        if (persistedScore) {
            score.value = persistedScore
        }
        
        const persistedMoney = JSON.parse(localStorage.getItem('money'))
        if (persistedMoney) {
            money.value = persistedMoney
        } else {
            money.value = 10
        }
        
        const persistedRods = JSON.parse(localStorage.getItem('currentRods'))
        if (persistedRods) {
            currentRods.value = persistedRods
        } else {
            currentRods.value = [{...defaultRod}]
        }
    }

    return {
        score,
        money,
        currentRods,
        getCurrentRod,
        incrementScore,
        changeMoney,
        addItem,
        makePersistScore,
        makePersistMoney,
        makePersistRods,
        initFisherman
    }
})