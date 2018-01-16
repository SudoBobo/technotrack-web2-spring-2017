import React from 'react'
import PropTypes from 'prop-types'

class Comment extends React.Component {

    // static propTypes = {
    //     comment_text: PropTypes.string().isRequired,
    //     author: PropTypes.shape(
    //         {
    //             avatar: PropTypes.string(),
    //             smth: PropTypes.string()
    //         }
    //     )
    // };

    render() {
        return (
            <div>
                <div>
                    {this.props.author}
                </div>

                <div>  </div>

                <div>
                    {this.props.text}
                </div>
            </div>

        )
    }
}

export default Comment;
