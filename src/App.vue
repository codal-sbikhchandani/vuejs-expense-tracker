<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, onMounted, computed } from 'vue'
import type { Transaction } from './types/transaction'
import { getFromLocalStorage, saveToLocalStorage } from './utils/local-storage'
import AddNewTransaction from './components/AddNewTransaction.vue'
import TransactionHistory from './components/TransactionHistory.vue'
import Balance from './components/Balance.vue'
import IncomeExpenseTracker from './components/IncomeExpenseTracker.vue'
import { TRANSACTION_KEY } from './constants/index.ts'

const transactions = ref<Transaction[]>([])

onMounted(() => {
  transactions.value = getFromLocalStorage<Transaction[]>(TRANSACTION_KEY) ?? []
})

const total = computed(() => transactions.value.reduce((acc, curr) => acc + Number(curr.amount), 0))

const income = computed(() =>
  transactions.value.reduce((acc, curr) => {
    const amount = Number(curr.amount)
    return amount > 0 ? acc + amount : acc
  }, 0),
)

const deleteTransaction = (id: number): void => {
  transactions.value = transactions.value.filter((t) => t.id !== id)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, transactions.value)
}

const onSubmitTransaction = (data: Transaction) => {
  transactions.value.push(data)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, transactions.value)
}
</script>

<template>
  <Header />
  <Balance :total="total" />
  <IncomeExpenseTracker :income="income" :expenses="total - income" />
  <TransactionHistory :transactions="transactions" @handleDeleteTransaction="deleteTransaction" />
  <AddNewTransaction @handleSubmitTransaction="onSubmitTransaction" />
</template>
