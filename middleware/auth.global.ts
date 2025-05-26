export default defineNuxtRouteMiddleware((to) => {
  //console.log(to)
  const email = useCookie('email')

  // Biar nggak redirect terus kalau udah di halaman login
  if (!email.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Kalau sudah login dan sedang di /login, bisa redirect ke halaman lain (opsional)
  if (email.value && to.path === '/login') {
    return navigateTo('/')
  }
})