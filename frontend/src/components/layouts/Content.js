import React, {Component} from "react";
import { BrowserRouter, Route} from 'react-router-dom';
import "../../styles/content_style.css"
import HomePage from "../contents/HomePage";

export class Content extends Component {
    state = {
        postCount: 3,
        contents: [
            {
                name: "strona główna",
                path: "/",
                isExact: true,
                component: HomePage
            }
        ]
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {this.state.contents.map(elem => {
                        return <Route path={elem.path} {... elem.isExact ? "exact" : ""} component={elem.component} />;
                    })}
                </div>
            </BrowserRouter>
        );
    }
}