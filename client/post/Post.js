import React, { Component } from 'react'

class Post extends Component {

    render(){
        let {post} = this.props
        return (
            <div>
                Posted By: {post.postedBy.name}<br/>
                Content: {post.text}
            </div>
        )
    }
}

export default Post