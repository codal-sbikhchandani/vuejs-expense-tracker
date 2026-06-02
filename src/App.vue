<script setup lang="ts">
import Header from '@/components/Header.vue'
import { onMounted } from 'vue'
import type { Transaction } from '@/types/transaction'
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/local-storage'
import AddNewTransaction from '@/components/AddNewTransaction.vue'
import TransactionHistory from '@/components/TransactionHistory.vue'
import Balance from '@/components/Balance.vue'
import IncomeExpenseTracker from '@/components/IncomeExpenseTracker.vue'
import { TRANSACTION_KEY } from '@/constants/index.ts'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()

onMounted(() => {
  const storedTransactions = getFromLocalStorage<Transaction[]>(TRANSACTION_KEY) ?? []

  store.setTransation(storedTransactions)
})

const onDeleteTransaction = (id: number): void => {
  store.deleteTransaction(id)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, store.transactions)
}

const onSubmitTransaction = (data: Transaction) => {
  store.addTransaction(data)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, store.transactions)
}
</script>

<template>
  <Header />
  <Balance :total="store.totalAmount" />
  <IncomeExpenseTracker :income="store.income" :expenses="store.expense" />
  <TransactionHistory
    :transactions="store.transactions"
    @handleDeleteTransaction="onDeleteTransaction"
  />
  <AddNewTransaction @handleSubmitTransaction="onSubmitTransaction" />
</template>
