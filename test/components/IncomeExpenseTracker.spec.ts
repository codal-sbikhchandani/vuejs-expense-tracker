import IncomeExpenseTracker from '@/components/IncomeExpenseTracker.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('IncomeExpenseTracker', () => {
  it('should render component correctly with props', () => {
    const wrapper = mount(IncomeExpenseTracker, {
      props: {
        income: 500,
        expenses: -200,
      },
    })

    expect(wrapper.get('#inc-container').get('h4').text()).toBe('Income')
    expect(wrapper.get('#money-plus').text()).toBe('+$500')

    expect(wrapper.get('#exp-container').get('h4').text()).toBe('Expense')
    expect(wrapper.get('#money-minus').text()).toBe('-$200')
  })
})
