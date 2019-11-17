import React, { Component } from 'react'
import { throwStatement } from '@babel/types'

class SearchResults extends Component {
    constructor() {
        super()
        this.state = {
            post: null
        }
    }
    componentWillMount = () => {
        this.setState({ post: this.props.post })
    }
    GetMoreDetails = () => {
        console.log(this.state.post)
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

                <div> {post.type} </div>
            </div>)
    }
}


export default SearchResults