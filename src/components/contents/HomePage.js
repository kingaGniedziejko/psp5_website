import React, {Component} from "react";
import Shortcut from "../elements/Shortcut";
import PostDisplay from "../elements/PostDisplay";

export class HomePage extends Component {
    state = {
        postCount: 3
    }

    render() {
        return (
            <div className={"content"}>
                <div className={"photo photo-1"}/>
                <h1>Na skróty</h1>
                <Shortcut />

                <div className={"photo photo-2"}/>
                <h1>Komunikaty</h1>
                <PostDisplay postCategory={"komunikaty"} postsCount={this.state.postCount} />
                <button className={"button-accent-1"}>Czytaj więcej</button>
            </div>
        );
    }
}

export default HomePage;