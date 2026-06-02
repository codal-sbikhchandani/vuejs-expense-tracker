import AddNewTransaction from '@/components/AddNewTransaction.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const randomId = Math.random()

vi.mock('@/utils', () => ({
  generateUniqueId: () => randomId,
}))

window.alert = vi.fn()

describe('AddNewTransaction', () => {
  it('should submit transaction on valid form fields', () => {
    const wrapper = mount(AddNewTransaction)

    wrapper.get('[data-test="text-field"]').setValue('Expense')
    wrapper.get('[data-test="amount-field"]').setValue('-300')
    wrapper.get('[data-test="form"]').trigger('submit')

    expect(wrapper.emitted()).toHaveProperty('handleSubmitTransaction')
    expect(wrapper.emitted('handleSubmitTransaction')).toEqual([
      [
        {
          id: randomId,
          amount: '-300',
          text: 'Expense',
        },
      ],
    ])
  })

  it('should show alert when amount is missing', () => {
    const wrapper = mount(AddNewTransaction)

    wrapper.get('[data-test="text-field"]').setValue('Expense')
    wrapper.get('[data-test="form"]').trigger('submit')
    expect(window.alert).toHaveBeenCalledWith('Both fields are required!')
  })

  it('should show alert when text is missing', async () => {
    const wrapper = mount(AddNewTransaction)

    await wrapper.get('[data-test="amount-field"]').setValue('200')
    wrapper.get('[data-test="form"]').trigger('submit')
    expect(window.alert).toHaveBeenCalledWith('Both fields are required!')
  })

  it('should show alert when both fields are missing', async () => {
    const wrapper = mount(AddNewTransaction)

    wrapper.get('[data-test="form"]').trigger('submit')
    expect(window.alert).toHaveBeenCalledWith('Both fields are required!')
  })
})
