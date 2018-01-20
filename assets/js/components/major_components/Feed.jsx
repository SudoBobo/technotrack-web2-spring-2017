import React from 'react';
import ReactDOM from 'react-dom';
import apiURLs from '../../apiURLs.jsx'
import { connect } from 'react-redux';

class FeedElement extends React.Component {

    // static propTypes = {
    //     pk: PropTypes.number.isRequired,
    //     likes_count: PropTypes.number,
    //     type: PropTypes.string,
    //     text: PropTypes.string,
    // };


    // контекст задаётся родительским компонентом
    // потенциально он доступен всем детям
    // в контекст тайпс мы говорим, что
    // именно хотим получить из стора

    // получая из контекста стор, мы можем:
    // диспатч сделать, чтобы изменить стейт
    // подписаться, чтобы изменить свой стейт
    // почитать сторе

    // static contextTypes = {
    //     store: PropTypes.object,
    // };

    constructor(props) {
        super(props);
        this.onClickPost = this.onClickPost.bind(this);
    }

    onClickPost(event) {
        this.props.onChangePage('post');
    }


    render() {
        return (
            <li>
                <div>
                    Айди: {this.props.pk}
                    <div></div>
                    Текст элемента: {this.props.text}
                    <div></div>
                    Число лайков: {this.props.likes_count}
                    <div></div>
                    <button onClick={this.onClickPost}>
                        Перейти к этому посту
                    </button>
                </div>
            </li>
        );
    }
}

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {feedList: []};
    }

    componentDidMount(props) {

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
                this.setState({feedList: json});
            },
        );

        // // вот тут результат нужно
        // // положить в экшон
        // // а экшон сунуть в диспатч
        //
        // this.context.store.subscribe(
        //     () => {
        //         setState({this.context.store.getStore.tasks})
        //     })
        //
        // // и тут вызывать экшон крейтор,
        // // который делает изЛоадинг тру
        // this.context.store.dispatch()

        // так делать не нужно, нужно делать через
        // редакс коннект


    }

    render() {

        // тут обращаемся context.store.getState
        // вместо пропсов

        if (this.state.feedList.length <= 0) {
            return (<div></div>);
        }

        // key={item.pk}
        const feedItems = this.state.feedList.map(
            (item, index) => <FeedElement key={index} onChangePage={this.props.onChangePage} text={item.text}
                                          likes_count={item.likes_count} pk={item.pk}/>
        );

        return (
            <ul>
                {feedItems}
            </ul>
        );

    }
}

// вызовет компанент с пропсами, которые
// получились из кусков стора
// аналогично с продиспатченными экшонами
// export default connect(mapStateToProps,
//     mapDispatchToProps)(Feed);