import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import apiURLs from '../../apiURLs.jsx'
import {connect} from 'react-redux';

import {loadFeed} from '../../actions/feed';

import FeedElement from '../minor_components/FeedElement'


class Feed extends React.Component {

    componentDidMount() {
        this.props.loadFeed(apiURLs.feed);
    }

    render() {

        if (this.props.isLoading) {
            return <div>Загрузка...</div>;
        }

        const feedList = this.props.feedList.map(
            item => <FeedElement key={item.pk} id={item.pk}/>,
        );

        return (
            <div>
                {feedList}
            </div>
        )
    }
}

const mapStateToProps = (store) => {

    return {
        feedList: store.feed.feedList,
        isLoading: store.feed.isLoading,
    }
};


// я не понимаю, как это должно работать
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadFeed}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
