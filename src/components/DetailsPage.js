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
                <div className="postId" >  ID : {post.id} </div>
                <div className="postTitle"> Title :  {post.title} </div>
                <div className="postUp"> {post.upVoteCount} <i class="far fa-thumbs-up"></i> </div>
                <div className="postDown"> {post.downVoteCount} <i class="far fa-thumbs-down"></i></div>
                <div className="postPhoto">
                    {post.type === "Animated" ?
                        <video controls src={post.images.image460sv.url} type="video/mp4" />
                        : <img src={post.images.image460.url} />}
                </div>
            </div>
        )
    }
}

export default DetailsPage
