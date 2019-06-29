import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }],
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};
        
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
    
        axios.post('/orders.json', data)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push({
                    pathname: "/"
                })
                console.log("[OrderSave] Response ", response)
            })
            .catch(error => {
                this.setState({loading: false})
                console.log("[OrderSave] Error", error);
            });
    }

    checkValidaity (value, rules) {
        let isValid = true;
        if(!rules) {
            return true;
        }
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value, inputIdentifier);
        const updatedOrdeform = {
            ...this.state.orderForm
        };
        const updatedFormElement = { ...updatedOrdeform[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidaity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrdeform[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrdeform) {
            formIsValid = updatedOrdeform[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrdeform, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formE => (
                    <Input
                        key={formE.id} 
                        elementType={formE.config.elementType} 
                        elementConfig={formE.config.elementConfig} 
                        value={formE.config.value} 
                        invalid={!formE.config.valid}
                        touched={formE.config.touched}
                        shouldValidate={formE.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formE.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;