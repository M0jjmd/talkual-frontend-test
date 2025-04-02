<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <h2>Donate Order</h2>
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
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Donate</button>
                    <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
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

console.log("orderId " + props.orderId);

const submitDonation = async () => {
    try {
        const response = await $fetch(`http://localhost:1337/api/orders/${props.orderId}/donate`, {
            method: 'POST',
            body: {
                order_meta: {
                    shipping_firstname: shippingFirstName.value,
                    shipping_postalcode: shippingPostalCode.value
                }
            });

        emit('donated');
        console.log("test donated")
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
    padding: 20px;
    border-radius: 8px;
    width: 400px;
}

button {
    margin-right: 10px;
}
</style>