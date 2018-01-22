import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class FeedElement extends React.Component {

    render() {
        return (

            <div>
                <Link to="/post/1">Элемент фида (пост)</Link>
            </div>

        );
    }
}

FeedElement.propTypes = {
    id: PropTypes.number.isRequired,
};

// вот тут вроде и делаем проверку, и делаем загрузку, если нужно
const mapStateToProps = ({ feed }, ownProps) => {
    return {};
    // {
    //     ...feed.feedList[ownProps.id],
    // };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedElement);