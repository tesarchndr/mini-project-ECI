<script setup>
definePageMeta({
    title:'Home'
})

useSeoMeta({
    title: 'Home',
    description: 'Home'
})

const handleSignOut = () => {
  useCookie('email').value = null
  navigateTo('/login')
}

const gameList = [
    {name: 'Get a Stars', to: '/stars'},
    {name: 'Spelled  Out', to: '/spelledout'},
    {name: 'Form Data', to: '/form'}
]

</script>

<template>
  <CommonContainer class="flex flex-col flex-1">
    <!-- Header -->
    <PageHeader>
      <button 
        @click="handleSignOut()"
         class="px-8 py-3 rounded-2xl  flex items-center justify-center gap-4 text-gray-600">
        <!-- <p class="font-semibold text-gray-600 tracking-[0.1rem]">Sign Out</p> -->
         <Icon name="si:sign-out-alt-fill" class="font-semibold w-6 h-6"/>
      </button>
    </PageHeader>

    <!-- Main Content -->
    <main class="flex-1 bg-white rounded-[50px] flex flex-col justify-start items-center gap-4 py-10">
        <img src="/images/hero-home.svg" class="object-contain w-24"/>
        <!-- Header Text -->
        <div class="text-xl flex flex-col items-center justify-center mb-10 text-gray-700">
            <p class="text-2xl font-bold">Get Started</p>
            <p>Choose one to begin your journey</p>
            <p>and unlock something magical.</p>
            <p>Adventure awaits!</p>
        </div>

        <div class="flex-1 flex flex-col w-full gap-4 items-center justify-start">
            <!-- Game 1 -->
            <NuxtLink
            v-for="(game, idx) in gameList"
            :key="idx"
            :to="game.to"
            class="rounded-2xl w-3/4 h-20 bg-softblue-50  flex items-center justify-between 
                active:scale-95 active:shadow-inner 
                transition duration-100 ease-in-out px-6"
            >
                <p class="text-lg font-semibold text-gray-700 tracking-[0.1rem]">{{game.name}}</p>
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-softblue-100">
                    <Icon name="material-symbols:arrow-forward-ios-rounded"/>
                </div>
            </NuxtLink>
        </div>
    </main>

    <!-- Footer -->
    <div class="h-[100px]">
    </div>
  </CommonContainer>
</template>

<style>
</style>
