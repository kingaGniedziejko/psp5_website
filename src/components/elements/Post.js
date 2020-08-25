import React, {Component} from "react";
import "moment/locale/pl";
import "../../config";

import PostSub from "./PostSub";
import axios from "axios";

export class Post extends Component {
    // state = {
    //     gallery: "",
    //     isLoaded: false
    // }

    // componentDidMount() {
        // const {id} = this.props.post;
        //
        // axios.get(global.config.proxy + "/wp-json/acf/v3/news/" + id + "/image_gallery?type=photo_gallery")
        //     .then(res => this.setState({
        //         gallery: res.data,
        //         isLoaded: true
        //     }))
        //     .catch(err => console.log(err));
    // }

    render() {
        // const {gallery, isLoaded} = this.state;
        const {post, postNr} = this.props;

        // if (isLoaded) {
            return <PostSub post={post} postNr={postNr}/>;
        // }
        // return <div className={"post post-empty"}/>;
    }
}

export default Post;