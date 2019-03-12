import Table from './table'
import { mount } from '@vue/test-utils'

const testItems = [{ a: 1, b: 2, c: 3 }, { a: 5, b: 5, c: 6 }, { a: 7, b: 8, c: 9 }]
const testFields = ['a', 'b', 'c']

describe('table tbody row events', () => {
  it('should emit row-clicked event when a row is clicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-clicked event when prop busy is set', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.is('table')).toBe(true)
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
  })

  it('should not emit row-clicked event when vm.localBusy is true', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    wrapper.setData({
      localBusy: true
    })
    $rows.at(1).trigger('click')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
  })

  it('should emit row-dblclicked event when a row is dblclicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).toBeDefined()
    expect(wrapper.emitted('row-dblclicked').length).toBe(1)
    expect(wrapper.emitted('row-dblclicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-dblclicked')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-dblclicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-dblclicked event when a row is dblclicked and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
    $rows.at(1).trigger('dblclick')
    expect(wrapper.emitted('row-dblclicked')).not.toBeDefined()
  })

  it('should emit row-middle-clicked event when a row is middle clicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()
    $rows.at(1).trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).toBeDefined()
    expect(wrapper.emitted('row-middle-clicked').length).toBe(1)
    expect(wrapper.emitted('row-middle-clicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-middle-clicked')[0][1]).toEqual(1) /* row index */
    // expect(wrapper.emitted('row-middle-clicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
    expect(wrapper.emitted('row-middle-clicked')[0][2]).toBeInstanceOf(Event) /* event */
  })

  it('should not emit row-middle-clicked event when a row is middle clicked and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()
    $rows.at(1).trigger('auxclick', { which: 2 })
    expect(wrapper.emitted('row-middle-clicked')).not.toBeDefined()
  })

  it('should emit row-contextmenu event when a row is right clicked', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()
    $rows.at(1).trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).toBeDefined()
    expect(wrapper.emitted('row-contextmenu').length).toBe(1)
    expect(wrapper.emitted('row-contextmenu')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-contextmenu')[0][1]).toEqual(1) /* row index */
    // expect(wrapper.emitted('row-middle-clicked')[0][2]).toBeInstanceOf(MouseEvent) /* event */
    expect(wrapper.emitted('row-contextmenu')[0][2]).toBeInstanceOf(Event) /* event */
  })

  it('should not emit row-contextmenu event when a row is right clicked and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()
    $rows.at(1).trigger('contextmenu')
    expect(wrapper.emitted('row-contextmenu')).not.toBeDefined()
  })

  it('should emit row-hovered event when a row is hovered', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
    $rows.at(1).trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).toBeDefined()
    expect(wrapper.emitted('row-hovered').length).toBe(1)
    expect(wrapper.emitted('row-hovered')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-hovered')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-hovered')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-hovered event when a row is hovered and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
    $rows.at(1).trigger('mouseenter')
    expect(wrapper.emitted('row-hovered')).not.toBeDefined()
  })

  it('should emit row-unhovered event when a row is unhovered', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()
    $rows.at(1).trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).toBeDefined()
    expect(wrapper.emitted('row-unhovered').length).toBe(1)
    expect(wrapper.emitted('row-unhovered')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-unhovered')[0][1]).toEqual(1) /* row index */
    expect(wrapper.emitted('row-unhovered')[0][2]).toBeInstanceOf(MouseEvent) /* event */
  })

  it('should not emit row-unhovered event when a row is unhovered and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-uhovered')).not.toBeDefined()
    $rows.at(1).trigger('mouseleave')
    expect(wrapper.emitted('row-unhovered')).not.toBeDefined()
  })

  it('should emit row-clicked event when a row is focusable and enter pressed', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems
      },
      listeners: {
        // Rows will only have tabindex=0 when a row-clicked listener present
        'row-clicked': () => {}
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).element.focus() /* event only works when teh tr is focused */
    $rows.at(1).trigger('keydown.enter')
    expect(wrapper.emitted('row-clicked')).toBeDefined()
    expect(wrapper.emitted('row-clicked').length).toBe(1)
    expect(wrapper.emitted('row-clicked')[0][0]).toEqual(testItems[1]) /* row item */
    expect(wrapper.emitted('row-clicked')[0][1]).toEqual(1) /* row index */
    // Note: the KeyboardEvent is forwarded to the click handler
    expect(wrapper.emitted('row-clicked')[0][2]).toBeInstanceOf(KeyboardEvent) /* event */
  })

  it('should not emit row-clicked event when a row is focusable, enter pressed, and table busy', async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: testFields,
        items: testItems,
        busy: true
      }
    })
    expect(wrapper).toBeDefined()
    const $rows = wrapper.findAll('tbody > tr')
    expect($rows.length).toBe(3)
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
    $rows.at(1).element.focus() /* event only works when the tr is focused */
    $rows.at(1).trigger('keydown.enter')
    expect(wrapper.emitted('row-clicked')).not.toBeDefined()
  })
})
