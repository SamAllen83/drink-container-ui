import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';
import About from './About';

const browseHost = process.env.REACT_APP_BROWSE_HOST || 'http://localhost:3001/'
const restaurantHost = process.env.REACT_APP_RESTAURANT_HOST || 'http://localhost:3002'
const contentHost = process.env.REACT_APP_CONTENT_HOST || 'http://localhost:5000'

let numRestaurants = 0;
fetch(`${contentHost}/restaurants.json`)
  .then(res => res.json())
  .then(restaurants => {
    numRestaurants = restaurants.length;
  });
const getRandomRestaurantId = () =>
  Math.floor(Math.random() * numRestaurants) + 1;

const Browse = ({ history }) => (
  <MicroFrontend history={history} host={browseHost} name="Browse" />
);
const Restaurant = ({ history }) => (
  <MicroFrontend history={history} host={restaurantHost} name="Restaurant" />
);
const Random = () => <Redirect to={`/restaurant/${getRandomRestaurantId()}`} />;

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/restaurant/:id" component={Restaurant} />
        <Route exact path="/random" render={Random} />
        <Route exact path="/about" render={About} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
