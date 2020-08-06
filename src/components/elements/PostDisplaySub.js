import React, {Component} from "react";
import ReactPaginate from 'react-paginate';
import Lottie from 'react-lottie';
import spinner from '../../images/spinner';
import Post from "../elements/Post"
import Spinner from "../elements/Spinner"
import axios from "axios";
import "../../styles/posts_style.css"
import "../../config";

import { ReactComponent as IconArrowBack } from '../../images/icon_arrow_back.svg';
import { ReactComponent as IconArrowForward } from '../../images/icon_arrow_forward.svg';

export class PostDisplaySub extends Component {
    state = {
        posts: [],
        isLoaded: false,
        offset: 0
    }

    loadPosts() {
        const {offset} = this.state;
        const {postCategoryID, postsCount, postsPerPage} = this.props;
        let getPostsUrl = global.config.proxy + "/wp-json/wp/v2/news";

        if (postCategoryID !== undefined){
            getPostsUrl += "?categories=" + postCategoryID;
            if (postsCount === -1){
                getPostsUrl += "&per_page=" + postsPerPage;
                getPostsUrl += "&offset=" + offset;
            }
        }

        axios.get(getPostsUrl)
            .then(res => this.setState({
                posts: res.data,
                isLoaded: true,
                pageCount: Number(res.headers["x-wp-totalpages"])
            }))
            .catch(err => console.log(err));
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.postsPerPage);

        this.setState({ offset: offset }, () => {
            this.loadPosts();
        });
    };

    componentDidMount() {
        this.loadPosts();
    }

    render() {
        let {posts, isLoaded, pageCount, postCount, offset} = this.state;
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
                        <ReactPaginate
                            // previousLabel={<IconArrowBack/>}
                            // nextLabel={<IconArrowForward/>}
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
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