<script setup>
defineProps({
    onClick: Function,
    name: String,
    loading: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
    <button @click="onClick" class="w-[200px] h-[60px] rounded-xl bg-softblue-100 
    active:scale-95 active:shadow-inner 
    transition duration-50 ease-in-out">
        <p class="text-base font-bold tracking-[0.1rem] text-gray-600">{{ loading ? 'Loading...' : name }}</p>
    </button>
</template>