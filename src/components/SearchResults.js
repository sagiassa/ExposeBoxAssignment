import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
class SearchResults extends Component {
    constructor() {
        super()
        this.state = {
            post: null,
        }
    }
    componentWillMount = () => {
        this.setState({ post: this.props.post })
    }
    GetMoreDetails = async  () => {
        let post = this.state.post
        await localStorage.setItem('Post', JSON.stringify(post))
    }

    render() {
        let post = this.props.post
        return (
            <div className="postDisplay" >
                <div className="Title" > {post.title} </div>
                <div className="image">
                    {post.type === "Animated" ?
                        <video controls src={post.images.image460sv.url} type="video/mp4" />
                        : <img src={post.images.image460.url} />}
                </div>
                <div className="details" > <Link to='/DetailsPage' onClick={this.GetMoreDetails} >Get More Details</Link> </div>
            </div>)
    }
}


export default SearchResults