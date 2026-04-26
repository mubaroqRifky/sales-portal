<template>
    <header
        class="px-6 py-2 flex items-center justify-between absolute left-0 right-0 top-0 z-50"
    >
        <div class="flex items-center gap-4"></div>

        <ClientOnly>
            <section v-if="user?.name" class="flex items-center gap-2 sm:gap-4">
                <nuxt-link
                    v-if="role(ADMINISTRATOR)"
                    to="/admin"
                    class="p-2 hover:text-blue-400 hover:bg-white rounded-xl transition-all"
                    title="Admin Dashboard"
                >
                    <IconAdministrator width="22px" height="22px" />
                </nuxt-link>

                <div class="relative group">
                    <button
                        class="p-2 hover:text-blue-400 hover:bg-white rounded-xl transition-all relative"
                    >
                        <IconBell width="22px" height="22px" />
                        <span
                            class="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-[#0f172a]"
                        ></span>
                    </button>

                    <div class="dropdown-menu">
                        <div
                            class="px-4 py-3 border-b border-gray border-solid"
                        >
                            <h3
                                class="text-[10px] font-black uppercase tracking-widest"
                            >
                                Notifications
                            </h3>
                        </div>
                        <div class="max-h-64 overflow-y-auto">
                            <div
                                v-for="i in 3"
                                :key="i"
                                class="px-4 py-3 hover:bg-blue-600/5 border-b border-blue-900/10 cursor-pointer"
                            >
                                <p class="text-[11px] font-medium">
                                    New sales report generated
                                </p>
                                <span class="text-[9px] text-slate-500 italic">
                                    2 minutes ago
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative group">
                    <button
                        class="flex items-center gap-1 rounded-xl hover:bg-white transition-all"
                    >
                        <div
                            class="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[13px] font-semibold"
                        >
                            {{ user.name[0].toUpperCase() }}
                        </div>
                    </button>

                    <div class="dropdown-menu">
                        <div
                            class="px-4 py-3 border-b border-solid border-gray"
                        >
                            <p
                                class="text-[11px] font-black uppercase leading-none"
                            >
                                {{ user.name }}
                            </p>
                            <p class="text-[9px] font-bold uppercase mt-1">
                                {{ roles ? roles[0] : "User" }}
                            </p>
                        </div>
                        <div class="p-2">
                            <nuxt-link
                                to="/profile"
                                class="dropdown-item hover:bg-blue-600/10 hover:text-blue-400 uppercase"
                            >
                                <IconPencil width="16px" height="16px" />
                                Profile Settings
                            </nuxt-link>
                            <button
                                @click="confirmLogout"
                                class="dropdown-item text-danger hover:bg-[#ffb6b69e] hover:text-red-400 uppercase w-full"
                            >
                                <IconLogout width="16px" height="16px" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section v-else>
                <button
                    @click="$router.push('/login')"
                    class="text-xs font-black uppercase hover:text-white transition-colors"
                >
                    Sign In
                </button>
            </section>
        </ClientOnly>
    </header>
</template>

<script setup>
// Keep your existing logic for user store, roles, and dates
const app = useNuxtApp();
const router = useRouter();
const { user, roles, removeUser } = useUserStore();

const getDateLocale = computed(() => {
    return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
});

const confirmLogout = () => {
    Modal.confirm("Yakin ingin logout?");
    Modal.onconfirm = () => processLogout();
};

const processLogout = async () => {
    try {
        loadingStart();
        await app.$auth.logout();
        Modal.close();
    } catch (error) {
        console.error(error);
    } finally {
        loadingStop();
        router.replace("/login");
        removeUser();
    }
};
</script>

<style scoped>
.dropdown-menu {
    @apply absolute right-0 mt-2 w-64 bg-white backdrop-blur-xl border rounded-2xl shadow-2xl invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden;
}

.dropdown-item {
    @apply flex items-center gap-3 px-4 py-3 text-[11px] font-medium transition-all rounded-xl;
}
</style>
