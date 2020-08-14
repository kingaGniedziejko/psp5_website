import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";


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


        if(this.state.isLoaded) {
            const sections = this.state.content.sections

            const photo = sections[0].images[0].image

            // hymn szkoły szkolnej
            const hAnthem = sections[0].modules[0].header
            const tAnthem = sections[0].modules[0].text

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo}/>
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