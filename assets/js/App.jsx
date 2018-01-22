import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import NavigationPanel from './components/major_components/NavigationPanel'
import RegisterLogin from './components/major_components/RegisterLogin'
import Feed from './components/major_components/Feed'
import Post from './components/major_components/Post'
import MakePost from './components/major_components/MakePost'
import Friends from './components/major_components/Friends'
import MyProfile from './components/major_components/MyProfile'

class App extends React.Component {
    render() {

        // if (!(this.props.isLogin || localStorage.getItem('token'))) {
        //     return <RegisterLogin/>
        // }
        return (<div>
            <Link to="/friends/">Друзья</Link>
            <Link to="/profile/">Мой профиль</Link>
            <Link to="/feed/">Лента</Link>
            <Link to="/make_post/">Написать пост</Link>


            <Switch>
                <Route exact path="/" component={() => <h2>Тест</h2>}/>
                <Route exact path="/friends/" component={Friends}/>
                {/*<Route exact path="/profile/" component={Profile}/>*/}
                <Route exact path="/feed/" component={Feed}/>
                <Route exact path='/post/:id' component={Post}/>
                <Route exact path='/make_post/' component={MakePost}/>


                {/*<Route*/}
                {/*exact*/}
                {/*path="/create/"*/}
                {/*render={props => <TaskForm {...props} onCreate={this.onTaskCreate}/>}*/}
                {/*/>*/}
                {/*<Route exact path="/tasklist/" component={TaskList}/>*/}
            </Switch>

        </div>);
    }
}

export default App;

// const mapStateToProps = (store) => {
//
//     return {
//         isLogin: store.auth.isLogin,
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({}, dispatch)
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);


// добавим ещё обертку, которая будет
// хранить текущую страничку (location)
// не window.location, а ...redux.location


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
