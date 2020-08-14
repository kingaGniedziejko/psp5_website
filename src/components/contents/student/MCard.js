import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import {Link} from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";
import Attachment from "../../elements/Attachment";
import SectionImage from "../../elements/SectionImage";


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

            const photo = sections[0].images[0].image

            // mLegitymacja
            const hCard = sections[0].modules[0].header
            const tCard = sections[0].modules[0].text

            // podstawa do zniżek
            const hDiscount = sections[0].modules[1].header
            const tDiscount = sections[0].modules[1].text

            // zasady wydawania
            const hRules = sections[0].modules[2].header
            const tRules = sections[0].modules[2].text

            const tSteps = sections[0].modules[3].text

            const attachments = sections[0].attachments


            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <SectionImage image={photo}/>

                        <h1 dangerouslySetInnerHTML={{__html: hCard}}/>

                        <div className={"section-container multicolumn justified"}>

                            <div>
                                <div dangerouslySetInnerHTML={{__html: tCard}}/>
                            </div>


                        </div>
                    </div>
                    <div className={"section grey"}>
                        <h1 dangerouslySetInnerHTML={{__html: hDiscount}}/>

                        <div className={"section-container multicolumn justified"} >
                            <div dangerouslySetInnerHTML={{__html: tDiscount}}/>
                        </div>

                    </div>


                    <div className={"section"}>

                        <div className={"section-container"}>

                            <div className={"centered"}>
                                <h1 dangerouslySetInnerHTML={{__html: hRules}}/>
                            </div>

                            <div className={"multicolumn wide justified"}>
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: tRules}}/>
                                </div>
                                <div>
                                    <div dangerouslySetInnerHTML={{__html: tSteps}}/>
                                    <div>
                                        {
                                            attachments.map(att => {
                                                if (att) return <Attachment key={att.file.id} className={"attachment"} title={att.file.title} url={att.file.url}/>
                                                else return "";
                                            })
                                        }
                                    </div>

                                </div>
                            </div>



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