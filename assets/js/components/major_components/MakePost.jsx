import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import apiURLs from '../../apiURLs.jsx'
import {connect} from 'react-redux';

import {makePost} from '../../actions/makePost';

class MakePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        this.props.makePost(apiURLs.post, this.state.title, this.state.text);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Post title:
                    <input type="text" value={this.state.title} onChange={this.handleChange} name="title"/>
                </label>

                <div></div>

                <label>
                    Post text:
                    <input type="text" value={this.state.text} onChange={this.handleChange} name="text"/>
                </label>

                <div></div>

                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({makePost}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(MakePost);
