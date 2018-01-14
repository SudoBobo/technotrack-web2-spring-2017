import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import apiURLs from '../../apiURLs.jsx'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            mail: ''
        }
    }

    render() {
        return <div> register window</div>
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {

        fetch(apiURLs.auth, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({username: this.state.login, password: this.state.password}),
            headers: {
                'content-type': 'application/json',
            }
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                if ('token' in json) {
                    localStorage.setItem('token', json['token']);
                    this.props.onChangePage('feed');
                }
                else {
                    console.log('something went wrong during authorization');
                    console.log(`server response: ${JSON.stringify(json)}`);
                }

            },
        );

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Login:
                    <input type="text" value={this.state.login} onChange={this.handleChange} name="login"/>
                </label>

                <div></div>

                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handleChange} name="password"/>
                </label>

                <div></div>

                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

// Login.propTypes = {
//     onChangePage: PropTypes.func()
// };

class RegisterLogin extends React.Component {
    render() {
        return (
            <div>
                <Login onChangePage={this.props.onChangePage}/>
                <Register/>
            </div>
        );
    }
}

export default RegisterLogin;
