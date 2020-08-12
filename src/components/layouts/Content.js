import React, {Component} from "react";
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import axios from "axios";
import '../../config';
import "../../styles/content_style.css"

import ErrorNotFound from "../elements/ErrorNotFound";
import HomePage from "../contents/HomePage";
import Contact from "../contents/Contact";
import Library from "../contents/about_school/Library";
import SwimmingPool from "../contents/about_school/SwimmingPool";
import Documents from "../contents/about_school/Documents";
import Anthem from "../contents/about_school/Anthem";
import Calendar from "../contents/student/Calendar";
// import LinkedPage from "../elements/LinkedPage";
import AdditionalPage from "../elements/AdditionalPage";
import NewsPage from "../contents/news/NewsPage";
import News from "../contents/news/News";

export class Content extends Component {
    state = {
        homePage: {
            title: "strona główna",
            path: "/",
            component: HomePage
        },
        news: [],
        contents: [
            {
                title: "aktualności",
                component: News
            },
            {
                title: "basen",
                path: "",
                component: SwimmingPool
            },
            {
                title: "kontakt",
                path: "",
                component: Contact
            },
            {
                title: "biblioteka",
                path: "",
                component: Library
            },
            {
                title: "dokumenty",
                path: "",
                component: Documents
            },
            {
                title: "hymn szkoły",
                path: "",
                component: Anthem
            },
            {
                title: "kalendarz",
                path: "",
                component: Calendar
            },
        ],
        additionalPages: [],
        isAdditionalPagesLoaded: false
    }

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
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

    filterLinkedPages(menuItems) {
        return menuItems.filter(elem => this.isValidUrl(elem.url) && elem.object === "custom")
    }

    filterContents(menuItems, additionalPagesFiltered, linkedPagesFiltered) {
        const {contents} = this.state;
        let filteredContents;

        filteredContents = contents.filter(elem => menuItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()));
        filteredContents.forEach(elem => {
            elem.path = menuItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
        });
        filteredContents = filteredContents.filter(elem => !(additionalPagesFiltered.some(item => item.acf.path.toLowerCase() === elem.path.toLowerCase())));
        filteredContents = filteredContents.filter(elem => !linkedPagesFiltered.some(item => item.url === elem.url))

        return filteredContents;
    }

    filterNews(menuItems) {
        let filteredNews = [];

        menuItems.forEach(item => {
            if (item.object === "category"){
                filteredNews.push({
                    title: item.title,
                    path: "/aktualnosci/" + item.slug,
                    postCategory: item.slug,
                    postsCount: -1
                })
            }
        });

        return filteredNews;
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
            const linkedPagesFiltered = this.filterLinkedPages(menuItems);
            const contentsFiltered = this.filterContents(menuItems, additionalPagesFiltered, linkedPagesFiltered);
            const newsFiltered = this.filterNews(menuItems);

            return (
                <div className={"content-container"}>
                    <Switch>
                        <Route key={homePage.title} path={homePage.path} exact component={homePage.component}/>

                        {contentsFiltered.map((elem, index) => {
                            return <Route key={index} path={elem.path} exact component={elem.component}/>;
                        })}

                        {newsFiltered.map((elem, index) => {
                            return (
                                <Route key={index} path={elem.path} exact>
                                    <NewsPage newsInfo={elem}/>
                                </Route>
                            )
                        })}

                        {additionalPagesFiltered.map((page, index) => {
                            return (
                                <Route key={index} path={page.acf.path} exact>
                                    <AdditionalPage page={page}/>
                                </Route>
                            );
                        })}

                        <Route path={"/"} component={ErrorNotFound}/>
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className={"content-container"}>
                    <Switch>
                        <Route key={homePage.title} path={homePage.path} exact component={homePage.component}/>
                        <Route path={"/"} component={ErrorNotFound}/>
                    </Switch>
                </div>
            );
        }
    }
}