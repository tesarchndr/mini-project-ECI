<script setup>
useSeoMeta({
    title: 'form',
    description: 'form'
})
    const form = ref({
        nama: '',
        email: '',
        telepon: '',
        alamat: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        image: null,
    })
    const dataProvinsi = ref([])
    const showOptionProvinsi = ref(false)
    const dataKabupaten = ref([])
    const showOptionKabupaten = ref(false)
    const dataKecamatan = ref([])
    const showOptionKecamatan = ref(false)
    const showModalConf = ref(false)
    const showModalResult = ref(false)
    const loadingSubmit = ref(false)
    
    const errors = ref({})
    const errorApi = ref('')

    const validateForm = () => {
        errors.value = {}

        if (!form.value.nama.trim()) {
            errors.value.nama = 'Nama wajib diisi.'
        }

        if (!form.value.email.trim()) {
            errors.value.email = 'Email wajib diisi.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
            errors.value.email = 'Format email tidak valid.'
        }

        if (!form.value.telepon.trim()) {
            errors.value.telepon = 'Nomor telepon wajib diisi.'
        } else if (!/^\d+$/.test(form.value.telepon)) {
            errors.value.telepon = 'Nomor telepon hanya boleh berisi angka.'
        }

        if (!form.value.alamat.trim()) {
            errors.value.alamat = 'Alamat wajib diisi.'
        }

        if (!form.value.provinsi) {
            errors.value.provinsi = 'Provinsi wajib dipilih.'
        }

        if (!form.value.kabupaten) {
            errors.value.kabupaten = 'Kabupaten wajib dipilih.'
        }

        if (!form.value.kecamatan) {
            errors.value.kecamatan = 'Kecamatan wajib dipilih.'
        }

        if (!form.value.image) {
            errors.value.image = 'Foto wajib diunggah.'
        }

        return Object.keys(errors.value).length === 0
    }

    const getDataPrinvinsi = async () => {
        errorApi.value('')
        try {
            const res = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            const data = await res.json()
            dataProvinsi.value = data
        } catch (err) {
            errorApi.value('Gagal mengambil data provinsi. Silakan coba lagi nanti.')
        }
    }
    const getDataKabupaten = async (idProv) => {
        errorApi.value('')
        try {
            const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idProv}.json`)
            dataKabupaten.value = await res.json()
        } catch {
            errorApi.value('Gagal mengambil data provinsi. Silakan coba lagi nanti.')
        }
    }
    const getDataKecamatan = async (idKab) => {
        errorApi.value('')
        try {
            const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idKab}.json`)
            dataKecamatan.value = await res.json()
        } catch {
            errorApi.value('Gagal mengambil data provinsi. Silakan coba lagi nanti.')
        }
    }

    const filterProvinsi = computed(() => {
        if (!form.value.provinsi) return dataProvinsi.value
        return dataProvinsi.value.filter(p =>
            p.name.toLowerCase().includes(form.value.provinsi.toLowerCase())
        )
    })
    const filterKabupaten = computed(() => {
        if (!form.value.kabupaten) return dataKabupaten.value
        return dataKabupaten.value.filter(p =>
            p.name.toLowerCase().includes(form.value.kabupaten.toLowerCase())
        )
    })
    const filterKecamatan = computed(() => {
        if (!form.value.kecamatan) return dataKecamatan.value
        return dataKecamatan.value.filter(p =>
            p.name.toLowerCase().includes(form.value.kecamatan.toLowerCase())
        )
    })

    const onFileChange = (e) => {
        const file = e.target.files[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
        if (file && allowedTypes.includes(file.type)) {
            form.value.image = file
        } else {
            form.value.image = null
        }
    }

    const selectProvinsi = (provinsi) => {
        showOptionProvinsi.value = false
        form.value.provinsi = provinsi.name
        form.value.kabupaten = ''
        form.value.kecamatan = ''
        dataKabupaten.value=[]
        dataKecamatan.value=[]
        getDataKabupaten(provinsi.id)
    }

    const selectKabupaten = (kab) => {
        showOptionKabupaten.value = false
        form.value.kabupaten = kab.name
        form.value.kecamatan = ''
        dataKecamatan.value=[]
        getDataKecamatan(kab.id)
    }

    const selectKecamatan = (kab) => {
        showOptionKecamatan.value = false
        form.value.kecamatan = kab.name
    }

    const handleNext = () => {
        if(validateForm()){
            showModalConf.value = true
        } else {
            return
        }

    }

    const handleConfirm = async () => {
        loadingSubmit.value = true
        try {
            const payload = {
                firstName: form.value.nama,
                email: form.value.email,
                phone: form.value.telepon,
                address: {
                    address: form.value.alamat,
                    state: form.value.provinsi,
                    city: form.value.kabupaten,
                },
                image: form.value.image,
                asdsa: ''
            }

            //console.log('payload', payload)
            const res = await $fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            //console.log('Success:', res)
            showModalConf.value = false
            showModalResult.value = true
            errorApi.value = ''
        } catch (error) {
            //console.log(error)
            errorApi.value = 'Terjadi kesalahan. Silakan coba lagi.'
            showModalConf.value = false
        } finally {
            loadingSubmit.value = false
        }
    }

    const handleCancel = () => {
        showModalConf.value = false
    }

    watch(() => form.value.telepon, (newVal) => {
        if (newVal !== undefined && newVal !== null) {
            form.value.telepon = newVal.replace(/\D/g, '')
        }
    })

    onMounted(() => {
        getDataPrinvinsi()
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
            <img src="/images/hero-form.svg" class="object-contain w-28"/>
            <div class="text-xl flex flex-col items-center justify-center text-gray-700 pb-4">
                <p class="text-2xl font-bold ">Form Data</p>
                <!-- <p class="text-center">Pick a number and type to start collecting your stars!</p> -->
            </div>

            <!-- error API -->
            <div v-if="errorApi" class="flex items-center justify-center rounded-xl px-6 py-2 bg-gray-50 w-full">
                <p class="text-red-600 font-semibold text-center">{{ errorApi }}</p>
            </div>

            <!-- Form -->
            <form action="" class="flex flex-col gap-4 w-full text-gray-700">
                <div class="flex flex-col gap-2">
                    <label for="name" class="text-base font-semibold text-gray-700">Nama</label>
                    <input 
                    id="name"
                    v-model="form.nama" 
                    placeholder="Enter your name"
                    type="text" 
                    required
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200" />
                    <p v-if="errors.nama" class="text-red-500 text-sm pl-4">{{ errors.nama }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-base font-semibold text-gray-700">Email</label>
                    <input 
                    v-model="form.email" 
                    id="email"
                    placeholder="Enter your email"
                    type="email" 
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200" />
                    <p v-if="errors.email" class="text-red-500 text-sm pl-4">{{ errors.email }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="telepon" class="text-base font-semibold text-gray-700">Phone No</label>
                    <input 
                    v-model="form.telepon"
                    id="telepon"
                    type="text"
                    inputmode="numeric"
                    placeholder="0823 ..."
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"/>
                    <p v-if="errors.telepon" class="text-red-500 text-sm pl-4">{{ errors.telepon }}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-base font-semibold">Alamat</label>
                    <textarea 
                    v-model="form.alamat" 
                    placeholder="Enter your Address"
                    class="w-full h-[100px] px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"></textarea>
                    <p v-if="errors.alamat" class="text-red-500 text-sm pl-4">{{ errors.alamat }}</p>
                </div>
                <div class="flex flex-col gap-2 relative ">
                    <label class="text-base font-semibold">Provinsi</label>
                    <input
                    type="text"
                    v-model="form.provinsi"
                    @focus="showOptionProvinsi = true"
                    @input="showOptionProvinsi = true"
                    placeholder="Pilih atau ketik provinsi"
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"
                    />
                    <p v-if="errors.provinsi" class="text-red-500 text-sm pl-4">{{ errors.provinsi }}</p>
                    <ul
                    v-if="showOptionProvinsi && filterProvinsi.length"
                    class="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto top-20"
                    >
                        <li
                            v-for="prov in filterProvinsi"
                            :key="prov.id"
                            @click="selectProvinsi(prov)"
                            class="px-4 py-2 hover:bg-softblue-100 cursor-pointer"
                        >
                            {{ prov.name }}
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-2 relative ">
                    <label class="text-base font-semibold">Kabupaten/Kota</label>
                    <input
                    type="text"
                    v-model="form.kabupaten"
                    @focus="showOptionKabupaten = true"
                    @input="showOptionKabupaten = true"
                    placeholder="Pilih atau ketik kabupaten"
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"
                    />
                    <p v-if="errors.kabupaten" class="text-red-500 text-sm pl-4">{{ errors.kabupaten }}</p>
                    <ul
                    v-if="showOptionKabupaten && filterKabupaten.length"
                    class="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto top-20"
                    >
                        <li
                            v-for="kab in filterKabupaten"
                            :key="kab.id"
                            @click="selectKabupaten(kab)"
                            class="px-4 py-2 hover:bg-softblue-100 cursor-pointer"
                        >
                            {{ kab.name }}
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-2 relative ">
                    <label class="text-base font-semibold">Kecamatan</label>
                    <input
                    type="text"
                    v-model="form.kecamatan"
                    @focus="showOptionKecamatan = true"
                    @input="showOptionKecamatan = true"
                    placeholder="Pilih atau ketik kecamatan"
                    class="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200"
                    />
                    <p v-if="errors.kecamatan" class="text-red-500 text-sm pl-4">{{ errors.kecamatan }}</p>
                    <ul
                    v-if="showOptionKecamatan && filterKecamatan.length"
                    class="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto top-20"
                    >
                        <li
                            v-for="kec in filterKecamatan"
                            :key="kec.id"
                            @click="selectKecamatan(kec)"
                            class="px-4 py-2 hover:bg-softblue-100 cursor-pointer"
                        >
                            {{ kec.name }}
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-base font-semibold">Upload Gambar (JPG / PNG)</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        @change="onFileChange"
                        class="mt-1"
                    />
                    <p v-if="errors.image" class="text-red-500 text-sm pl-4">{{ errors.image }}</p>
                </div>
            </form>
        </main>

        
        <!-- Footer -->
        <PageFooter>
            <CommonButton :onClick="handleNext" :name="'Next'" :loading="loadingSubmit"/>
        </PageFooter>

        <transition
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        enter-active-class="transition duration-300 ease-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-8"
        leave-active-class="transition duration-200 ease-in">
        <ModalConfirmation v-if="showModalConf" :loading="loadingSubmit" :onSubmit="handleConfirm" :onCancel="handleCancel" :message="`Are you sure you want to submit this form?`"/>
        </transition>
        
        <transition
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
        enter-active-class="transition duration-300 ease-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-8"
        leave-active-class="transition duration-200 ease-in">
        <FormResultForm v-if="showModalResult" :formData="form" :onSubmit="() => showModalResult = false"/>
        </transition>
    </CommonContainer>
</template>