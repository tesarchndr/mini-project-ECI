<script setup>
const props = defineProps({
    rawAmount: {
        type: Number,
        required: true
    },
    rawValue: {
        type: String,
        required: true
    },

    onSubmit: Function 
})

const spellOut = ref('')

const generateMoney =  (n) => {
    const satuan = [
        '', 'satu', 'dua', 'tiga', 'empat', 'lima',
        'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
    ];

    if (n < 12) return satuan[n];
    if (n < 20) return generateMoney(n - 10) + ' belas';
    if (n < 100) return generateMoney(Math.floor(n / 10)) + ' puluh ' + generateMoney(n % 10);
    if (n < 200) return 'seratus ' + generateMoney(n - 100);
    if (n < 1000) return generateMoney(Math.floor(n / 100)) + ' ratus ' + generateMoney(n % 100);
    if (n < 2000) return 'seribu ' + generateMoney(n - 1000);
    if (n < 1000000) return generateMoney(Math.floor(n / 1000)) + ' ribu ' + generateMoney(n % 1000);
    if (n < 1000000000) return generateMoney(Math.floor(n / 1000000)) + ' juta ' + generateMoney(n % 1000000);
    if (n < 1000000000000) return generateMoney(Math.floor(n / 1000000000)) + ' miliar ' + generateMoney(n % 1000000000);
    if (n < 1000000000000000) return generateMoney(Math.floor(n / 1000000000000)) + ' triliun ' + generateMoney(n % 1000000000000);

    return 'angka terlalu besar';
}

const spellFunc = () => {
    spellOut.value = generateMoney(props.rawAmount) + ' rupiah'
}

onMounted(() => {
    spellFunc()
})
</script>

<template>    

    <div class="fixed inset-0 z-50 bg-black/50  flex gap-2 items-center justify-center ">
        <div class="bg-white rounded-[40px] px-6 py-10 shadow-xl border w-full min-h-[50vh] max-h-[80vh] flex flex-col justify-between items-center">
            <!-- Header -->
            <p class="font-bold text-gray-700 text-2xl">Congratulation!</p>
            <p class="text-center">Here's the amount you entered, spelled out in words.</p>

            <!-- Main -->
            <div class="flex-1 w-full py-4 overflow-auto flex flex-col items-center gap-2" >
                <p class="text-xl text-gray-700 text-center">{{ rawValue }}</p>
                <p class="text-xl text-gray-700 font-semibold text-center"> {{ spellOut }} </p>
            </div>

            <!-- Footer -->
            <div class="pt-2">
                <CommonButton :onClick="onSubmit" :name="'Thanks'"/>
            </div>
        </div>
    </div>
</template>