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
import ParentsCouncil from "../contents/parent/ParentsCouncil";
import ParentsMeetings from "../contents/parent/ParentsMeetings";
import MenuPage from "../elements/MenuPage";
import PostPage from "../elements/PostPage";
import Walk from "../contents/about_school/Walk";
import PageContent from "../elements/PageContent";

export class Content extends Component {
    state = {
        // homePage: {
        //     title: "strona główna",
        //     path: "/strona-glowna/",
        //     component: HomePage
        // },
        news: [],
        contents: [
            {
                title: "aktualności",
                component: News
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
                path: "/rodzic/rada-rodzicow/",
                component: ParentsCouncil
            },
            {
                path: "/rodzic/spotkania-z-rodzicami/",
                component: ParentsMeetings
            },
            {
                path: "/o-szkole/stolowka/",
                component: Canteen
            },
        ],
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
        const {menuItems} = this.props;
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

    filterPages(menuItems) {
        const {pages} = this.state;

        //filter - pages only in menu
        // return additionalPages.filter(elem => menuItems.some(item => item.url.toLowerCase() === elem.acf.path.toLowerCase()));

        return pages;
    }

    filterLinkedPages(menuItems) {
        return menuItems.filter(elem => this.isValidUrl(elem.url) && elem.object === "custom")
    }

    filterContents(menuItems) {
        const {contents} = this.state;
        let filteredContents;

        filteredContents = menuItems.filter(item => contents.find(content => content.path === (new URL(item.url)).pathname))

        // filteredContents = contents.filter(elem => menuItems.some(item => item.title.toLowerCase() === elem.title.toLowerCase()));
        // filteredContents.forEach(elem => {
        //     elem.path = menuItems.filter((item => item.title.toLowerCase() === elem.title.toLowerCase()))[0].url;
        // });
        // filteredContents = filteredContents.filter(elem => !(pagesFiltered.some(item => item.acf.path.toLowerCase() === elem.path.toLowerCase())));
        // filteredContents = filteredContents.filter(elem => !linkedPagesFiltered.some(item => item.url === elem.url))

        return filteredContents;
    }

    // filterNews(menuItems) {
    //     let filteredNews = [];
    //
    //     menuItems.forEach(item => {
    //         if (item.object === "category"){
    //             filteredNews.push({
    //                 title: item.title,
    //                 path: "/aktualnosci/" + item.slug,
    //                 postCategory: item.slug,
    //                 postsCount: -1
    //             })
    //         }
    //     });
    //     return filteredNews;
    // }

    // createMenuPages() {
    //     const {menuItems} = global.config;
    //     let menuPages = [];
    //
    //     menuItems.forEach(item => {
    //         if (item.child_items !== undefined) {
    //             if (item.child_items.length !== 0) {
    //                 menuPages.push(item);
    //             }
    //         }
    //     });
    //     return menuPages;
    // }

    componentDidMount() {
        axios.get( global.config.proxy + "/wp-json/wp/v2/subpages")
            .then(res => this.setState({
                pages: res.data,
                isPagesLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {homePage, isPagesLoaded, contents, pages} = this.state;

        if (isPagesLoaded) {
            const menuItems = this.separateSubmenuMenuItems();
            // const additionalPagesFiltered = this.filterAdditionalPages(menuItems);
            // const linkedPagesFiltered = this.filterLinkedPages(menuItems);
            const contentsFiltered = this.filterContents(menuItems);
            console.log(contentsFiltered)
            // const pagesFiltered = menuItems.filter(contentsFiltered)
            // const newsFiltered = this.filterNews(menuItems);
            // const menuPages = this.createMenuPages();
            return (
                <div className={"content-container"}>
                    <Switch>
                        {/*<Route key={homePage.title} path={homePage.link} exact component={homePage.component}/>*/}

                        {pages.map((page, index) => {
                            return (
                                <Route key={index} path={(new URL(page.link)).pathname} exact>
                                    <PageContent page={page}/>
                                </Route>
                            );
                        })}

                        {/*{contentsFiltered.map((elem, index) => {*/}
                        {/*    return <Route key={index} path={elem.path} exact component={elem.component}/>;*/}
                        {/*})}*/}

                        {/*{newsFiltered.map((elem, index) => {*/}
                        {/*    return (*/}
                        {/*        <Route key={index} path={elem.path} exact>*/}
                        {/*            <NewsPage newsInfo={elem}/>*/}
                        {/*        </Route>*/}
                        {/*    )*/}
                        {/*})}*/}



                        {/*{menuPages.map((elem, index) => {*/}
                        {/*    if (contents.some(element => element.title.toLowerCase() === elem.title.toLowerCase())) {*/}
                        {/*        var customElem = contents.find(contentElem => contentElem.title.toLowerCase() === elem.title.toLowerCase());*/}
                        {/*        return <Route key={index} path={elem.url} exact component={customElem.component}/>;*/}
                        {/*    } else {*/}
                        {/*        return (*/}
                        {/*            <Route key={index} path={elem.url} exact>*/}
                        {/*                <MenuPage menuItem={elem}/>*/}
                        {/*            </Route>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*})}*/}

                        <Route path="/aktualnosci/:newsID/:newsSlug" component={PostPage}/>
                        <Route path={"/"} component={ErrorNotFound}/>
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className={"content-container"}>
                    {/*<Switch>*/}
                    {/*    <Route key={homePage.title} path={homePage.path} exact component={homePage.component}/>*/}
                    {/*</Switch>*/}
                </div>
            );
        }
    }
}