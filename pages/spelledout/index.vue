<script setup>

useSeoMeta({
    title:"Spelled Out",
    description: 'Spelled Out'
})
const inputValue = ref('')
const rawValue = ref(0)

const showModalConf = ref(false)
const error = ref(null)
const showModalResult = ref(false)

const formatRupiah = (number) =>  {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

const parseRupiah = (input) =>  {
  return parseInt(input.replace(/[^\d]/g, '')) || 0
}

const handleConfirm = () => {
    showModalConf.value = false
    showModalResult.value = true
    console.log('confirm nih')
}

const handleCancel = () => {
    showModalConf.value = false
    console.log('confirm nih')
}

const handleNext = () => {
    if (rawValue.value === 0) {
        error.value = "Please fill Amount of Money"
        return
    }
    if (rawValue.value > 1000000000000000) {
        error.value = "Angka terlalu besar"
        return
    }
    error.value = ''
    showModalConf.value = true
}

watch(inputValue, (newVal) => {
  const numeric = parseRupiah(newVal)
  rawValue.value = numeric
  inputValue.value = formatRupiah(numeric)
})

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
            <img src="/images/hero-spelledout.svg" class="object-contain w-28"/>
            <div class="text-xl flex flex-col items-center justify-center text-gray-700 pb-4">
                <p class="text-2xl font-bold ">Spelled Out</p>
                <p class="text-center">You can write the amount of money you want, and I will translate it into spelled-out Indonesian.</p>
            </div>

            <!-- error message -->
            <p v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</p>

            <!-- Input Form -->
            <div class="flex flex-col gap-2 w-full items-center">
                <p class="text-lg font-raleway font-semibold">
                    Amount of Money : 
                </p>
                <input
                v-model="inputValue"
                type="text"
                class="w-2/3 h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"
                />
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
        <ModalConfirmation v-if="showModalConf" :onSubmit="handleConfirm" :onCancel="handleCancel" :message="`Are you sure you want to spell out the amount ${inputValue}?`"/>
        </transition>
        <transition
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
            enter-active-class="transition duration-300 ease-out"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-8"
            leave-active-class="transition duration-200 ease-in">
        <SpelledoutResultSpell :raw-amount="rawValue" :raw-value="inputValue" :onSubmit="() => showModalResult = false" v-if="showModalResult"/>
        </transition>
    </CommonContainer>
</template>