import TransactionHistory from '@/components/TransactionHistory.vue'
import type { Transaction } from '@/types/transaction'
import { mount } from '@vue/test-utils'
import { describe, it, beforeEach, expect } from 'vitest'

describe('TransactionHistory', () => {
  let transactions: Transaction[]

  beforeEach(() => {
    transactions = [
      {
        id: 1,
        amount: '300',
        text: 'Test1',
      },
      {
        id: 2,
        amount: '-100',
        text: 'Test2',
      },
    ]
  })

  it('should render component correctly with props', () => {
    const wrapper = mount(TransactionHistory, {
      props: {
        transactions,
      },
    })

    expect(wrapper.get('h3').text()).toBe('History')
    expect(wrapper.get('#list').findAll('li')).toHaveLength(2)
    expect(wrapper.get('[data-test="1"]').text()).includes('Test1')
    expect(wrapper.get('[data-test="1"]').text()).includes('300')
    expect(wrapper.get('[data-test="1"]').text()).includes('x')

    expect(wrapper.get('[data-test="2"]').text()).includes('Test2')
    expect(wrapper.get('[data-test="2"]').text()).includes('-100')
    expect(wrapper.get('[data-test="2"]').text()).includes('x')
  })

  it('should emit events correctly on deleting transaction', () => {
    const wrapper = mount(TransactionHistory, {
      props: {
        transactions,
      },
    })

    wrapper.get('[data-test="1"]').get('button').trigger('click')
    expect(wrapper.emitted('handleDeleteTransaction')).toEqual([[1]])
  })
})
