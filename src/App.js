import React , { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import PhotoList from './Components/PhotoList';
import Navigation from './Components/Navigation';

import createHistory from 'history/createBrowserHistory';


/////////////////////////////////////////
//flikr login info
const apiKey =  '0d30191c3892a3471c792f8d46187db9';
//const secret =  '0856ff9ea8b87cdf'

//////Favorite category variables/////////
const defaultCategory = 'forest';

const favCategories = [
                      'fire spinning',
                      'forest',
                      'sunset'
                    ];
//////////////////////////////////////////

class App extends Component { 
    constructor() {
      super();
      this.state = {
        photos: [],
        loading: true,
      }
    }

    componentDidMount () {
      this.performSearch();
    }

    performSearch = (query = window.location.pathname.replace(/[^\w%\s]/gi, '').replace("search", '')) => {
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then( response => {
        this.setState({
          photos: response.data.photos,// this is different but works?
          loading: false,
          query: decodeURI(query),
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }

    render() {
      const history = createHistory();

      return (
          <BrowserRouter>
            <div className="App">
              <Navigation search={this.performSearch} favCategories={favCategories} history={history}/>
              <Switch>
                <Redirect from ="/" to ={`/${defaultCategory}`} exact />
                <Route path="/:topic?" render = { () => (this.state.loading)? <p>Loading...</p> : <PhotoList data={this.state.photos} search={this.performSearch} searchText={this.state.query} history={history} />} />
              </Switch>
          </div>
          </BrowserRouter>
      );
    }
  }

export default App;
/*
  <Switch>
    <Route exact path="/search/:topic" render = { () => (this.state.loading)? <p>Loading...</p> : <PhotoList data={this.state.photos}  searchText={this.state.query} />} />
    <Route path="/:topic?" render = { () => (this.state.loading)? <p>Loading...</p> : <PhotoList data={this.state.photos}  searchText={this.state.query} />} />
  </Switch>
*/