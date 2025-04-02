<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <h2>Donate Order</h2>
            <form @submit.prevent="submitDonation">

            </form>
        </div>
    </div>
</template>
