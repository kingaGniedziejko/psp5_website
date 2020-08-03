import React, {Component} from "react";
import {Route} from 'react-router-dom';
import axios from "axios";
import '../../config';
import "../../styles/content_style.css"


import HomePage from "../contents/HomePage";
import SwimmingPool from "../contents/about_school/SwimmingPool";
import AdditionalPage from "../elements/AdditionalPage";

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
        ],
        additionalPages: [],
        isAdditionalPagesLoaded: false
    }

    separateMenuItems() {
        const {menuItems} = this.props;
        let allItems = [];

        menuItems.forEach(menuItem => {
            const {child_items} = menuItem;
            allItems.push(menuItem);
            if (child_items !== undefined)
                allItems = allItems.concat(child_items);
        });

        return allItems;
    }

    filterAdditionalPages(menuItems) {
        const {additionalPages} = this.state;
        return additionalPages.filter(elem => menuItems.some(item => item.url.toLowerCase() === elem.acf.path.toLowerCase()));
    }

    filterContents(menuItems, additionalPagesFiltered){
        const {contents} = this.state;
        let filteredContents;

        filteredContents = contents.filter(elem => menuItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()));
        filteredContents.forEach(elem => {
            elem.path = menuItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
        });
        filteredContents = filteredContents.filter(elem => !(additionalPagesFiltered.some(item => item.acf.path.toLowerCase() === elem.path.toLowerCase())));

        return filteredContents;
    }

    componentDidMount() {
        axios.get( global.config.proxy + "/wp-json/wp/v2/additional_pages")
            .then(res => this.setState({
                additionalPages: res.data,
                isAdditionalPagesLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {homePage, isAdditionalPagesLoaded} = this.state;

        if (isAdditionalPagesLoaded) {
            const menuItems = this.separateMenuItems();
            const additionalPagesFiltered = this.filterAdditionalPages(menuItems);
            const contentsFiltered = this.filterContents(menuItems, additionalPagesFiltered);

            // console.log(menuItems);
            // console.log(additionalPagesFiltered);
            // console.log(contentsFiltered);

            return (
                <div className={"content-container"}>
                    <Route key={homePage.title} path={homePage.path} exact component={homePage.component}/>
                    {contentsFiltered.map((elem, index) => {
                        return <Route key={index} path={elem.path} exact component={elem.component}/>;
                    })}
                    {additionalPagesFiltered.map((page, index) => {
                        return (
                            <Route key={index} path={page.acf.path} exact>
                                <AdditionalPage page={page}/>
                            </Route>
                        );
                    })}
                </div>
            );
        } else {
            return (
                <div className={"content-container"}>
                    <Route key={homePage.title} path={homePage.path} exact component={homePage.component}/>
                </div>
            );
        }
    }
}