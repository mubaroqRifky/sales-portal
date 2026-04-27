export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("__ATH_PRTLTKN__");
    const user = useUserStore();

    // get token exist from cookie
    if (token) user.setUser(token.value);
});
