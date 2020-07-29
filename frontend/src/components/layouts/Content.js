import React, {Component} from "react";
import {Route} from 'react-router-dom';
import "../../styles/content_style.css"

import HomePage from "../contents/HomePage";
import SwimmingPool from "../contents/about_school/SwimmingPool";

export class Content extends Component {
    state = {
        postCount: 3,
        contents: [
            {
                name: "strona główna",
                path: "/",
                component: HomePage
            },
            {
                name: "basen",
                path: "/o-szkole/basen",
                component: SwimmingPool
            }
        ]
    }

    render() {
        return (
            <div className={"content-container"}>
                {this.state.contents.map(elem => {
                    return <Route key={elem.name} path={elem.path} exact component={elem.component} />;
                })}
            </div>
        );
    }
}