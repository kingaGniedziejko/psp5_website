import React, {Component} from "react";
import Helmet from "react-helmet";
import PostDisplay from "../../elements/PostDisplay";

export class NewsPage extends Component {

    render() {
        const postsPerPage = 3;
        const {newsInfo} = this.props;

        return (
            <div className={"content"}>
                <Helmet>
                    <title>{global.config.mainTitle + " " + newsInfo.title}</title>
                </Helmet>
                <h1>{newsInfo.title}</h1>
                <PostDisplay postCategories={[newsInfo.postCategory]} postsCount={newsInfo.postsCount} postsPerPage={postsPerPage}/>
            </div>
        );
    }
}

export default NewsPage;