import React, {Component} from "react";
import axios from "axios";
import PostSub from "./PostSub";
import PostPageSub from "./PostPageSub";
import Spinner from "./Spinner";


export class PostPage extends Component {
    state = {
        post: undefined,
        gallery: "",
        isLoaded: false
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
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {post, gallery, isLoaded} = this.state;

        if (isLoaded) {
            return <PostPageSub post={post} gallery={gallery}/>;
        }
        return <Spinner/>;
    }
}

export default PostPage;