import { computed } from 'vue'
import { defineStore } from 'pinia'
import items from '@/data/items.json'
import defaultRod from '@/data/defaultRod.json'
import { useFishermanStore } from '@/stores/fisherman'

export const useShopStore = defineStore('shop', () => {
    const fishermanStore = useFishermanStore()

    const getItemSpec = (element) => {
        switch (element.namespace) {
            case 'rod':
                return defaultRod[element.dataKey]
        
            default:
                return ''
        }
    }

    const generateShopDescription = (item) => {
        let shopDescription = item.shopDescription
        item.requiredDataForDescription.forEach(element => {
            shopDescription = item.description.replace('{%}', getItemSpec(element))
        });
        return shopDescription
    }

    const shopItems = computed(() => items
            .filter(item => item.isShopItem)
            .map(item => {
                item.shopDescription = generateShopDescription(item)
                return item
            })
    )

    const puchaseItem = (item, rod) => {
        // make sure the player has enough money
        if (fishermanStore.money >= item.price) {
            fishermanStore.changeMoney(-item.price)
            fishermanStore.addItem(item, rod)
        }
    }

    return {
        shopItems,
        puchaseItem
    }
})