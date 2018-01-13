import React from 'react'
import PropTypes from 'prop-types'

class Comment extends React.Component {

    static propTypes = {
        comment_text: PropTypes.string().isRequired,
        author: PropTypes.shape(
            {
                avatar: PropTypes.string(),
                smth: PropTypes.string()
            }
        )
    }

    static defaultProps = {
        blab: 'blep'
    }

    render() {
        return (
            <div className="comment">
                <div>
                    {this.props.comment_text}
                </div>
            </div>

        )
    }
}