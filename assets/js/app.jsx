import React from 'react';
import ReactDOM from 'react-dom';
import NavigationPanel from './components/major_components/NavigationPanel'
import RegisterLogin from './components/major_components/RegisterLogin'

import '../style/style.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'registerLogin'
        };

        this.pages = {
            registerLogin: RegisterLogin,
            // feed: <Feed/>,
            // post: <Post/>,
            // friends: <Friends/>,
            // friendProfile: <FriendProfile/>,
            // myProfile: <MyProfile/>
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
        console.log(CurrentPage);

        return <div>
            <NavigationPanel onChangePage={this.changePage}/>
            <CurrentPage onChangePage={this.changePage}/>
        </div>;
    }
}




ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

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
