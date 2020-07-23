import React, {Component} from "react";
import "../../styles/content_style.css"
import Post from "../elements/Post"
import axios from "axios";


export class Content extends Component {
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
        console.log(this.state.posts);
        const {posts, isLoaded} = this.state;
        var postNr = -1;

        if(isLoaded){
            return (
                <div className={"content"}>
                    <div className={"posts-container"}>
                        {posts.map(post => {
                            postNr = postNr+1;
                            console.log(postNr);
                            return <Post key={post.id} post={post} postNr={postNr} />;
                        })}
                    </div>
                </div>
            );
        }
        return (
            <div className={"content"}>
                <h3>...</h3>
            </div>
        );
    }
}