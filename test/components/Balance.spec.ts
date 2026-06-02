import Balance from '@/components/Balance.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('Balance', () => {
  it('should render balance component correctly with props', () => {
    const wrapper = mount(Balance, {
      props: {
        total: 500,
      },
    })

    expect(wrapper.get('h4').text()).toBe('Your Balance')
    expect(wrapper.get('#balance').text()).toBe('$500')
  })
})
