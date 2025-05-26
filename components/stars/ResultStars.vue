<script setup>
const props = defineProps({
    typeStar: {
        type: String,
        required: true
    },
    numberStar: {
        type: Number,
        required: true
    },
    showModal: Boolean,
    onSubmit: Function 
})

const visibleStar = ref([])
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const generateStar =  async (type) => {
    visibleStar.value = []
    if (type === 'Type 1') {
        for (let i = 1; i <= props.numberStar; i++) {
            const star = Array(i).fill('star')    
            visibleStar.value.push(star) 
            await delay(300)
        }
        console.log('visibleStar',visibleStar.value)   
    }
    if (type === 'Type 2') {
        for (let i = 1; i <= props.numberStar; i++) {
            const spacesCount = props.numberStar - i;

            visibleStar.value.push({
                spaces: Array(spacesCount).fill(0).map((_, idx) => idx),
                stars: Array(i).fill(0).map((_, idx) => idx)
            });
            await delay(300)
        }
    }
    if (type === 'Type 3') {
        for (let i = 1; i <= props.numberStar; i++) {
            const totalWidth = props.numberStar
            const starsCount = i
            const totalSpaces = totalWidth - starsCount

            const leftSpacesCount = Math.floor(totalSpaces / 2)
            const rightSpacesCount = Math.floor(totalSpaces / 2)
            visibleStar.value.push({
                spacesLeft: Array(leftSpacesCount).fill(0).map((_, idx) => idx),
                stars: Array(i).fill(0).map((_, idx) => idx),
                spacesRight: Array(rightSpacesCount).fill(0).map((_, idx) => idx),
            });
            await delay(300)
        }
        console.log(visibleStar.value)
    }
}

onMounted(() => {
    generateStar(props.typeStar)
})
</script>

<template>    

    <div class="fixed inset-0 z-50 bg-black/50  flex gap-2 items-center justify-center ">
        <div class="bg-white rounded-[40px] p-6 shadow-xl border w-full h-[90vh] flex flex-col justify-between items-center">
            <!-- Header -->
            <p class="font-bold text-gray-700 text-2xl">Congratulation!</p>
            <p>You've earned a bunch of stars – great job!</p>

            <!-- Main -->
            <div class="flex-1 w-full py-4 overflow-auto" >
                <div class="py-2" v-if="props.typeStar === 'Type 1'">
                    <transition-group
                        name="star-row"
                        tag="div"
                        enter-from-class="opacity-0 "
                        enter-to-class="opacity-100"
                        enter-active-class="transition duration-300 ease-out">
                        <div v-for="(item, idx) in visibleStar" :key="idx" class="flex min-w-fit">
                            <Icon v-for="(star, idxStar) in item" :key="idxStar" name="material-symbols:kid-star" class="text-yellow-300 shadow-xl w-8 h-8"/>
                        </div>
                    </transition-group>
                </div>
                <div class="py-2" v-if="props.typeStar === 'Type 2'">
                    <transition-group
                        name="star-row"
                        tag="div"
                        enter-from-class="opacity-0 "
                        enter-to-class="opacity-100"
                        enter-active-class="transition duration-300 ease-out">
                        <div v-for="(item, idx) in visibleStar" :key="idx" class="flex min-w-fit items-end justify-end w-full">
                            <Icon v-for="(star, idxSpace) in item.spaces" :key="`space-${idx}-${idxSpace}`" name="material-symbols:kid-star" class="text-transparent shadow-xl w-8 h-8"/>
                            <Icon v-for="(star, idxStar) in item.stars" :key="`star-${idx}-${idxStar}`" name="material-symbols:kid-star" class="text-yellow-300 shadow-xl w-8 h-8"/>
                        </div>
                    </transition-group>
                </div>
                <div class="py-2" v-if="props.typeStar === 'Type 3'">
                    <transition-group
                        name="star-row"
                        tag="div"
                        enter-from-class="opacity-0 "
                        enter-to-class="opacity-100"
                        enter-active-class="transition duration-300 ease-out">
                        <div v-for="(item, idx) in visibleStar" :key="idx" class="flex min-w-fit items-end justify-center w-full">
                            <Icon v-for="(star, idxSpaceLeft) in item.spacesLeft" :key="`spaceLeft-${idx}-${idxSpaceLeft}`" name="material-symbols:kid-star" class="text-transparent shadow-xl w-8 h-8"/>
                            <Icon v-for="(star, idxStar) in item.stars" :key="`star-${idx}-${idxStar}`" name="material-symbols:kid-star" class="text-yellow-300 shadow-xl w-8 h-8"/>
                            <Icon v-for="(star, idxSpaceRight) in item.spacesRight" :key="`spaceright-${idx}-${idxSpaceRight}`" name="material-symbols:kid-star" class="text-transparent shadow-xl w-8 h-8"/>
                        </div>
                    </transition-group>
                </div>
            </div>

            <!-- Footer -->
            <div class="pt-2">
                <CommonButton :onClick="onSubmit" :name="'Thanks'"/>
            </div>
        </div>
    </div>
</template>