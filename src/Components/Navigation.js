import React, { Component } from 'react';
import SearchForm from './SearchForm';
import CategoryButtons from './CategoryButtons';

class Navigation extends Component {
    render() {
        return (
            <header className="App-header">
                <h1 className="main-title">PhotoSearch</h1>
                <SearchForm onSearch={this.props.search} history={this.props.history} favCategories={this.props.favCategories}/>
                <CategoryButtons Clicked={this.props.search} favCategories={this.props.favCategories}/>
            </header>

        )
    }
}
export default Navigation;