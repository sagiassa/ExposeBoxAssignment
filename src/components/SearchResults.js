import React, { Component } from 'react'
import { BrowserRouter as Redirect } from 'react-router-dom';
import { throwStatement } from '@babel/types'

class SearchResults extends Component {
    constructor() {
        super()
        this.state = {
            post: null,
            clickedFordetails : false
        }
    }
    componentWillMount = () => {
        this.setState({ post: this.props.post })
    }
    GetMoreDetails = () => {
        this.setState({ clickedFordetail : true })
    }

    render() {
        let post = this.props.post
        return (
            <div className="postDisplay" onClick={this.GetMoreDetails}>
                <div className="title"> {post.title} </div>

                <div className="image">
                    {post.type === "Animated" ?
                        <video controls src={post.images.image460sv.url} type="video/mp4" />
                        : <img src={post.images.image460.url} />}
                </div>

                <div className="type"> {post.type} </div>
                {this.state.clickedFordetails ? <Redirect to='/DetailsPage' post={this.state.post} /> : null }
            </div>)
    }
}


export default SearchResults