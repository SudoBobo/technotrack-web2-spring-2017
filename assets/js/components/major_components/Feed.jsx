import React from 'react';
import ReactDOM from 'react-dom';

// class FeedElement extends React.Component {
//
//     static propTypes = {
//         pk: PropTypes.number.isRequired,
//         likes_count: PropTypes.number,
//         type: PropTypes.string,
//         text: PropTypes.string,
//     };
//
//     render() {
//         return (
//             <li>
//                 <div>
//                     {props.text},
//                     <div></div>
//                     {props.likes_count}
//                 </div>
//             </li>
//         );
//     }
// }

class Feed extends React.Component {

    componentDidMount() {
        // берём токен
        // грузим
        // кладём в стэйт
    }

    // грузим на дид маунте
    render() {

        // const FeedItems = number.map((pks) =>
        //     <FeedElement pk={}/>
        // );

        // return (
        //     <ul>
        //         {FeedItems}
        //     </ul>
        // );

        return (
            <div> Feeeeeed </div>
        );
    }
}

export default Feed;
