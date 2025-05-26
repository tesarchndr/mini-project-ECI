<script setup>
const props = defineProps({
    formData: {
        type: Object,
        required: true
    },
    onSubmit: {
        type: Function,
        required: true
    }
})

const url = ref('')

onMounted(() => {
    if (props.formData.image) {
        url.value = URL.createObjectURL(props.formData.image)
    }
})
</script>


<template>
    <div class="fixed inset-0 z-50 bg-black/50  flex gap-2 items-center justify-center ">
        <div class="bg-white rounded-[40px] px-6 py-10 shadow-xl border w-full h-[90vh] flex flex-col justify-between items-center gap-4">
            <!-- Header -->
             <div class="flex flex-col justify-center items-center">
                 <p class="font-bold text-gray-700 text-2xl">Congratulation!</p>
                 <p>Your form successfully submitted!</p>
             </div>

            <!-- main -->
            <main class="flex flex-col gap-4 w-full flex-1 overflow-y-auto">
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Nama :</p>
                    <p class="pl-4">{{formData.nama}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Email :</p>
                    <p class="pl-4">{{formData.email}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Telepon :</p>
                    <p class="pl-4">{{formData.telepon}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Alamat :</p>
                    <p class="pl-4">{{formData.alamat}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Provinsi :</p>
                    <p class="pl-4">{{formData.provinsi}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Kabupaten :</p>
                    <p class="pl-4">{{formData.kabupaten}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Kecamatan :</p>
                    <p class="pl-4">{{formData.kecamatan}}</p>
                </div>
                <div class="flex flex-col  text-gray-700">
                    <p class="font-bold">Photo :</p>
                    <img
                        v-if="url"
                        :src="url"
                        alt="Foto pengguna"
                        class="w-full max-h-64 object-contain border rounded-lg"
                    />
                </div>
            </main>

            <!-- Footer -->
            <div class="pt-2">
                <CommonButton :onClick="onSubmit" :name="'Thanks'"/>
            </div>
        </div>
    </div>
</template>
