import React from 'react'
import ReactDom from 'react-dom'

import NewCardForm from '../newCardForm'

import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'

afterEach(cleanup)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDom.render(<NewCardForm />, div)
    ReactDom.unmountComponentAtNode(div)
})

it("renders newCardForm with props", () => {
    const { getByTestId } = render(<NewCardForm testProp="testPropVal" />)
    expect(getByTestId('newCardForm').getAttribute("test-attribute")).toBe('testPropVal');
})

it("renders cardList with props", () => {
    const { getByTestId } = render(<NewCardForm testProp="some test val" />)
    expect(getByTestId('newCardForm').getAttribute("test-attribute")).toBe('some test val');
})

it("matches snapshot", () => {
    const tree = renderer.create(<NewCardForm testProp="testPropVal" />).toJSON()
    expect(tree).toMatchSnapshot()
})
