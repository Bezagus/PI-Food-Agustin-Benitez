import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateRecipe from './Components/CreateRecipe/CreateRecipe';
import Card from './Components/Card/Card';
import Details from './Components/Details/Details';
import Error404 from './Components/Error 404/Error404';
import LoadingPage from './Components/LoadingPage/LoadingPage';


//pruebas
import Filters from './Components/Filters/Filters';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/prueba' component={Filters}/>
          <Route exact path='/recipes' component={CreateRecipe}/>
          <Route exact path='/card' component={Card}/>
          <Route exact path='/recipes/:id' component={Details}/>
          <Route exact path='/loading' component={LoadingPage}/>
          <Route path='*' component={Error404}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
