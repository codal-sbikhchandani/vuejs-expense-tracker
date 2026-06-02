import type { Transaction } from '@/types/transaction'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])

  const addTransaction = (payload: Transaction) => transactions.value.push(payload)

  const setTransation = (payload: Transaction[]) => (transactions.value = payload)

  const deleteTransaction = (id: number) =>
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

  const totalAmount = computed(() =>
    transactions.value.reduce((acc, curr) => acc + Number(curr.amount), 0),
  )

  const income = computed(() =>
    transactions.value.reduce((acc, curr) => {
      const amount = Number(curr.amount)
      return amount > 0 ? acc + amount : acc
    }, 0),
  )

  const expense = computed(() =>
    transactions.value.reduce((acc, curr) => {
      const amount = Number(curr.amount)
      return amount < 0 ? acc + amount : acc
    }, 0),
  )

  return {
    transactions,
    setTransation,
    addTransaction,
    deleteTransaction,
    income,
    expense,
    totalAmount,
  }
})
