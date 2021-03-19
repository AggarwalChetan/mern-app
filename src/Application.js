import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './components/App';
import ExploreMovies from './components/ExploreMovies';
import UsersApp from './components/UsersApp';
import UserExploreMovies from './components/UserExploreMovies';

function Application() {
    return(
        <Router>
            <Switch>
                <Route exact path ="/" component={App}/>
                <Route exact path ="/explore-movies/:id" component={ExploreMovies}/>
                <Route exact path ="/user-profile" component={UsersApp}/>
                <Route exact path ="/user-profile/:id" component={UserExploreMovies}/>
            </Switch>
        </Router>
    );
}

export default Application;