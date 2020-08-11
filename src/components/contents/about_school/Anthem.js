import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";
import Helmet from "react-helmet";


export class Anthem extends Component {
    state = {
        title: "Hymn szkoły",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=anthem"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const photo1 = this.state.content.photo_1 !== undefined ? this.state.content.photo_1 : "";

        // hymn szkoły
        const hAnthem = this.state.content.header_1 !== undefined ? this.state.content.header_1 : "";
        const tAnthem = this.state.content.text_1 !== undefined ? this.state.content.text_1 : "";

        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>

                        <div className={"section-container centered"}>
                            <h1 dangerouslySetInnerHTML={{__html: hAnthem}}/>
                            <div dangerouslySetInnerHTML={{__html: tAnthem}}/>
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

export default Anthem;