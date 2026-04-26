<template>
    <header
        class="px-6 py-2 flex items-center text-sm justify-between absolute left-0 right-0 top-0 text-gray-dark z-[1]"
    >
        <div class="flex gap-6 items-center">
            <div
                v-if="false"
                class="whitespace-nowrap flex gap-2 justify-center items-center"
            >
                <IconMain width="35px" height="35px" class="text-primary" />

                <div class="flex flex-col text-gray-dark">
                    <h1 class="font-bold text-xl leading-5 text-primaryDark">
                        Nuxt Starter
                    </h1>
                    <p class="text-xs leading-3 whitespace-nowrap">
                        Frontend Boilerplate
                    </p>
                </div>
            </div>
        </div>

        <ClientOnly>
            <section v-if="user?.name" class="flex gap-4 xl:pl-14 items-center">
                <div class="flex items-center" v-if="role(ADMINISTRATOR)">
                    <nuxt-link to="/admin" class="text-primary">
                        <IconAdministrator width="25px" height="25px" />
                    </nuxt-link>
                </div>

                <div class="flex gap-4 items-center">
                    <article class="flex flex-col text-right">
                        <p class="font-medium leading-4">{{ user.name }}</p>
                        <p class="text-[.7rem] leading-3">
                            {{ roles ? roles[0] : "" }}
                        </p>
                    </article>
                    <nuxt-link
                        to="/profile"
                        class="w-8 h-8 rounded-full text-lg font-semibold bg-white flex items-center justify-center overflow-hidden"
                    >
                        {{ user.name[0] }}
                    </nuxt-link>
                </div>

                <button
                    @click="confirmLogout"
                    class="hover:bg-white rounded-full py-2 px-2 flex gap-2 items-center transition-all outline-none"
                >
                    <IconLogout width="16px" height="16px" />
                </button>
            </section>
            <section v-else class="flex gap-4 xl:pl-14 items-center">
                <button
                    @click="$router.push('/login')"
                    class="bg-softGray hover:bg-primarySoft hover:text-primary rounded-md py-2 px-4 flex gap-2 items-center transition-all outline-none"
                >
                    <IconLogout width="18px" height="18px" />
                    <span class="text-xs"> Sign In </span>
                </button>
            </section>
        </ClientOnly>
    </header>
</template>

<script setup>
const app = useNuxtApp();
const router = useRouter();
const route = useRoute();

const { user, roles, removeUser } = useUserStore();

const emit = defineEmits(["press"]);

const isSearchShowing = computed(() => {
    switch (route.name) {
        case "index":
        case "order":
        case "delivery":
        case "status-order":
        case "quality-check":
            return true;
        default:
            return false;
    }
});

const getDateLocale = computed(() => {
    const dateTime = new Date();

    const localeDate = dateTime.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return localeDate;
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
        throw new ErrorHandler(error);
    } finally {
        loadingStop();
        router.replace("/login");
        removeUser();
    }
};

const searchValue = ref("");
const searchHandler = () => {
    const channel = new BroadcastChannel("header-search");
    channel.postMessage({ message: searchValue.value });
};

watch(route, () => {
    searchValue.value = "";
});
</script>

<style lang="scss" scoped></style>
