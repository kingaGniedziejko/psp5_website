import React, {Component} from "react";
import Helmet from "react-helmet";
import Shortcuts from "./Shortcuts";

export class MenuPage extends Component {

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    render() {
        const {menuItem} = this.props;
        const {title} = menuItem;
        let shortcutElements = [];

        menuItem.child_items.forEach(elem => {
            if (elem.type_label === "Własny odnośnik"){
                if (this.isValidUrl(elem.url)){
                    shortcutElements.push({
                        title: elem.title,
                        path: elem.url,
                        type: "outside_link"
                    })
                } else {
                    shortcutElements.push({
                        title: elem.title,
                        path: elem.url
                    })
                }
            }
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