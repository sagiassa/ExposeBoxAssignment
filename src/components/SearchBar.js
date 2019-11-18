import React, { Component } from 'react'
import SearchResults from './SearchResults'
import PopUp from './PopUp'
class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            data: null,
            showTopten : false
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
    showTopTenTerms = () => {
        if(localStorage.getItem('topSearched')!=='null')
         this.setState({ showTopTerms : true })
        else
            alert("No terms have been searched")
    }
    closeTopTerms =  () => {
        this.setState({ showTopTerms : false })
    }
    render() {
        return (
            <div>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search..." value={this.state.search} onChange={this.handleChanges} />
                    <button className="search" onClick={this.startSearch}><i className="fa fa-search"></i></button>
                    <button className="searchOption" value="title" onClick={this.changeSearchOption}>Title</button>
                    <button className="searchOption" value="tag" onClick={this.changeSearchOption}>Tag</button>
                    <div><button className="topTenSearchTerms" onClick={this.showTopTenTerms} >Top 10 Searhed terms</button></div>
                </div>
                {this.state.showTopTerms ? 
                    <PopUp closeTopTerms={this.closeTopTerms}/>
                : null}
                <div className="postsContainer">
                    {this.props.data? 
                        this.props.data.map(x => 
                            <SearchResults post={x} /> ) : null}
                </div>
            </div>
        )
    }
}

export default SearchBar;