import React, {Component} from "react";
import PostDisplay from "../../elements/PostDisplay";

export class NewsPage extends Component {

    render() {
        const {newsInfo} = this.props;
        return (
            <div className={"content"}>
                <h1>{newsInfo.title}</h1>
                <PostDisplay postCategory={newsInfo.postCategory} postsCount={newsInfo.postsCount}/>
            </div>
        );
    }
}

export default NewsPage;