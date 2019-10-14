import React from 'react'
import ReactDom from 'react-dom'

import NewCardForm from '../newCardForm'

import { render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer'

import { mount } from 'enzyme';

describe('newCardForm', () => {

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

    it('shows success alert when card has been saved successfully', async (done) => {
        const mockSuccessResponse = {
            "message": "The card has been added",
            "content": {
                "id": 1000,
                "name": "Test Card",
                "number": "4375510276155014",
                "limit": 4000,
                "balance": 0
            }
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
        const wrapper = mount(<NewCardForm />);
        wrapper.state().form = Object.assign({}, wrapper.state().form, { name: "some_name", number: "some_numer", limit: "some_limit" })
        wrapper.find('form').simulate('submit');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        process.nextTick(() => {
            expect(wrapper.state().message).toEqual("The card has been added")
            expect(wrapper.state().alertBox).toEqual(true)
            expect(wrapper.state().alertVarient).toEqual("success")
            global.fetch.mockClear()
            done()
        });
    })          //likewise such state mutation changes can bbbe tested for other components as well 
})