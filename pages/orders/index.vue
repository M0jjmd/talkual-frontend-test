<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
import type { OrderListResponse } from '~/types'

const { find } = useStrapi();
const { data } = await find<OrderListResponse>('orders', {
  populate: ['order_items', 'order_meta'],
  filters: {
    type: { $eq: 'normal' }
  }
});
const orders = ref(data);
</script>

<template>
  <section class="p-3">
    <h1 class="text-center">Order List</h1>
    <!-- Write rest of the code here -->
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
  </section>
</template>