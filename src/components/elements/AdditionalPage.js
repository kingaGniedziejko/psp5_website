import React, {Component} from "react";
import Helmet from "react-helmet";
import SectionImage from "./SectionImage";

export class AdditionalPage extends Component {

    render() {
        // const {image1, title1, text1, image2, title2, text2} = this.props.page.acf;

        const sections = this.props.page.acf.sections;

        const sectionImage = (section) => {
            if(section.section_image)
                return (
                    <SectionImage image={section.section_image} />
                )
        }

        const content = (section) => {
            if(section.config.layout === "centered")
                section.one_column_content.modules.map( module => {
                    if(module)
                        return (
                            <div>
                                <h1 dangerouslySetInnerHTML={{__html: module.header}}/>
                                <div dangerouslySetInnerHTML={{__html: module.text}}/>
                            </div>
                        )
                })

        }

        let key = 0

        return (
            <div>
                {
                    sections.map(section => {
                            return (
                                <div className={"section"} key={key++}>
                                    {sectionImage(section)}
                                    <div className={"section-container"}>
                                        {content(section)}
                                    </div>
                                </div>
                            )
                        }
                    )
                }





                {/*<Helmet>*/}
                {/*    <title>{global.config.mainTitle + " " + title1}</title>*/}
                {/*</Helmet>*/}
                {/*<div className={"section section-1"}>*/}
                {/*    <div className={"photo photo-1"} style={{backgroundImage: `url(${image1.url})`}}/>*/}
                {/*    <h1>{title1}</h1>*/}
                {/*    <div dangerouslySetInnerHTML={{__html: text1}}></div>*/}
                {/*</div>*/}

                {/*{image2 ? (*/}
                {/*    <div className={"section section-2"}>*/}
                {/*        <div className={"photo photo-2"} style={{backgroundImage: `url(${image2.url})`}}/>*/}
                {/*        <h1>{title2}</h1>*/}
                {/*        <div dangerouslySetInnerHTML={{__html: text2}}></div>*/}
                {/*    </div>*/}
                {/*    ): ""*/}
                {/*}*/}




            </div>
        );
    }
}

export default AdditionalPage;