import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import {Link} from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";


export class MCard extends Component {
    state = {
        title: "mLegitymacja",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=mcard"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {

        if(this.state.isLoaded) {
            const sections = this.state.content.sections

            const photo = sections[0].images[0].url

            const h = sections[0].lonely_headers[0].text

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo})`}}/>

                        <div className={"section-container"} id={""}>
                            <div dangerouslySetInnerHTML={{__html: h}}/>
                        </div>


                    </div>



                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default MCard;