export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("__ATH_PRTLTKN__");
    const user = useUserStore();

    if (token) user.setUser(token.value);

    const isLoggedIn = !!token.value && !!user.user;
    if (isLoggedIn) return navigateTo("/");
});
