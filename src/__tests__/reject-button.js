import React from 'react'
import {render} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import RejectButton from "../item-component-parts/reject-button";

it('calls "onConfirm" prop with input on dialog confirm button click AND input is not empty', () => {
    // Render new instance in every test to prevent leaking state
    const onClick = jest.fn();
    const {getByRole} = render(<RejectButton type="openList" index={0} onConfirm={onClick}/>);

    userEvent.click(getByRole('button'));
    userEvent.type(getByRole('textbox'), "123");
    userEvent.click(getByRole('button',{name:'Confirm'}));

    expect(onClick).toBeCalledWith('123');
});