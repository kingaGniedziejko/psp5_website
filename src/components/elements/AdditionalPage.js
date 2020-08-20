import React, {Component} from "react";
import Helmet from "react-helmet";
import SectionImage from "./SectionImage";
import Attachment from "./Attachment";
import "../../styles/additional_page_style.css"

export class AdditionalPage extends Component {

    render() {
        const sections = this.props.page.acf.sections;

        const sectionImage = (section) => {
            if(section.section_image)
                return (
                    <SectionImage image={section.section_image} />
                )
        }

        const modules = (modules) => {
            let key = 0
            return (
                modules.map((module) => {
                    if (module)
                        return (
                            <div key={key++}>
                                <h1 dangerouslySetInnerHTML={{__html: module.header}}/>
                                <div dangerouslySetInnerHTML={{__html: module.text}}/>
                            </div>
                        )
                })
            )
        }

        const attachments = (attachments) => {
            return (
                <div className={"attachments"}>
                    {
                        attachments.map((attachment) => {
                        if (attachment)
                            return (
                                <Attachment key={attachment.attachment.id} className={"attachment"}
                                            title={attachment.attachment.title} url={attachment.attachment.url}/>
                            )
                        })
                    }
                </div>

            )
        }

        const links = (links) => {
            return (
                links.map((link) => {
                    if (link)
                        return (
                            <div></div>
                            // <Link key={link.link.id} className={"attachment"} title={link.link.title} url={link.link.url}/>
                        )
                })
            )
        }

        const column = (column) => {
            if(column.config.toString() === "text") {
                return (
                    <div>
                        {content(column)}
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <img src={column.image.url} alt={column.image.alt}/>
                    </div>
                )
            }
        }

        const content = (content) => {
            return(
                <div className={"text-container"}>
                    {content.modules ? modules(content.modules) : ""}
                    {content.attachments ? attachments(content.attachments) : ""}
                    {content.links ? links(content.links) : ""}
                </div>

            )
        }

        const sectionContent = (section) => {
            if(section.config.layout.toString() === "one_column") {
                return (
                    <div className={"one-column"}>
                        {content(section.one_column_content)}
                    </div>
                )
            } else {
                return (
                    <div className={`two-column ${columnClass(section.two_column_content)}`}>
                        {column(section.two_column_content.left_column)}
                        {column(section.two_column_content.right_column)}
                    </div>
                )
            }

        }

        const columnClass = (content) => {
            let classNames = "";
            if(content.left_column.config.toString() === "text" && content.left_column.config.toString() === "text") {
                classNames += "text-text"
            }

            return classNames
        }



        let key = 0

        return (
            <div>
                {
                    sections.map(section => {
                            return (
                                <section key={key++} className={section.config.background}>
                                    {sectionImage(section)}
                                    <div className={"section-content"}>
                                        {sectionContent(section)}
                                    </div>
                                </section>
                            )
                        }
                    )
                }
            </div>
        );
    }
}

export default AdditionalPage;