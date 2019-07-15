import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = "";

        if(this.props.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price}/>
                ))}
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));