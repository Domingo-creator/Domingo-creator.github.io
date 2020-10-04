import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';

class SearchForm extends Component {

    state = {
        searchText: ''
    }

    onSearchChange = e => {
        this.setState({ searchText: e.target.value });
      }
      
      handleSubmit = e => {
        e.preventDefault();
        if ( this.query.value) {
          let topic = this.query.value;
          let path = `/${topic}`;
          this.props.onSearch(topic);
          this.props.history.push(path);
        }
        e.currentTarget.reset();
      }
      
      render() {  
        return (
          <form className="search-form" onSubmit={this.handleSubmit} >
            <label className="is-hidden" htmlFor="search">Search</label>
            <input type="search" 
                   onChange={this.onSearchChange}
                   name="search"
                   ref={(input) => this.query = input } // .query might not be right for flikr
                   placeholder="Search..." />
            <button type="submit" id="submit" className="search-button">
              <img src="https://www.clipartmax.com/png/middle/279-2795130_search-magnifying-glass-search-icon-transparent.png" 
              className="search-img" alt=""></img>
            </button>
          </form>
          
        );
      
      }
}

export default SearchForm;