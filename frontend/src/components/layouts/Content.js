import React, {Component} from "react";
import "../../styles/content_style.css"
import PostDisplay from "../elements/PostDisplay";

export class Content extends Component {

    render() {
        return (
            <div className={"content"}>
                <PostDisplay postsCount={3} />
            </div>
        );
    }
}