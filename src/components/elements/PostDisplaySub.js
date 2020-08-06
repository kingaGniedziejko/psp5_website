import React, {Component} from "react";
import Lottie from 'react-lottie';
import spinner from '../../images/spinner';
import Post from "../elements/Post"
import Spinner from "../elements/Spinner"
import axios from "axios";
import "../../styles/posts_style.css"

export class PostDisplaySub extends Component {
    state = {
        posts: [],
        isLoaded: false
    }

    componentDidMount() {
        const {postCategoryID} = this.props;
        let getPostsUrl = global.config.proxy + "/wp-json/wp/v2/news";

        if (postCategoryID !== undefined){
            getPostsUrl += "?categories=" + postCategoryID;
        }

        axios.get(getPostsUrl)
            .then(res => this.setState({
                posts: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        let {posts, isLoaded} = this.state;
        const {postsCount} = this.props;

        if(isLoaded) {
            if (posts.length === 0){
                return (
                    <div className={"posts-container posts-container-empty"}>
                        <h4><i>Brak aktualności</i></h4>
                    </div>
                )
            }
            if (postsCount === -1) {
                return (
                    <div className={"posts-container"}>
                        {posts.map((post, index) => {
                            return <Post key={post.id} post={post} postNr={index} />;
                        })}
                    </div>
                );
            } else {
                return (
                    <div className={"posts-container"}>
                        {posts.slice(0, postsCount).map((post, index) => {
                            return <Post key={post.id} post={post} postNr={index} />;
                        })}
                    </div>
                );
            }
        }

        return(
            <Spinner />
        );
    }
}

export default PostDisplaySub;
