import React, {Component} from "react";
import Helmet from "react-helmet";
import Shortcuts from "./Shortcuts";

export class MenuPage extends Component {



    render() {
        const {menuItem} = this.props;
        const {title} = menuItem;
        let shortcutElements = [];

        menuItem.child_items.forEach(elem => {
            shortcutElements.push({
                title: elem.title,
                url: elem.url,
                type: elem.type
            });
        })

        return (
            <div className={"content menu-page"}>
                <Helmet>
                    <title>{global.config.mainTitle + " " + title}</title>
                </Helmet>
                <div className={"shortcut-menu-page vertical-centered"}>
                    <Shortcuts elements={shortcutElements}/>
                </div>
            </div>
        );
    }
}

export default MenuPage;