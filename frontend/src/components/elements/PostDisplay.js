import React, {Component} from "react";
import Post from "../elements/Post"
import axios from "axios";
import "../../styles/posts_style.css"

export class PostDisplay extends Component {
    state = {
        posts: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get('/wp-json/wp/v2/komunikaty')
            .then(res => this.setState({
                posts: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {posts, isLoaded} = this.state;
        const {postsCount} = this.props.postsCount;
        var postNr = -1;

        if(isLoaded){
            return (
                <div className={"posts-container"}>
                    {posts.slice(0, postsCount).map(post => {
                        postNr = postNr+1;
                        return <Post key={post.id} post={post} postNr={postNr} />;
                    })}
                </div>
            );
        }
        return <h3>...</h3> ;
    }
}

export default PostDisplay;