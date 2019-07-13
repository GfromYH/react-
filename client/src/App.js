import React,{Component,Fragment} from 'react'
import {Provider} from 'react-redux'
import store from './Store'
import {BrowserRouter as Router ,Route,Link,Switch} from  'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import {Button} from 'antd'
export default class App extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/" component={Admin}></Route>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
