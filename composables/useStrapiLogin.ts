export default () => {
    const email = ref('');
    const password = ref('');

    const loginUser = async () => {
        const { login } = useStrapiAuth();
        const router = useRouter();

        try {
            const response = await login({ identifier: email.value, password: password.value });

            const token = response.jwt;
            if (token) {
                localStorage.setItem("token", token);
            }

            await router.push('/orders')
        } catch (e) {
            console.error(e)
        }
    }
    return {
        email,
        password,
        loginUser
    }
}