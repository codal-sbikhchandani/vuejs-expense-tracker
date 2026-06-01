<script setup lang="ts">
import type { Transaction } from '@/types/transaction'

const { transactions } = defineProps<{ transactions: Transaction[] }>()

defineEmits(['handleDeleteTransaction'])
</script>
<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="Number(transaction.amount) < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}<span>{{ transaction.amount }}</span>
      <button class="delete-btn" @click="$emit('handleDeleteTransaction', transaction.id)">
        x
      </button>
    </li>
  </ul>
</template>
