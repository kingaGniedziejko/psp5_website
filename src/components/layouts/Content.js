import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';
import axios from "axios";
import '../../config';
import "../../styles/content_style.css"

import ErrorNotFound from "../elements/ErrorNotFound";
import HomePage from "../contents/HomePage";
import Contact from "../contents/Contact";
import SwimmingPool from "../contents/about_school/SwimmingPool";
import Documents from "../contents/about_school/Documents";
import Canteen from "../contents/about_school/Canteen";
import Calendar from "../contents/student/Calendar";
import NewsPage from "../contents/news/NewsPage";
import News from "../contents/news/News";
import MenuPage from "../elements/MenuPage";
import PostPage from "../elements/PostPage";
import Walk from "../contents/about_school/Walk";
import PageContent from "../elements/PageContent";
import Spinner from "../elements/Spinner";

export class Content extends Component {
    state = {
        contents: [
            {
                path: "/strona-glowna/",
                component: HomePage
            },
            {
                path: "/aktualności/",
                component: News,
                type: "other"
            },
            {
                path: "/o-szkole/basen/",
                component: SwimmingPool
            },
            {
                path: "/kontakt/",
                component: Contact
            },
            {
                path: "/o-szkole/dokumenty/",
                component: Documents
            },
            {
                path: "/o-szkole/spacer-po-szkole/",
                component: Walk
            },
            {
                path: "/uczen/kalendarz/",
                component: Calendar
            },
            {
                path: "/o-szkole/stolowka/",
                component: Canteen
            },
        ],
        news: [],
        pages: [],
        isPagesLoaded: false
    }

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
    }

    separateSubmenuMenuItems() {
        const {menuItems} = global.config;
        let allItems = [];

        menuItems.forEach(menuItem => {
            const {child_items} = menuItem;

            if (child_items !== undefined) {
                allItems = allItems.concat(child_items);
            } else {
                allItems.push(menuItem);
            }
        });

        return allItems;
    }

    // filterPages(menuItems) {
    //     const {pages} = this.state;
    //
    //     //filter - pages only in menu
    //     // return additionalPages.filter(elem => menuItems.some(item => item.url.toLowerCase() === elem.acf.path.toLowerCase()));
    //
    //     return pages;
    // }

    // filterLinkedPages(menuItems) {
    //     return menuItems.filter(elem => this.isValidUrl(elem.url) && elem.object === "custom");
    // }

    // filterContents(menuItems) {
    //     const {contents} = this.state;
    //     let filteredContents;
    //
    //
    //
    //     // filteredContents = menuItems.filter(item => contents.find(content => content.path === (new URL(item.url)).pathname))
    //
    //     // filteredContents = contents.filter(elem => menuItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()));
    //     // filteredContents.forEach(elem => {
    //     //     elem.path = menuItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
    //     // });
    //     // filteredContents = filteredContents.filter(elem => !(pagesFiltered.some(item => item.acf.path.toLowerCase() === elem.path.toLowerCase())));
    //     // filteredContents = filteredContents.filter(elem => !linkedPagesFiltered.some(item => item.url === elem.url))
    //
    //     return filteredContents;
    // }

    loadContents() {
        const {contents, pages} = this.state;
        let filteredContents = [];
        let filteredPages = pages;

        contents.forEach(content => {
            if (content.type === undefined) {
                content.page = pages.find(page => (new URL(page.link)).pathname === content.path);

                let index = filteredPages.indexOf(content.page);
                if (index !== -1) filteredPages.splice(index, 1);
            }

            filteredContents.push(content);
        });

        return [filteredPages, filteredContents];
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

    createMenuPages() {
        const {menuItems} = global.config;
        let menuPages = [];

        menuItems.forEach(item => {
            if (item.child_items !== undefined) {
                if (item.child_items.length !== 0) {
                    menuPages.push(item);
                }
            }
        });
        return menuPages;
    }

    componentDidMount() {
        axios.get( global.config.proxy + "/wp-json/wp/v2/subpages?per_page=100")
            .then(res => this.setState({
                pages: res.data,
                isPagesLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {isPagesLoaded, pages} = this.state;

        if (isPagesLoaded) {
            const menuItems = this.separateSubmenuMenuItems();

            const [loadedPages, loadedContents] = this.loadContents();
            const menuPages = this.createMenuPages();
            const newsPages = this.filterNews(menuItems);

            return (
                <div className={"content-container"}>
                    <Switch>

                        {loadedContents.map((elem, index) => {
                            if (elem.type !== "other")
                                return (
                                    <Route key={index} path={elem.path} exact>
                                        <elem.component page={elem.page}/>
                                    </Route>
                                );
                            else
                                return <Route key={index} path={elem.path} exact component={elem.component}/>
                        })}

                        {loadedPages.map((page, index) => {
                            return (
                                <Route key={index} path={(new URL(page.link)).pathname} exact>
                                    <PageContent page={page}/>
                                </Route>
                            );
                        })}

                        {menuPages.map((elem, index) => {
                            if (!loadedContents.some(element => element.path === elem.url)) {
                                return (
                                    <Route key={index} path={elem.url} exact>
                                        <MenuPage menuItem={elem}/>
                                    </Route>
                                )
                            }
                            return "";
                        })}

                        {newsPages.map((elem, index) => {
                            return (
                                <Route key={index} path={elem.path} exact>
                                    <NewsPage newsInfo={elem}/>
                                </Route>
                            )
                        })}


                        <Route path="/aktualnosci/:newsID/:newsSlug" component={PostPage}/>
                        <Route path={"/"} component={ErrorNotFound}/>
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className={"content-container"}>
                    <Spinner/>
                </div>
            );
        }
    }
}