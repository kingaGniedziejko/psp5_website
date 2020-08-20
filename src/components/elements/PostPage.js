import React, {Component} from "react";
import axios from "axios";
import PostPageSub from "./PostPageSub";
import Spinner from "./Spinner";
import {Redirect} from "react-router-dom";


export class PostPage extends Component {
    state = {
        post: undefined,
        gallery: "",
        isLoaded: false,
        firstLoad: true,
    }

    componentDidMount() {
        const {newsID} = this.props.match.params;

        const getPostUrl = global.config.proxy + "/wp-json/wp/v2/news/" + newsID;
        const getGalleryUrl = global.config.proxy + "/wp-json/acf/v3/news/" + newsID + "/image_gallery?type=photo_gallery";

        const getPost = axios.get(getPostUrl);
        const getGallery = axios.get(getGalleryUrl);

        axios.all([getPost, getGallery])
            .then(res => this.setState({
                post: res[0].data,
                gallery: res[1].data,
                isLoaded: true,
                firstLoad: false
            }))
            .catch(err => {
                console.log(err);
                if (this.state.firstLoad) {
                    this.setState({
                        firstLoad: false
                    })
                }
            });
    }

    render() {
        const {post, gallery, isLoaded, firstLoad} = this.state;

        if (!firstLoad){
            if (isLoaded) {
                return <PostPageSub post={post} gallery={gallery}/>;
            } else
                return <Redirect to={"/404/"}/>;
        }
        return <Spinner/>;
    }
}

export default PostPage;