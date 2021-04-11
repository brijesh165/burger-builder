import React, {Component} from 'react';

import classes from './Registration.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from '../../axios-orders';


class Registration extends Component {
    state = {
        registrationForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your First Name'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Last Name'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
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
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minlength) {
            isValid = value.length >=rules.minlength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.registrationForm,
            [controlName]: {
                ...this.state.registrationForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.registrationForm[controlName].validation),
                touched: true
            }
        };
        let formIsValid = true;
        for(let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({registrationForm: updatedControls, formIsValid: formIsValid});
    };

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.registrationForm) {
            formData[formElementIdentifier] = this.state.registrationForm[formElementIdentifier].value
        }

        axios.post('/register', formData)
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.registrationForm) {
            formElementArray.push({
                id: key,
                config: this.state.registrationForm[key]
            });
        }

        const form = formElementArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (
            <div className={classes.Registration}>
                <form>
                    {form}
                    <Button btnType="Success"
                            clicked={this.submitHandler} >SUBMIT</Button>
                    <Button btnType="Danger">CANCEL</Button>
                </form>
            </div>
        );
    }
}

export default Registration;
