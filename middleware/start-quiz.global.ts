export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/quiz/start") {
        return navigateTo("/quiz/1/1");
    }
})
