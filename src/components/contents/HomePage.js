import React, {Component} from "react";
import MenuShortcut from "../elements/MenuShortcut";
import PostDisplay from "../elements/PostDisplay";
import {Link} from "react-router-dom";

export class HomePage extends Component {
    state = {
        postCount: 3
    }

    render() {
        const {postCount} = this.state;

        return (
            <div className={"content"}>
                <div className={"section section-1"}>
                    <div className={"photo photo-1 photo-main"}/>
                    <h1>Na skróty</h1>
                    <MenuShortcut />
                </div>
                <div className={"section section-2"}>
                    <div className={"photo photo-2"}/>
                    <h1>Komunikaty</h1>
                    <PostDisplay postCategory={"komunikaty"} postsCount={postCount} />
                    <Link to={"/aktualnosci/komunikaty"}><button className={"button-accent-1"}>Czytaj więcej</button></Link>
                </div>
            </div>
        );
    }
}

export default HomePage;