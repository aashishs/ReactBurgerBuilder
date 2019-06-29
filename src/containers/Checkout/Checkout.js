import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                this.setState({price: parseInt(param[1])});
            } else ingredients[param[0]] = parseInt(param[1]);
        }
        
        this.setState({ingredients: ingredients});
        console.log(ingredients, this.state.ingredients);
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route path={this.props.match.path+'/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;