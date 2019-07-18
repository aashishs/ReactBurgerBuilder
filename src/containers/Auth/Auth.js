import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
//import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { updatedObject, checkValidaity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = updatedObject(this.state.controls, {
            [inputIdentifier]: updatedObject(this.state.controls[inputIdentifier],{
                value: event.target.value,
                valid: checkValidaity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
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
                <Button btnType="Success">Submit</Button>
            </form>
        );
        let errorMsg = '';
        if(this.props.error) errorMsg = (
                <p className={classes.ErrorMessage}>{this.props.error.message}</p>
            );
        if(this.props.loading) form = <Spinner/>

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h4>{this.state.isSignup?'Sign Up':'Sign In'}</h4>
                {errorMsg}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch To {this.state.isSignup?'Sign In':'Sign Up'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);