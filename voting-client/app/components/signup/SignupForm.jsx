import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import validateInput from '../../shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }    

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if(!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.isValid()) {
            this.setState({errors: {} , isLoading: true});
            console.log(this.state);
            this.props.userSignupRequest(this.state);
            /*this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You Signed up succesfully.Welcome!'
                    });
                    this.context.router.push('/');
                },
                (err) => this.setState({errors: err.response.data, isLoading: false})
            );*/
        }
    }
    render() {
        const {errors} = this.state;
        
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Voting App</h1>
                <div className="callout callout-auth">
                    <TextFieldGroup
                        error={errors.username}
                        label="Username"
                        onChange={this.onChange}
                        checkUserExists={this.checkUserExists}
                        value={this.state.username}
                        field="username"
                    />

                    <TextFieldGroup
                        error={errors.email}
                        label="Email"
                        onChange={this.onChange}
                        checkUserExists={this.checkUserExists}
                        value={this.state.email}
                        field="email"
                    />

                    <TextFieldGroup
                        error={errors.password}
                        label="Password"
                        onChange={this.onChange}
                        value={this.state.password}
                        field="password"
                        type="password"
                    />

                    <TextFieldGroup
                        error={errors.passwordConfirmation}
                        label="Password Confirmation"
                        onChange={this.onChange}
                        value={this.state.passwordConfirmation}
                        field="passwordConfirmation"
                        type="password"
                    />
                    
                    <div className="form-group">
                        <button disabled={this.state.isLoading} className="button primary expanded">
                            Signup
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm;