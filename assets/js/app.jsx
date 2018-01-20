import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import initStore from './utils'

import NavigationPanel from './components/major_components/NavigationPanel'
import RegisterLogin from './components/major_components/RegisterLogin'
import Feed from './components/major_components/Feed'
import Post from './components/major_components/Post'
import Friends from './components/major_components/Friends'
import MyProfile from './components/major_components/MyProfile'

import '../style/style.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        // это всё хранится в сторе

        this.state = {
            currentPage: localStorage.getItem('token') ? 'feed' : 'registerLogin',
        };



        this.pages = {
            registerLogin: RegisterLogin,
            feed: Feed,
            post: Post,
            friends: Friends,
            // friendProfile: FriendProfile,
            myProfile: MyProfile
        };

        this.changePage = this.changePage.bind(this);
    }

    changePage(newPageTitle) {
        if (newPageTitle in this.pages) {
            this.setState({currentPage: newPageTitle});
        } else {
            console.log('there is no such page title! (from \'changePage\' function)')
        }
    }


    render() {

        const CurrentPage = this.pages[this.state.currentPage];
        console.log(this.state.currentPage);

        return <div>
            <NavigationPanel onChangePage={this.changePage}/>
            <CurrentPage onChangePage={this.changePage}/>
        </div>;
    }
}


// добавим ещё обертку, которая будет
// хранить текущую страничку (location)
// не window.location, а ...redux.location
ReactDOM.render(
    <Provider store={initStore()}>
        <App/>
    </Provider>,
document.getElementById('root')
)
;

//
// // class component
// class MyComponent extends React.Component {
//
//     // there are a few other functions: constructor (props) -> render() -> smth () ->  smth_else ()
//     // their aggregate is called 'component life-cycle'
//     render(){
//         return <div>React component NEW MLERM {this.props.title}</div>;
//     }
// }
// // functional components
// export const MyName = ({name}) =>
//     (
//         <h1 className="kek">
//             hey {name}
//         </h1>
//     );
//
//
// export const Element = (props) => (
//     <div className="greeting">
//         Hello,
//         <div>
//             <MyName name="NEW"/>
//         </div>
//
//         <MyName name = "kek shpek"/>
//         <MyComponent title="my title"/>
//     </div>
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import {printText, test} from './utils'
// import {Element} from './components/app.jsx'
//
//
//
