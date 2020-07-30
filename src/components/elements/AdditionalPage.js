import React, {Component} from "react";
// import axios from "axios";

export class AdditionalPage extends Component {
    // state = {
    //
    // }

    // componentDidMount() {
    //     const {page} = this.props;
    //
    //
    // }

    render() {
        const {page} = this.props;

        return (
            <div className={"content"}>
                <div className={"photo photo-1"}/>
                <h1>{page}</h1>
                <div></div>

                <div className={"photo photo-2"}/>
                <h1></h1>
                <div></div>
            </div>
        );
    }
}

export default AdditionalPage;