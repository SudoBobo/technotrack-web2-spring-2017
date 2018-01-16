import React from 'react';
import ReactDOM from 'react-dom';

class NavigationPanel extends React.Component {

    constructor(props){
        super(props);

        this.onClickPost = this.onClickPost.bind(this);
        this.onClickFeed = this.onClickFeed.bind(this);

    }

    onClickPost(event) {
        this.props.onChangePage('post');
    }

    onClickFeed(event){
        this.props.onChangePage('feed');
    }



    render() {
        return <div> шапка
            <button onClick={this.onClickFeed}>
            feed
            </button>
            <button onClick={this.onClickPost}>
                post
            </button>
        </div>;
    }
}

export default NavigationPanel;