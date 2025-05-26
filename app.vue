<script>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    }
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
    }
  ]
})
</script>
<template>
  <div class="min-h-screen bg-softblue-50 flex justify-center font-raleway">
    <NuxtLayout>
      <Transition name="slide" mode="out-in">
        <NuxtPage />
      </Transition>
    </NuxtLayout>
  </div>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50%);
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
</style>
