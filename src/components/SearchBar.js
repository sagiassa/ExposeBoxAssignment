import React, { Component } from 'react'
import SearchResults from './SearchResults'
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
        let topSearched = localStorage.getItem('topSearched') ? localStorage.getItem('topSearched') : []
        let n = JSON.parse(localStorage.getItem('topSearchedCount'))
        // n = JSON.parse(n)
        if(topSearched!=='null'){
            topSearched = JSON.parse(topSearched)
            if( !topSearched.includes(this.state.search) ){
                topSearched[n%10]=this.state.search
                n++
            }
        }
        else{
           topSearched = [this.state.search]
           n++ 
        }

        localStorage.setItem('topSearched', JSON.stringify(topSearched))
        localStorage.setItem('topSearchedCount', n)
        if (localStorage.getItem('option') === 'true') { // true for search by Title
            this.props.getDataFromAPIByQuery(this.state.search)
        }
        else { // else for search by tag name
            this.props.getDataFromAPIByTag(this.state.search)
        }

    }
    render() {
        return (
            <div>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search..." value={this.state.search} onChange={this.handleChanges} />
                    <button className="search" onClick={this.startSearch}><i className="fa fa-search"></i></button>
                    <button className="searchOption" value="title" onClick={this.changeSearchOption}>Title</button>
                    <button className="searchOption" value="tag" onClick={this.changeSearchOption}>Tag</button>
                </div>
                <div>
                    {this.props.data? 
                        this.props.data.map(x => 
                            <SearchResults post={x} /> ) : null}
                </div>
            </div>
        )
    }
}

export default SearchBar;