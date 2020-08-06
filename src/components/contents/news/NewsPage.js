import React, {Component} from "react";
import PostDisplay from "../../elements/PostDisplay";

export class NewsPage extends Component {

    render() {
        const postsPerPage = 3;
        const {newsInfo} = this.props;

        return (
            <div className={"content"}>
                <h1>{newsInfo.title}</h1>
                <PostDisplay postCategory={newsInfo.postCategory} postsCount={newsInfo.postsCount} postsPerPage={postsPerPage}/>
            </div>
        );
    }
}

export default NewsPage;