import React, {Component} from "react";
import {Route} from 'react-router-dom';
import "../../styles/content_style.css"

import HomePage from "../contents/HomePage";
import SwimmingPool from "../contents/about_school/SwimmingPool";

export class Content extends Component {
    state = {
        homePage: {
            title: "strona główna",
            path: "/",
            component: HomePage
        },

        contents: [
            {
                title: "basen",
                path: "",
                component: SwimmingPool
            }
        ]
    }

    componentDidMount() {
        const {contents} = this.state;
        const {menuItems} = this.props;
        var allItems = [];
        var filteredContents;

        menuItems.forEach(menuItem => {
            const {child_items} = menuItem;
            allItems.push(menuItem);
            if (child_items !== undefined)
                allItems = allItems.concat(child_items);
        });

        filteredContents = contents.filter(elem => allItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()))
        filteredContents.forEach(elem => {
           elem.path = allItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
        });

        this.setState({
            contents: filteredContents
        })
    }


    render() {
        const {homePage, contents} = this.state;

        return (
            <div className={"content-container"}>
                <Route key={homePage.title} path={homePage.path} exact component={homePage.component} />
                {contents.map(elem => {
                    return <Route key={elem.title} path={elem.path} exact component={elem.component} />;
                })}
            </div>
        );
    }

}