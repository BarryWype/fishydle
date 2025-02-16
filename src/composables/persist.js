import { useFishermanStore } from "@/stores/fisherman"
import { useFishingStore } from "@/stores/fishing"

const fishermanStore = useFishermanStore()
const fishingStore = useFishingStore()

export const makePersistAll = () => {
    fishermanStore.makePersistScore()
    fishermanStore.makePersistMoney()
    fishermanStore.makePersistRods()
    fishingStore.makePersistFishHistory()
}