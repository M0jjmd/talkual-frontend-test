export default () => {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

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
            errorMessage.value = 'Credenciales incorrectas';
        }
    }
    return {
        email,
        password,
        loginUser,
        errorMessage
    }
}