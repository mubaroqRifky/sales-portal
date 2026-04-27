<template>
    <div
        class="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900"
    >
        <header
            class="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3"
        >
            <div class="max-w-6xl mx-auto flex items-center justify-between">
                <button
                    @click="$router.back"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all group"
                >
                    <IconArrowBack />
                    <span
                        class="text-xs font-bold uppercase tracking-widest text-slate-600"
                    >
                        Back
                    </span>
                </button>

                <button
                    @click="handleSignOut"
                    class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-red-600 transition-all active:scale-95 shadow-md shadow-slate-200"
                >
                    <span class="text-xs font-bold uppercase tracking-wider">
                        Sign Out
                    </span>
                    <IconLogout />
                </button>
            </div>
        </header>

        <main class="flex-grow p-4 md:p-12">
            <div class="max-w-6xl mx-auto space-y-8">
                <div class="relative group">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"
                    ></div>

                    <div
                        class="relative bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-white"
                    >
                        <div class="h-40 bg-slate-900 relative overflow-hidden">
                            <img
                                class="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"
                            ></div>
                        </div>

                        <div class="px-8 pb-8">
                            <div
                                class="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-16 gap-6"
                            >
                                <div
                                    class="flex flex-col md:flex-row items-center md:items-end gap-6"
                                >
                                    <div
                                        class="p-1.5 bg-white rounded-[2rem] shadow-2xl"
                                    >
                                        <div
                                            class="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.8rem] flex items-center justify-center text-4xl font-black text-white shadow-inner"
                                        >
                                            {{ user.name.substring(0, 2) }}
                                        </div>
                                    </div>
                                    <div class="text-center md:text-left pb-2">
                                        <h1
                                            class="text-3xl font-black tracking-tight text-slate-900 uppercase italic"
                                        >
                                            {{ user.name }}
                                        </h1>
                                        <p
                                            class="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium"
                                        >
                                            <IconEmail />
                                            {{
                                                user.email ||
                                                "no-email@domain.com"
                                            }}
                                        </p>
                                    </div>
                                </div>
                                <div class="pb-2">
                                    <span
                                        class="px-5 py-2 bg-blue-50 text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] border border-blue-100 shadow-sm"
                                    >
                                        {{ roles[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-4">
                        <div
                            class="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100"
                        >
                            <div class="flex items-center gap-3 mb-8">
                                <div class="p-2 bg-slate-100 rounded-lg">
                                    <span
                                        class="i-heroicons-shield-check w-5 h-5 text-slate-600"
                                    ></span>
                                </div>
                                <h3
                                    class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                                >
                                    Security Access
                                </h3>
                            </div>

                            <form
                                @submit.prevent="handlePasswordChange"
                                class="space-y-5"
                            >
                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                                    >
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        v-model="form.current_password"
                                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-bold text-slate-400 uppercase ml-1"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        v-model="form.new_password"
                                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    class="w-full py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="lg:col-span-8">
                        <div
                            class="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 h-full"
                        >
                            <div class="flex items-center justify-between mb-8">
                                <div class="flex items-center gap-3">
                                    <h3
                                        class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        Integrated Apps
                                    </h3>
                                </div>
                                <span
                                    class="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold border border-green-100"
                                >
                                    SSO ACTIVE
                                </span>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div
                                    v-for="app in apps"
                                    :key="app.name"
                                    class="group flex flex-col items-center p-6 border border-slate-100 rounded-[1.5rem] hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300"
                                >
                                    <div
                                        :class="app.color || 'bg-green-300'"
                                        class="p-5 rounded-2xl mb-4 shadow-sm group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500"
                                    >
                                        <span
                                            :class="app.icon"
                                            class="w-8 h-8"
                                        ></span>
                                    </div>

                                    <span
                                        class="text-sm font-black text-slate-800 uppercase tracking-tight"
                                    >
                                        {{ app.name }}
                                    </span>
                                    <p
                                        class="text-[10px] text-slate-400 mt-1 mb-6 text-center leading-relaxed font-medium uppercase"
                                    >
                                        {{ app.description }}
                                    </p>

                                    <button
                                        @click="
                                            connectApp(app.button_id, app.id)
                                        "
                                        :class="
                                            app.is_connected
                                                ? 'bg-blue-500 text-white group-hover:bg-white group-hover:text-blue-600 border-blue-500'
                                                : 'group-hover:border-blue-500 group-hover:text-blue-600 border-slate-300'
                                        "
                                        class="w-full py-2 text-[10px] font-black rounded-xl border-2 bg-white transition-all uppercase tracking-tighter"
                                    >
                                        {{
                                            app.is_connected
                                                ? "Re-Connect"
                                                : "Connect"
                                        }}
                                    </button>

                                    <div
                                        :id="`${app.button_id || 'btn-sign-in'}`"
                                        :class="`hidden ${app.button_id}`"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-white border-t border-slate-100 py-10">
            <div
                class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div class="flex flex-col items-center md:items-start gap-1">
                    <p
                        class="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]"
                    >
                        CUSTOMER PORTAL
                    </p>
                    <p
                        class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >
                        &copy; 2026 All Rights Reserved
                    </p>
                </div>
                <div class="flex items-center gap-8">
                    <a
                        href="#"
                        class="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
                    >
                        ICT
                    </a>
                    <div class="h-4 w-[1px] bg-slate-200"></div>
                    <span
                        class="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded"
                    >
                        v1.0.0
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "main",
    middleware: ["auth"],
});

const { $auth, $config, $application } = useNuxtApp();

const router = useRouter();

const { user, roles, removeUser } = useUserStore();

const form = reactive({
    current_password: "",
    new_password: "",
});

const handlePasswordChange = () => console.log("Security Updated");

const handleSignOut = () => {
    Modal.confirm("Yakin ingin logout?");
    Modal.onconfirm = () => processLogout();
};

const processLogout = async () => {
    try {
        loadingStart();
        await $auth.logout();
        Modal.close();
    } catch (error) {
        throw new ErrorHandler(error);
    } finally {
        loadingStop();
        removeUser();
        router.replace("/login");
    }
};

const connectApp = (button_id = "btn-sign-in", id) => {
    currentAction.value = id;
    const buttonSignIn = document.querySelector(`.${button_id}`);
    console.log(buttonSignIn);
    if (buttonSignIn) {
        buttonSignIn.click();
    }
};

const apps = ref([]);
const currentAction = ref(null);

const handleResponse = async (response, id) => {
    try {
        if (currentAction.value == id) {
            const payload = {
                app_id: id,
                token: response.id_token,
            };
            const { data } = await $application.connectApps(payload);
            console.log(response, data);
            getAllIntegratedApps();
        }
    } catch (error) {
        throw new ErrorHandler(error);
    }
};

const getAllIntegratedApps = async () => {
    try {
        const { data } = await $application.getAll();
        apps.value = data || [];

        apps.value.forEach((val) => {
            if (!val.oauth_url) return;

            const existingScript = document.querySelector(
                `script[src="${val.oauth_url}"]`,
            );

            if (!existingScript) {
                const script = document.createElement("script");

                script.src = val.oauth_url;
                script.dataset.clientId = val.client_id;
                script.dataset.buttonId = val.button_id;

                window[val.button_id] = (response) => {
                    handleResponse(response, val.id);
                };

                script.dataset.callback = val.button_id;

                document.body.appendChild(script);
            } else {
                window[val.button_id] = (response) => {
                    handleResponse(response, val.id);
                };
            }
        });
    } catch (error) {
        throw new ErrorHandler(error);
    }
};

onMounted(() => {
    getAllIntegratedApps();
});
</script>

<style scoped>
/* Custom rounded corners for a more modern feel */
.rounded-2xl {
    border-radius: 1rem;
}
.rounded-3xl {
    border-radius: 1.5rem;
}

.text-menu {
    @apply text-[10px] font-black uppercase tracking-[0.2em] text-slate-400;
}
</style>
