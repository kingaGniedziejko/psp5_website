import React, {Component} from "react";
import Lottie from 'react-lottie';
import spinner from '../../images/spinner';
import Post from "../elements/Post"
import axios from "axios";
import "../../styles/posts_style.css"

export class PostDisplay extends Component {
    state = {
        posts: [],
        categories: [],
        isLoaded: false
    }

    componentDidMount() {
        const getPosts = axios.get("/wp-json/wp/v2/news");
        const getCategories = axios.get("/wp-json/wp/v2/categories");

        Promise.all([getPosts, getCategories])
            .then(res => this.setState({
                posts: res[0].data,
                categories: res[1].data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        let {posts, categories, isLoaded} = this.state;
        const {postCategory, postsCount} = this.props;
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: spinner,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        if (postCategory !== ""){
            const category = categories.find(cat => cat.slug.toLowerCase() === postCategory.toLowerCase());
            posts = posts.filter(elem => elem.categories[0] === category.id);
        }

        if(isLoaded){
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
            <div>
                <Lottie
                    options={defaultOptions}
                    height={50}
                    width={50}
                    style={{margin: "2em"}}
                />
            </div>
        );
    }
}

export default PostDisplay;