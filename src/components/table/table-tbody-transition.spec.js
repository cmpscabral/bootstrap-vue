import Table from './table'
import { mount, TransitionGroupStub } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table body transition', () => {
  it('tbody should not be a transition-group component by default', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('tbody').is('tbody')).toBe(true)
    expect(wrapper.find(TransitionGroupStub).exists()).toBe(false)
  })

  it('tbody should be a transition-group component when tbody-transition-props set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionProps: {
          name: 'fade'
        }
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find(TransitionGroupStub).exists()).toBe(true)
    expect(wrapper.find('tbody').is('tbody')).toBe(true)
    expect(wrapper.find('transition-group').is('tbody')).toBe(true)
  })

  it('tbody should be a transition-group component when tbody-transition-handlers set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        tbodyTransitionHanlders: {
          onBeforeEnter: el => {},
          onAfterEnter: el => {},
          onBeforeLeave: el => {},
          onAfterLeave: el => {}
        }
      },
      stubs: {
        // the builtin stub doesn't really emulate transitio properly
        // so we let it use the real transition component
        'transition-group': false
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.find('transition-group').exists()).toBe(true)
    expect(wrapper.find('transition-group').is('tbody')).toBe(true)
  })
})
