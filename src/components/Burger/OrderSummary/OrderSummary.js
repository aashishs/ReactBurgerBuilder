import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button clicked={props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;