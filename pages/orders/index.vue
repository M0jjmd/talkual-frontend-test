<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
import type { OrderListResponse } from '~/types'
import DonateModal from '~/components/DonateModal.vue';

const { find } = useStrapi();

const selectedType = ref("all");
const orders = ref([]);
const loading = ref(false);
const error = ref("");
const selectedOrderId = ref<number | null>(null);
const showModal = ref(false);

const fetchOrders = async () => {
  try {
    const filters = selectedType.value !== "all" ? { type: { $eq: selectedType.value } } : {};

    const { data } = await find<OrderListResponse>('orders', {
      populate: ['order_items', 'order_meta'],
      filters
    });

    orders.value = data;
  } catch (error) {
    error.value = "Error loading orders. Please try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

fetchOrders();

const donateOrder = (orderId: number) => {
  selectedOrderId.value = orderId;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
}
</script>

<template>
  <section class="p-3">
    <h1 class="text-center">Order List</h1>
    <!-- Write rest of the code here -->
    <div class="mb-3">
      <label for="orderType" class="form-label">Filter by order type</label>
      <select id="orderType" class="form-select" v-model="selectedType" @change="fetchOrders">
        <option value="all">All</option>
        <option value="normal">Normal</option>
        <option value="donation">Donation</option>
      </select>
    </div>

    <div v-if="orders.length">
      <div v-for="order in orders" :key="order.id" class="card p-3 mb-2">
        <p><strong>SKU:</strong> {{ order.attributes.order_items.data[0]?.attributes.sku || 'N/A' }}</p>
        <p><strong>Type:</strong> {{ order.attributes.type }}</p>
        <p><strong>Quantity:</strong> {{ order.attributes.order_items.data[0]?.attributes.quantity || 0 }}</p>
        <p><strong>Shipping Name:</strong> {{ order.attributes.order_meta.data?.attributes.shipping_firstname || 'N/A'
        }}</p>
        <button class="btn btn-primary" @click="donateOrder(order.id)">Donate</button>

      </div>
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>

    <DonateModal :isVisible="showModal" :orderId="selectedOrderId" @close="closeModal" @donated="fetchOrders" />
  </section>
</template>