import React, { Component } from 'react'
import axios from 'axios'
const request = require('request')

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            data: null
        }
    }
    handleChanges = async (e) => {
        let search = e.target.value
        await this.setState({ search })
    }
    changeSearchOption = (e) => {
        let option = e.target.value
        if (option === "title") {
            localStorage.setItem('option', true)
        }
        else {
            localStorage.setItem('option', false)
        }
    }
    startSearch = async () => {

        if (localStorage.getItem('option') === 'true') { // true for search by Title
            console.log('search by query') 
            this.props.getDataFromAPIByQuery(this.state.search)
        }
        else { // else for search by tag name
            console.log('search by tag')
                this.props.getDataFromAPIByTag(this.state.search)
            }
          
    }
    render() {
        return (
            <div className="searchBar">
                <input className="searchInput" placeholder="Search..." value={this.state.search} onChange={this.handleChanges} />
                <button className="search" onClick={this.startSearch}><i className="fa fa-search"></i></button>
                <button className="searchOption" value="title" onClick={this.changeSearchOption}>Title</button>
                <button className="searchOption" value="tag" onClick={this.changeSearchOption}>Tag</button>
            </div>
        )
    }
}

export default SearchBar;