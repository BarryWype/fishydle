import { computed } from 'vue'
import { defineStore } from 'pinia'
import items from '@/data/items.json'
import defaultRod from '@/data/defaultRod.json'

export const useShopStore = defineStore('shop', () => {
    
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

    const storeItems = computed(() => items
            .filter(item => item.isShopItem)
            .map(item => {
                item.shopDescription = generateShopDescription(item)
                return item
            })
    )

    return {
        storeItems
    }
})