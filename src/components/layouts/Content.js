import React, {Component} from "react";
import {Route} from 'react-router-dom';
import "../../styles/content_style.css"

import HomePage from "../contents/HomePage";
import SwimmingPool from "../contents/about_school/SwimmingPool";
import axios from "axios";
import AdditionalPage from "../elements/AdditionalPage";

export class Content extends Component {
    state = {
        allMenuItems: [],
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
        ],
        additionalPages: [],
        isAdditionalPagesLoaded: false
    }

    separateMenuItems() {
        const {menuItems} = this.props;
        var allItems = [];

        menuItems.forEach(menuItem => {
            const {child_items} = menuItem;
            allItems.push(menuItem);
            if (child_items !== undefined)
                allItems = allItems.concat(child_items);
        });

        this.setState({
            allMenuItems: allItems
        })
    }

    filterAdditionalPages() {
        const {allMenuItems, additionalPages, isAdditionalPagesLoaded} = this.state;
        if (isAdditionalPagesLoaded)
            var filteredPages = additionalPages.filter(elem => allMenuItems.some(item => item.url.toLowerCase() === elem.acf.path.toLowerCase()))

        this.setState({
            additionalPages: filteredPages
        })
    }

    filterContents(){
        const {allMenuItems, contents, additionalPages, isAdditionalPagesLoaded} = this.state;
        var filteredContents;

        filteredContents = contents.filter(elem => allMenuItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()));
        filteredContents.forEach(elem => {
            elem.path = allMenuItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
        });
        // if(isAdditionalPagesLoaded) filteredContents = filteredContents.filter(elem => !additionalPages.some(item => item.acf.path.toLowerCase() === elem.path.toLowerCase()));

        console.log(allMenuItems);
        console.log(filteredContents);

        this.setState({
            contents: filteredContents
        })
    }

    componentDidMount() {
        axios.get("wp-json/wp/v2/additional_pages")
            .then(res => this.setState({
                additionalPages: res.data,
                isAdditionalPagesLoaded: true
            }))
            .catch(err => console.log(err));


        this.separateMenuItems();
        this.filterAdditionalPages();
        this.filterContents();

    }

    render() {
        const {homePage, contents, additionalPages, isAdditionalPagesLoaded} = this.state;

        return (
            <div className={"content-container"}>
                <Route key={homePage.title} path={homePage.path} exact component={homePage.component} />
                {contents.map(elem => {
                    return <Route key={elem.title} path={elem.path} exact component={elem.component} />;
                })}
                {/*{isAdditionalPagesLoaded ?*/}
                {/*    additionalPages.map(page => {*/}
                {/*        return <AdditionalPage page={page}/>;*/}
                {/*    })*/}
                {/*    : ""*/}
                {/*}*/}
            </div>
        );
    }
}