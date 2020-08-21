import React, {Component} from "react";
import Helmet from "react-helmet";
import PostDisplay from "../../elements/PostDisplay";
import Shortcuts from "../../elements/Shortcuts";
import "../../../styles/news_style.css"

export class News extends Component {
    state = {
        title: "Aktualności",
        slug: "aktualnosci",
        isLoaded: false,
        postsPerPage: 5
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        const {title, slug, postsPerPage} = this.state;
        const {menuItems} = global.config;

        let shortcutElements = [];
        let postCategories = [];

        menuItems.find(elem => elem.title === title).child_items.forEach(element => {
            shortcutElements.push({
                title: element.title,
                url: "/" + slug + "/" + element.slug,
                type: "custom"
            });
            postCategories.push(element.slug);
        })

        if(this.state.isLoaded) {
            return (
                <div className={"content menu-page"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + title}</title>
                    </Helmet>
                    <div className={"shortcut-menu-page"}>
                        <Shortcuts elements={shortcutElements}/>
                    </div>
                    <h1>{title}</h1>
                    <PostDisplay postsCount={-1} postsPerPage={postsPerPage} postCategories={postCategories}/>
                </div>
            );
        }
        return ""
    }
}

export default News;