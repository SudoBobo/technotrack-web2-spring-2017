import React from 'react';
import ReactDOM from 'react-dom';

class NavigationPanel extends React.Component {



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