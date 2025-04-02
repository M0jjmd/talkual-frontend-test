<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
        <div class="modal-content">

            <button class="close-btn" @click="close">x</button>

            <h2 class="form-title">Donate Form</h2>
            <form @submit.prevent="submitDonation">
                <div class="mb-3">
                    <label for="shippingPostalCode" class="form-label">Postal code</label>
                    <select v-model="shippingPostalCode" id="shippingPostalCode" class="form-select" required>
                        <option value="" disabled hidden>Select Postal Code</option>
                        <option value="28005">28005</option>
                        <option value="08001">08001</option>
                        <option value="25250">25250</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="shippingFirstName" class="form-label">Firstname</label>
                    <input v-model="shippingFirstName" placeholder="Write a firstname" type="text"
                        id="shippingFirstName" class="form-control" required />
                </div>
                <div class="mb-3 d-flex justify-content-end">
                    <button type="button" class="btn btn-secondary" @click="close">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isVisible: Boolean,
    orderId: Number
});

const emit = defineEmits();
const shippingFirstName = ref("");
const shippingPostalCode = ref("");

const close = () => {
    emit('close');
};

const submitDonation = async () => {
    try {
        const response = await $fetch(`http://localhost:1337/api/orders/${props.orderId}/donate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                order_meta: {
                    shipping_postcode: shippingPostalCode.value,
                    shipping_firstname: shippingFirstName.value
                }
            })
        });

        emit('donated');
        close();
    } catch (error) {
        console.error("Error donating order:", error);
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 1.3rem;
    border-radius: 8px;
    width: 35rem;
}

.close-btn {
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    font-size: 1.25rem;
    background: transparent;
    border: none;
    color: #333;
    cursor: pointer;
    font-weight: bold;
    z-index: 1;
}

.form-title {
    position: relative;
    padding-bottom: 1rem;
}

.form-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.mb-3:nth-child(2) {
    position: relative;
    padding-bottom: 1.5rem;
}

.mb-3:nth-child(2)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.form-control,
.form-select {
    width: 70%;
}

button {
    margin-right: 0.6rem;
}
</style>