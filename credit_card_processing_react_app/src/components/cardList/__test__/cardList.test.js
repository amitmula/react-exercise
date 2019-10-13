import React from 'react'
import ReactDom from 'react-dom'
import CardList from '../cardList'

import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'

afterEach(cleanup)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDom.render(<CardList />, div)
    ReactDom.unmountComponentAtNode(div)
})

it("renders cardList with props", () => {
    const { getByTestId } = render(<CardList testProp="testPropVal" />)
    expect(getByTestId('cardsListTable').getAttribute("test-attribute")).toBe('testPropVal');
})

it("renders cardList with props", () => {
    const { getByTestId } = render(<CardList testProp="some test val" />)
    expect(getByTestId('cardsListTable').getAttribute("test-attribute")).toBe('some test val');
})

it("matches snapshot", () => {
    const tree = renderer.create(<CardList testProp="testPropVal" />).toJSON()
    expect(tree).toMatchSnapshot()
})
