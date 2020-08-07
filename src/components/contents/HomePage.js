import React, {Component} from "react";
import { Helmet } from 'react-helmet'
import Shortcuts from "../elements/Shortcuts";
import PostDisplay from "../elements/PostDisplay";
import {Link} from "react-router-dom";

export class HomePage extends Component {
    state = {
        title: global.config.mainTitle + " Strona główna",
        postCategory: "komunikaty",
        postCount: 3,
        shortcutElements: [
            {
                title: "Kontakt",
                path: "/kontakt"
            },
            {
                title: "Rekrutacja",
                path: "/rekrutacja"
            },
            {
                title: "Spacer po szkole",
                path: "/o-szkole/spacer-po-szkole"
            },
            {
                title: "Kalendarz",
                path: "/uczen/kalendarz"
            }
        ]
    }

    render() {
        const {title, postCategory, postCount, shortcutElements} = this.state;

        return (
            <div className={"content"}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className={"section section-1"}>
                    <div className={"photo photo-1 photo-main"}/>
                    <h1>Na skróty</h1>
                    <Shortcuts elements={shortcutElements}/>
                </div>
                <div className={"section section-2"}>
                    <div className={"photo photo-2"}/>
                    <h1>Komunikaty</h1>
                    <PostDisplay postCategory={postCategory} postsCount={postCount} />
                    <Link to={"/aktualnosci/komunikaty"}><button className={"button-accent-1"}>Czytaj więcej</button></Link>
                </div>
            </div>
        );
    }
}

export default HomePage;