<template>
    <section
        class="flex flex-col md:flex-row justify-center items-center h-full gap-8 relative starting-container"
    >
        <div
            class="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 sm:gap-4 md:gap-10 xl:gap-12 items-center max-w-[80%]"
        >
            <template v-for="(item, index) of user.apps">
                <div
                    @click="handleRedirect(item)"
                    class="flex flex-col gap-2 items-center"
                >
                    <div
                        class="bg-linear-gray p-2 rounded-xl border border-solid flex justify-center items-center w-20 h-20 border-gray hover:shadow-md hover:scale-105 transition-all duration-100 cursor-pointer"
                    >
                        <IconMenuEkul v-if="item.id == 1" />
                        <IconMenuSoTolak v-else-if="item.id == 2" />
                        <IconMenuReports v-else-if="item.id == 3" />
                        <IconMenuOther v-else />
                    </div>
                    <p class="text-menu">
                        {{ item.name }}
                    </p>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    layout: "default",
    middleware: ["auth"],
});

const { $application } = useNuxtApp();

const user = useUserStore();

const handleRedirect = (item) => {
    try {
        if (!item.bypass_url) {
            throw new Error(
                `Your account has not been connected to the ${item.name} app.`,
            );
        }
        window.location.href = item.bypass_url;
    } catch (error) {
        throw new ErrorHandler(error);
    }
};

const getAllIntegratedApps = async () => {
    try {
        const { data } = await $application.getUserApp();
        user.setApps(data || []);
    } catch (error) {
        throw new ErrorHandler(error);
    }
};

onMounted(() => {
    getAllIntegratedApps();
});
</script>

<style scoped>
.bg-linear-gray {
    background: linear-gradient(180deg, #fff 0%, #ececec 100%);
}

.text-menu {
    @apply text-xs font-medium text-center whitespace-nowrap;
}
</style>
