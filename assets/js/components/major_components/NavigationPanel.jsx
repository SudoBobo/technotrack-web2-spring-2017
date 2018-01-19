import React from 'react';
import ReactDOM from 'react-dom';

class NavigationPanel extends React.Component {

    constructor(props) {
        super(props);

        this.onClickFeed = this.onClickFeed.bind(this);
        this.onClickMyProfile = this.onClickMyProfile.bind(this);
        this.onClickFriends = this.onClickFriends.bind(this);
    }


    onClickFeed(event) {
        this.props.onChangePage('feed');
    }

    onClickMyProfile(event) {
        this.props.onChangePage('myProfile');
    }

    onClickFriends(event) {
        this.props.onChangePage('friends');
    }


    render() {
        return (
            <div>
                <button onClick={this.onClickFeed}>
                    feed
                </button>

                <button onClick={this.onClickMyProfile}>
                    profile
                </button>

                <button onClick={this.onClickFriends}>
                    friends
                </button>
            </div>
        );
    }
}

export default NavigationPanel;