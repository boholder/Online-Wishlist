import React from 'react'
import {render} from '@testing-library/react'
import PurchaseButton from "../item-component-parts/purchase-button";
import userEvent from "@testing-library/user-event";

it('calls "onConfirm" prop on dialog confirm button click', () => {
    // Render new instance in every test to prevent leaking state
    const onClick = jest.fn();
    const {getByRole} = render(<PurchaseButton type="openList" index={0} onConfirm={onClick}/>);

    userEvent.click(getByRole('button'));
    userEvent.click(getByRole('button', {name: 'Confirm'}));

    expect(onClick).toHaveBeenCalled();
});