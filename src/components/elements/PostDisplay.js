import React, {Component} from "react";
import axios from "axios";
import PostDisplaySub from "./PostDisplaySub"

import '../../config';


export class PostDisplay extends Component {
    state = {
        category: undefined,
        isLoaded: false
    }

    findCategoryId(postCategory) {
        if (postCategory !== "") {
            axios.get(global.config.proxy + "/wp-json/wp/v2/categories")
                .then(res => this.setState({
                    category: res.data.find(cat => cat.slug.toLowerCase() === postCategory.toLowerCase()).id,
                    isLoaded: true
                }))
                .catch(err => console.log(err));
        } else {
            this.setState({
                category: undefined,
                isLoaded: true
            })
        }
    }

    componentDidMount() {
        this.findCategoryId(this.props.postCategory);
    }

    render() {
        const {category, isLoaded} = this.state;
        const {postsCount} = this.props;

        if (isLoaded) {
            return <PostDisplaySub postCategoryID={category} postsCount={postsCount}/>;
        }
        return ""
    }
}

export default PostDisplay;