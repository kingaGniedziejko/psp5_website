import React, {Component} from "react";
import PostDisplay from "../../elements/PostDisplay";
import Shortcuts from "../../elements/Shortcuts";

export class News extends Component {
    state = {
        title: "Aktualności",
        slug: "aktualnosci",
        postsPerPage: 5
    }

    render() {
        const {title, slug, postsPerPage} = this.state;
        const {menuItems} = global.config;

        let shortcutElements = [];

        menuItems.find(elem => elem.title === title).child_items.forEach(elem => {
            shortcutElements.push({
                title: elem.title,
                path: "/" + slug + "/" + elem.slug
            })
        })

        return (
            <div className={"content"}>
                <h1>{title}</h1>
                <Shortcuts elements={shortcutElements}/>
                <PostDisplay postsCount={-1} postsPerPage={postsPerPage}/>
            </div>
        );
    }
}

export default News;