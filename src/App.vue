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
import { storeToRefs } from 'pinia'

const store = useTransactionStore()

const { transactions, income, expense, totalAmount } = storeToRefs(store)
const { setTransation, addTransaction, deleteTransaction } = store

onMounted(() => {
  const storedTransactions = getFromLocalStorage<Transaction[]>(TRANSACTION_KEY) ?? []

  setTransation(storedTransactions)
})

const onDeleteTransaction = (id: number): void => {
  deleteTransaction(id)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, transactions.value)
}

const onSubmitTransaction = (data: Transaction) => {
  addTransaction(data)

  saveToLocalStorage<Transaction[]>(TRANSACTION_KEY, transactions.value)
}
</script>

<template>
  <Header />
  <Balance :total="totalAmount" />
  <IncomeExpenseTracker :income="income" :expenses="expense" />
  <TransactionHistory :transactions="transactions" @handleDeleteTransaction="onDeleteTransaction" />
  <AddNewTransaction @handleSubmitTransaction="onSubmitTransaction" />
</template>
