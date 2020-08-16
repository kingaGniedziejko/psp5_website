import React, {Component} from "react";
import axios from "axios";
import PostDisplaySub from "./PostDisplaySub"

import '../../config';
import Spinner from "./Spinner";


export class PostDisplay extends Component {
    state = {
        categories: undefined,
        isLoaded: false
    }

    findCategoryId(postCategories) {
        if (postCategories !== undefined) {
            axios.get(global.config.proxy + "/wp-json/wp/v2/categories")
                .then(res => {
                    let categoriesIDs = [];

                    postCategories.forEach(elem => {
                        let categoryID = res.data.find(cat => cat.slug.toLowerCase() === elem.toLowerCase()).id;
                        if (categoryID !== undefined){
                            categoriesIDs.push(categoryID);
                        }
                    })

                    this.setState({
                        categories: categoriesIDs,
                        isLoaded: true
                    })
                })
                .catch(err => console.log(err));
        } else {
            this.setState({
                categories: undefined,
                isLoaded: true
            })
        }
    }

    componentDidMount() {
        this.findCategoryId(this.props.postCategories);
    }

    render() {
        const {categories, isLoaded} = this.state;
        const {postsCount, postsPerPage} = this.props;

        if (isLoaded) {
            return <PostDisplaySub postCategoryIDs={categories} postsCount={postsCount} postsPerPage={postsPerPage}/>;
        }
        return <Spinner />
    }
}

export default PostDisplay;