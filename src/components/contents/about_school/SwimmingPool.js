import React, {Component} from "react";
import Helmet from "react-helmet";

export class SwimmingPool extends Component {
    state = {
        title: "Basen"
    }

    render() {
        const {title} = this.state;

        return (
            <div className={"content"}>
                <Helmet>
                    <title>{global.config.mainTitle + " " + title}</title>
                </Helmet>
                <h1>{title}</h1>
            </div>
        );
    }
}

export default SwimmingPool;