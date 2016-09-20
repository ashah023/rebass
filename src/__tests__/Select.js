
import React from 'react'
import { shallow, mount } from 'enzyme'
import { isDOMComponent } from 'react-addons-test-utils'
import { Select } from '..'

let wrapper
let inner

test('renders', () => {
  wrapper = shallow(<Select name='t' label='t' />)
  inner = wrapper.first().shallow()
})

test('is a div', () => {
  expect(inner.is('div')).toBe(true)
})

test('has a className', () => {
  expect(inner.props().className).toBe('Select')
})

test('accepts custom className props', () => {
  wrapper = shallow(<Select name='t' label='t' className='foo' />)
  inner = wrapper.first().shallow()
  expect(inner.props().className).toBe('Select foo')
})

test('accepts custom styles', () => {
  wrapper = shallow(<Select name='t' label='t' style={{ color: 'tomato' }} />)
  inner = wrapper.first().shallow()
  expect(inner.props().style.color).toBe('tomato')
})

test('context styles override default styles', () => {
  wrapper = shallow(<Select name='t' label='t' />, {
    context: {
      rebass: {
        Select: {
          marginLeft: 0
        }
      }
    }
  })
  inner = wrapper.first().shallow()
  expect(inner.props().style.marginLeft).toBe(0)
})

test('style props override context styles', () => {
  wrapper = shallow(
    <Select
      name='t'
      label='t'
      color='blue'
      style={{
        color: 'tomato'
      }} />, {
        context: {
          rebass: {
            Arros: {
              color: 'magenta'
            }
          }
        }
      })
  inner = wrapper.first().shallow()
  expect(inner.props().style.color).toBe('tomato')
})

test('baseRef returns the select element', () => {
  let select
  wrapper = mount(
    <Select
      name='t'
      label='t'
      baseRef={r => select = r}
    />
  )
  expect(select).toBeDefined()
  expect(isDOMComponent(select)).toBe(true)
})

