<script setup>
defineProps({
    message: {
        type: String,
        default: 'Are you sure?'
    },
    onSubmit: Function,
    onCancel: Function,
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
        <div  class="fixed inset-0 z-50 bg-black/20  flex items-end justify-center ">
            <div class="bg-white rounded-t-[40px] p-6 pb-10 shadow-xl max-w-md border">
                <p class="text-lg text-gray-800 mb-6">{{ message }}</p>
                <div class="flex justify-end gap-4">
                    <button
                    @click="onCancel"
                    class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                    Cancel
                    </button>

                    <button
                    @click="onSubmit"
                    class="px-4 py-2 rounded-lg bg-softblue-100 text-white hover:bg-softblue-200 transition"
                    >
                    {{loading ? 'Loading...' : 'Confirm'}}
                    </button>
                </div>
            </div>
        </div>
</template>