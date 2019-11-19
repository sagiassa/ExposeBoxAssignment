import React, { Component } from 'react'
import SearchResults from './SearchResults'
import PopUp from './PopUp'
class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            searchOpt: 'title',
            data: null,
            showTopten: false
        }
    }
    handleChanges = async (e) => {
        let search = e.target.value
        await this.setState({ search })
    }
    changeSearchOption = (e) => {
        let option = e.target.value
        if (option === "title") {
            localStorage.setItem('option', 'title')
            this.setState({ searchOpt : 'title'})
        }
        else {
            localStorage.setItem('option', 'tag')
            this.setState({ searchOpt : 'tag'})

        }
    }
    startSearch = async () => {
        let topSearched = localStorage.getItem('topSearched') ? localStorage.getItem('topSearched') : []
        let n = JSON.parse(localStorage.getItem('topSearchedCount'))
        if (topSearched !== 'null') {
            topSearched = JSON.parse(topSearched)
            if (!topSearched.includes(this.state.search)) {
                topSearched[n % 10] = this.state.search
                n++
            }
        }
        else {
            topSearched = [this.state.search]
            n++
        }

        localStorage.setItem('topSearched', JSON.stringify(topSearched))
        localStorage.setItem('topSearchedCount', n)
        if (localStorage.getItem('option') === 'title') {
            this.props.getDataFromAPIByQuery(this.state.search)
        }
        else {
            this.props.getDataFromAPIByTag(this.state.search)
        }
    }
    showTopTenTerms = () => {
        if (localStorage.getItem('topSearched') !== 'null')
            this.setState({ showTopTerms: true })
        else
            alert("No terms have been searched")
    }
    closeTopTerms = () => {
        this.setState({ showTopTerms: false })
    }
    render() {
        return (
            <div>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search..." value={this.state.search} onChange={this.handleChanges} />
                    <button className="search" onClick={this.startSearch}><i className="fa fa-search"></i></button>
                    {this.state.searchOpt === 'title' ?
                        <span className="searchOpt">
                            <button className="putAnUnderline" value="title" onClick={this.changeSearchOption}>Title</button> /
                            <button className="tag" value="tag" onClick={this.changeSearchOption}>Tag</button>
                        </span> :
                        <span className="searchOpt">
                            <button className="title" value="title" onClick={this.changeSearchOption}>Title</button> /
                            <button className="putAnUnderline" value="tag" onClick={this.changeSearchOption}>Tag</button>
                        </span>}
                </div>
                <div><button className="topTenSearchTerms" onClick={this.showTopTenTerms} >Top 10 Searched terms</button></div>
                {this.state.showTopTerms ?
                    <PopUp closeTopTerms={this.closeTopTerms} />
                    : null}
                <div className="postsContainer">
                    {this.props.data ?
                        this.props.data.map(x =>
                            <SearchResults post={x} />) : null}
                </div>
            </div>
        )
    }
}

export default SearchBar;