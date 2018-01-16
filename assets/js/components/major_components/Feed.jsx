import React from 'react';
import ReactDOM from 'react-dom';
import apiURLs from '../../apiURLs.jsx'

class FeedElement extends React.Component {

    // static propTypes = {
    //     pk: PropTypes.number.isRequired,
    //     likes_count: PropTypes.number,
    //     type: PropTypes.string,
    //     text: PropTypes.string,
    // };

    render() {
        return (
            <li>
                <div>
                    Айди: {this.props.pk}
                    <div> </div>
                    Текст элемента: {this.props.text}
                    <div> </div>
                    Число лайков: {this.props.likes_count}
                </div>
            </li>
        );
    }
}

class Feed extends React.Component {

    constructor(props){
        super(props);
        this.state = {feedList:[]};
    }

    componentDidMount() {

        fetch(apiURLs.feed, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(
            body => body.json(),
        ).then(
            (json) => {
                console.log(`server response: ${JSON.stringify(json)}`);
                this.setState({feedList:json});
            },
        );
    }

    // грузим на дид маунте
    render() {

        if (this.state.feedList.length <= 0){
            return (<div> </div>);
        }

        // key={item.pk}
        const feedItems = this.state.feedList.map(
            (item, index) => <FeedElement key={index} text={item.text} likes_count={item.likes_count} pk={item.pk}/>
        );

        return (
            <ul>
                {feedItems}
            </ul>
        );

    }
}

export default Feed;
