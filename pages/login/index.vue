<script setup>
useSeoMeta({
    title: 'Login',
    description: 'Login'
})
const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const errors = ref({})

const validateForm = () => {
    errors.value = {}

    if (!form.value.email.trim()) {
        errors.value.email = 'Email wajib diisi.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Format email tidak valid.'
    }

    if (!form.value.password.trim()) {
        errors.value.password = 'Password wajib diisi.'
    }

    return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const email = useCookie('email')
    email.value = form.value.email
    router.push('/')
  } catch (err) {
    //console.log(err)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <CommonContainer class="flex flex-col flex-1">
    <div class="flex flex-col items-center justify-center min-h-screen bg-softblue-50 px-6">
        <div>
          <img src="/images/hero-login.svg" alt="hero-login" class="w-40 object-contain">
        </div>
        <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h1 class="text-2xl font-bold text-center text-gray-700">Welcome Back</h1>

        <!-- Email Input -->
        <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Email</label>
            <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            :class="`w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200 ${errors.email && 'border-1 border-red-600'}`"
            />
            <p v-if="errors.email" class="text-red-500 text-sm pl-4">{{ errors.email }}</p>
        </div>

        <!-- Password Input -->
        <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-700">Password</label>
            <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            :class="`w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softblue-200 ${errors.password && 'border-1 border-red-600'}`"
            />
            <p v-if="errors.password" class="text-red-500 text-sm pl-4">{{ errors.password }}</p>
        </div>

        <!-- Submit Button -->
        <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full h-12 bg-softblue-200 text-base font-bold tracking-[0.1rem] text-gray-600 rounded-xl
                hover:bg-softblue-300 active:scale-95 active:shadow-inner transition duration-150
                flex items-center justify-center gap-2"
        >
            <!-- <Icon name="material-symbols:login" /> -->
            <span v-if="!loading">Login</span>
            <span v-else>Loading...</span>
        </button>

        </div>
    </div>
  </CommonContainer>
</template>

