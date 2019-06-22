import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button clicked={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;