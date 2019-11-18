import React, { Component } from 'react'

class DetailsPage extends Component{
    constructor(props){
        super(props)
        this.state = { 
            post : null
        }
    }
    componentWillMount = async () => {
        let post = JSON.parse(localStorage.getItem('Post'))
        await this.setState({ post : post })
    }
    render(){
        let post = this.state.post
        return(

            <div className="postDetails">
                <div> {post.id} </div>
                <div> {post.title} </div>
                <div> {post.upVoteCount} </div>
                <div> {post.downVoteCount} </div>
                <div className="image">
                    {post.type === "Animated" ?
                        <video controls src={post.images.image460sv.url} type="video/mp4" />
                        : <img src={post.images.image460.url} />}
                </div>
            </div>
        )
    }
}

export default DetailsPage
