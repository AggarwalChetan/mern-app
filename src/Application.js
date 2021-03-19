import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './components/App';
import ExploreMovies from './components/ExploreMovies';
import UsersApp from './components/UsersApp';

function Application() {
    return(
        <Router>
            <Switch>
                <Route exact path ="/" component={App}/>
                <Route exact path ="/user-profile" component={UsersApp}/>
                <Route exact path ="/:id" component={ExploreMovies}/>
            </Switch>
        </Router>
    );
}

export default Application;