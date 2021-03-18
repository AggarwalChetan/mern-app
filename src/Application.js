import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import ExploreMovies from './components/ExploreMovies';

function Application() {
    return(
        <Router>
            <Switch>
                <Route exact path ="/" component={App}/>
                <Route exact path ="/:id" component={ExploreMovies}/>
            </Switch>
        </Router>
    );
}

export default Application;