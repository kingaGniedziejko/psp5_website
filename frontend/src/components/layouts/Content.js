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
        if(isLoaded){
            return (
                <div className={"content"}>
                    <div className={"posts-container"}>
                        {posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            );
        }
        return <h3><p className={"content"}>Praesent a mauris vulputate, elementum sem vitae, tincidunt ipsum. In arcu odio, faucibus id dolor a, venenatis placerat nisl. Mauris porttitor vitae augue pellentesque placerat. Integer sit amet.</p></h3>;
    }
}