import React from 'react';
import ReactDOM from 'react-dom';
import apiURLs from '../../apiURLs.jsx'

import Comment from '../minor_components/Comment'

class Post extends React.Component {
    render() {

        // const comments = this.props.comments.map(
        //     (item, index) => <li><Comment key={index} text={item.text} author={item.author}/></li>
        // );

        return (

            <div> Это пост {this.props.match.params.id}</div>
        // {/*<ul>*/}
        //     {/*<li> Автор: {this.props.author} </li>*/}
        //     {/*<li> Название поста: {this.props.title} </li>*/}
        //     {/*<li> Текст поста: {this.props.text} </li>*/}
        //     {/*<li> Число лайков: {this.props.likes_count}</li>*/}
        //     {/*<li> Комментарии:*/}
        //         {/*<ul> {comments}</ul>*/}
        //     {/*</li>*/}
        // {/*</ul>*/}
        );
    }
}

Post.defaultProps = {
        'id': 1,
        'author': 'Bobo',
        'created': '2017-11-05T11:30:20.516162Z',
        'updated': '2018-01-15T11:38:43.704767Z',
        'likes_count': 2,
        'title': 'About cats',
        'text': 'Cats are nice',
        'comments_count': 3,
        'comments': [{
            'author': 'Wowo',
            'edited': true,
            'created': '2017-11-05T11:31:05.429971Z',
            'updated': '2017-11-05T11:33:19.871816Z',
            'likes_count': 0,
            'text': 'Some comment text bla bla bla'
        },
            {
                'author': 'Zozo',
                'edited': true,
                'created': '2017-11-05T11:40:37.481768Z',
                'updated': '2017-11-05T11:40:37.481804Z',
                'likes_count': 0,
                'text': 'Some comment text bla'
            },
        ]
    };

export default Post;
