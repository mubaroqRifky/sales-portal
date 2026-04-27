<template>
    <section
        class="flex flex-col flex-1 items-center justify-center bg-login min-h-screen relative overflow-hidden"
    >
        <div
            class="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600/20 rounded-full blur-[120px]"
        ></div>
        <div
            class="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-600/20 rounded-full blur-[120px]"
        ></div>

        <div
            class="w-[90%] sm:w-[420px] flex flex-col gap-8 bg-white-blur px-8 py-6 rounded-[2rem] shadow-2xl border border-white/20 backdrop-blur-xl justify-center items-center z-10"
        >
            <div class="flex flex-col items-center justify-center">
                <div class="w-12 h-1.5 bg-blue-600 rounded-full mb-6"></div>
                <h1
                    class="font-black text-2xl text-slate-900 uppercase tracking-tighter italic"
                >
                    Login Account
                </h1>
                <p
                    class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1"
                >
                    Customer Portal v1.0.0
                </p>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col gap-4">
                    <InputText
                        label="Email Address"
                        placeholder="name@enterprise.com"
                        name="email"
                        v-model="form.email"
                        v-model:error="errors.email"
                        class="custom-input"
                    />
                    <InputPassword
                        label="Security Password"
                        placeholder="••••••••"
                        v-model="form.password"
                        v-model:error="errors.password"
                        @keyup.enter="handleLogin"
                        class="custom-input"
                    />
                </div>

                <div class="flex flex-col pt-2">
                    <ButtonPrimary
                        text="Sign In to System"
                        size="normal"
                        :disabled="loading"
                        @press="handleLogin"
                        class="shadow-lg shadow-blue-200 uppercase font-black tracking-widest transition-transform active:scale-[0.98]"
                    />
                </div>

                <div class="flex items-center gap-4">
                    <hr class="w-full border-slate-300" />
                    <p
                        class="text-[10px] my-2 font-semiold text-slate-500 uppercase tracking-widest"
                    >
                        OR
                    </p>
                    <hr class="w-full border-slate-300" />
                </div>

                <div class="text-black flex justify-center">
                    <button
                        class="google-btn"
                        :class="
                            loading ? 'bg-slate-100 text-slate-400' : 'bg-white'
                        "
                        alt="Sign In"
                        :disabled="loading"
                        @click="googleLoginHandler"
                    >
                        <IconGoogle width="18px" height="18px" />
                        <span class="uppercase tracking-tight">
                            Login with Google
                        </span>
                    </button>

                    <ButtonGoogle
                        ref="btnGoogle"
                        class="hidden"
                        :params="params"
                        :renderParams="renderParams"
                        :success="onsuccess"
                    />
                </div>
            </div>

            <p
                class="text-[9px] -mt-2 text-slate-400 font-medium uppercase tracking-tighter"
            >
                Authorized User Only
            </p>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    layout: "auth",
    middleware: ["guest"],
});

useHead({
    meta: [{ name: "color-scheme", content: "light" }],
});

const { $auth, $config } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const user = useUserStore();
const error = reactive({});
const btnGoogle = ref(null);
const form = reactive({ email: "", password: "" });
const params = ref({ client_id: $config.public.GOOGLE_OAUTH_CLIENT_ID });
const renderParams = ref({ width: 250, height: 50, longtitle: true });

const googleLoginHandler = () => {
    try {
        const btn = btnGoogle.value.btn;
        if (btn) btn.click();
        else throw new Error("Hey Login Google Belum Siap!");
    } catch (error) {
        throw new ErrorHandler(error);
    }
};

const onsuccess = async (response) => {
    try {
        loadingStart();
        const id_token = response.credential;
        const { data } = await $auth.loginGoogle(id_token);
        signInUser(data.token);
    } catch (error) {
        throw new ErrorHandler(error);
    } finally {
        loadingStop();
    }
};

const handleLogin = async () => {
    try {
        loadingStart();
        const { data } = await $auth.login(form);
        signInUser(data.token);
    } catch (error) {
        throw new ErrorHandler(error);
    } finally {
        loadingStop();
    }
};

const signInUser = (token) => {
    const { redirect_to } = route.query;
    user.setUser(token);
    if (redirect_to) router.push(redirect_to);
    else router.push("/");
};
</script>

<style scoped>
.bg-login {
    background-image:
        linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)),
        url("/bg-login11.jpg");
    background-size: cover;
    background-position: center;
}

.bg-white-blur {
    background: rgba(255, 255, 255, 0.9);
}

.google-btn {
    @apply w-full px-4 py-3 whitespace-nowrap text-[11px] font-bold rounded-xl outline-none shadow-sm border border-slate-100 flex gap-3 items-center justify-center hover:shadow-md hover:bg-slate-50 transition-all active:scale-[0.98] text-slate-700;
}

/* Custom styling for standard input looks if your components allow class injection */
.custom-input :deep(input) {
    @apply rounded-xl border-slate-200 focus:ring-blue-500/20 transition-all py-3;
}
</style>
