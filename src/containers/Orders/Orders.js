import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
                console.log("[OrdersGet] Response ", response)
            })
            .catch(error => {
                this.setState({loading: false})
                console.log("[OrdersGet] Error", error);
            });
    }

    render () {
        let orders = "";
        // orders = (
        //     <div>
        //         <Order/>
        //         <Order/>
        //     </div>
        // )
        if(this.state.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);