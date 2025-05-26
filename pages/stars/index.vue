<script setup>

useSeoMeta({
    title:"Stars",
    description: 'Stars'
})

const number = ref(0)
const selectedType = ref(null)
const showModalConf = ref(false)
const error = ref(null)

const showModalResult = ref(false)

const handleConfirm = () => {
    showModalConf.value = false
    showModalResult.value = true
    //console.log('confirm nih')
}

const handleCancel = () => {
    showModalConf.value = false
    //console.log('confirm nih')
}

const increment = () => {
    number.value ++
}

const decrement = () => {
    if (number.value > 0) number.value--
}

const handleNext = () => {
    if(number.value === 0 || selectedType.value === null){
        error.value = 'Please fill Number and Type!'
        return
    }

    error.value = ''
    showModalConf.value = true
}


</script>

<template>
    <CommonContainer class="flex flex-col flex-1">
        <!-- Header -->
        <PageHeader>
            <NuxtLink  to="/" class="px-8 py-3 rounded-2xl flex items-center justify-center gap-4">
                <Icon
                name="material-symbols:arrow-left-alt-rounded"
                class="w-7 h-7 text-gray-500"
                />
            </NuxtLink>
        </PageHeader>

        <!-- Main -->
        <main class="flex-1 bg-white rounded-[50px] flex flex-col justify-start items-center gap-4 py-10 px-6">
            <img src="/images/hero-stars.svg" class="object-contain w-28"/>
            <div class="text-xl flex flex-col items-center justify-center text-gray-700 pb-4">
                <p class="text-2xl font-bold ">Get a Stars</p>
                <p class="text-center">Pick a number and type to start collecting your stars!</p>
            </div>

            <!-- error message -->
            <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>

            <!-- Input Number Stars -->
            <div class="flex w-full px-3 items-center justify-center pb-4">
                <div class="flex justify-between items-center gap-6 p-8 bg-softblue-50 rounded-[40px] w-full">
                    <button @click="decrement" 
                    class="p-3 bg-softblue-100  rounded-xl flex items-center justify-center
                        active:scale-95 active:shadow-inner 
                        transition duration-50 ease-in-out">
                        <Icon name="mdi:minus" class="font-bold text-white w-8 h-8"/>
                    </button>
                    <input
                        v-model.number="number"
                        type="number"
                        :min="0"
                        class="w-20 text-center text-3xl font-bold bg-transparent outline-none font-poppins"
                    />
                    <button
                        @click="increment"    
                        class="p-3 bg-softblue-100  rounded-xl flex items-center justify-center
                        active:scale-95 active:shadow-inner 
                        transition duration-50 ease-in-out">
                        <Icon name="material-symbols:add-rounded" class="font-bold text-white w-8 h-8"/>
                    </button>
                </div>
            </div>

            <!-- Radio Type -->
            <div class="font-poppins flex flex-col items-center gap-3">
                <p class="text-lg font-raleway font-semibold">
                    Choose a type : 
                </p>
                <div class="flex items-center gap-3 ">
                    <input
                        type="radio"
                        id="type1"
                        value="Type 1"
                        v-model="selectedType"
                        class="h-5 w-5 text-softblue-500 focus:ring-softblue-400"
                    />
                    <label for="type1" class="text-gray-700 text-lg font-bold  tracking-[0.1rem]">Type 1</label>
                </div>
    
                <div class="flex items-center gap-3">
                    <input
                        type="radio"
                        id="type2"
                        value="Type 2"
                        v-model="selectedType"
                        class="h-5 w-5 text-softblue-500 focus:ring-softblue-400"
                    />
                    <label for="type2" class="text-gray-700 text-lg font-bold tracking-[0.1rem]">Type 2</label>
                </div>
    
                <div class="flex items-center gap-3">
                    <input
                        type="radio"
                        id="type3"
                        value="Type 3"
                        v-model="selectedType"
                        class="h-5 w-5 text-softblue-500 focus:ring-softblue-400"
                    />
                    <label for="type3" class="text-gray-700 text-lg font-bold  tracking-[0.05rem]">Type 3</label>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <PageFooter>
            <CommonButton :onClick="handleNext" :name="'Next'"/>
        </PageFooter>
        
        <transition
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        enter-active-class="transition duration-300 ease-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-8"
        leave-active-class="transition duration-200 ease-in">
        <ModalConfirmation v-if="showModalConf" :onSubmit="handleConfirm" :onCancel="handleCancel" :message="`Are you sure you want to earn ${number} stars with ${selectedType}?`"/>
        </transition>
        <transition
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
            enter-active-class="transition duration-300 ease-out"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-8"
            leave-active-class="transition duration-200 ease-in">
            <StarsResultStars v-if="showModalResult" :numberStar="number" :typeStar="selectedType" :showModal="showModalResult" :onSubmit="() => showModalResult = false"/>
        </transition>
    </CommonContainer>
</template>