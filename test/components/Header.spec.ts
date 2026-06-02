import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import {test, expect} from 'vitest'

test('render component correcly', () => {
  const wrapper = mount(Header)

  expect(wrapper.text()).toContain('Expense Tracker')
})
