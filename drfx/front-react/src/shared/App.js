import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts, Signup, Users } from 'pages';

 
class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/users" component={Users}/>
            </div>
        );
    }
}
 
export default App;

