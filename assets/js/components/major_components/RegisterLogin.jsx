import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {doAuth} from '../../actions/auth';

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
        this.props.doAuth(apiURLs.auth, this.state.login, this.state.password);
        // event.preventDefault();
    }

    render() {

        if (this.props.isLoading) {
            return <div> Аутентификация... </div>
        }

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

class RegisterLogin extends React.Component {
    render() {
        return (
            <div>
                <Login/>
                <Register/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {

    return {
        isLoading: store.auth.isLoading,
    }
};


// я не понимаю, как это должно работать
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({doAuth}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);
