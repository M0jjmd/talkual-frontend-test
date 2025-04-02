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
            </form>
        </div>
    </div>
</template>