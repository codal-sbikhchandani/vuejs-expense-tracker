import App from '@/App.vue'
import { mount } from '@vue/test-utils'
import { describe, vi, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/local-storage'
import { useTransactionStore } from '@/stores/transaction'
import { TRANSACTION_KEY } from '@/constants'

vi.mock('@/utils/local-storage', () => ({
  getFromLocalStorage: vi.fn(),
  saveToLocalStorage: vi.fn(),
}))

describe('App', () => {
  it('should load transactions from local storage and update the store', () => {
    const mockData = [{ id: 1, text: 'Salary', amount: 1000 }]
    vi.mocked(getFromLocalStorage).mockReturnValue(mockData)

    mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      shallow: true,
    })
    const store = useTransactionStore()

    expect(getFromLocalStorage).toHaveBeenCalledTimes(1)
    expect(store.setTransation).toHaveBeenCalledWith(mockData)
  })

  it('handles transaction deletion correctly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      shallow: true,
    })

    const store = useTransactionStore()
    store.transactions = [{ id: 99, text: 'Coffee', amount: '-5' }]

    const historyComponent = wrapper.findComponent({ name: 'TransactionHistory' })
    await historyComponent.vm.$emit('handleDeleteTransaction', 99)

    expect(store.deleteTransaction).toHaveBeenCalledWith(99)
    expect(saveToLocalStorage).toHaveBeenCalledWith(TRANSACTION_KEY, store.transactions)
  })

  it('handles transaction submission correctly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      shallow: true,
    })

    const store = useTransactionStore()
    const newTx = { id: 2, text: 'Freelance', amount: 500 }

    const addComponent = wrapper.findComponent({ name: 'AddNewTransaction' })
    await addComponent.vm.$emit('handleSubmitTransaction', newTx)

    expect(store.addTransaction).toHaveBeenCalledWith(newTx)
    expect(saveToLocalStorage).toHaveBeenCalledWith(TRANSACTION_KEY, store.transactions)
  })
})
