import React, {Component} from "react";
import Helmet from "react-helmet";
import SectionImage from "./SectionImage";
import Attachment from "./Attachment";
import Link from "./Link";
import "../../styles/additional_page_style.css"
import PostDisplay from "./PostDisplay";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export class AdditionalPage extends Component {

    render() {
        const sections = this.props.page.acf.sections;
        const hasPostDisplay = this.props.page.acf.has_post_display;

        const sectionImage = (section) => {
            if(section.section_image && section.section_image !== "")
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
                attachments.map((attachment) => {
                    if (attachment && attachment.attachment !== "")
                        return (
                            <Attachment key={attachment.attachment.id} className={"attachment"}
                                        title={attachment.attachment.title} url={attachment.attachment.url}/>
                        )
                })
            )
        }

        const links = (links) => {
            let key = 0
            return (
                links.map((link) => {
                    if (link && link.link !== "")
                        return (
                            <Link key={key++} className={"attachment"} title={link.link.title} url={link.link.url}/>
                        )
                })
            )
        }

        const gallery = (gallery) => {
            if(gallery)
                if(gallery.length !== 0)
                {
                    let images = []
                    gallery.map(image => {
                        images.push({
                            fullscreen: image.image.url,
                            original: image.image.sizes.large,
                            thumbnail: image.image.sizes.thumbnail
                        })
                    })

                    return (
                        <div className={"center"}>
                            <ImageGallery items={images}
                                          additionalClass={images.length === 1 ? "single" : ""}
                                          useBrowserFullscreen={false}/>
                        </div>

                    )
                }

        }

        const column = (column) => {
            if(column.config.toString() === "text") {
                return (
                    <div>
                        {content(column)}
                    </div>
                )
            }
            else if(column.config.toString() === "image") {
                return (
                    <div className={"center"}>
                        <img src={column.image.url} alt={column.image.alt}/>
                    </div>
                )
            }
            else if(column.config.toString() === "gallery") {
                return (
                    gallery(column.gallery)
                )
            }
        }

        const content = (content) => {
            return(
                <div className={"text-container"}>
                    {content.modules ? modules(content.modules) : ""}
                    {gallery(content.gallery)}
                    <div className={"additions"}>
                        {content.attachments ? attachments(content.attachments) : ""}
                        {content.links ? links(content.links) : ""}
                    </div>
                </div>

            )
        }

        const sectionContent = (section) => {
            if(section.config.layout.toString() === "one_column") {
                console.log("tu")
                console.log(section.config.formatting.map(att => att))
                return (
                    <div className={`one-column ${section.config.formatting.toString().replace(',',' ')}`}>
                        {content(section.one_column_content)}
                    </div>
                )
            }
            if(section.config.layout.toString() === "two_column") {
                return (
                    <div className={`two-column ${columnClass(section.two_column_content)} ${section.config.formatting.toString().replace(',',' ')}`}>
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

        if(sections)
            return (
                <div>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.props.page.title.rendered}</title>
                    </Helmet>
                    {
                        sections.map((section, index) => {
                                return (
                                    <section key={index} className={section.config.background + " " + (index === 0 && !section.section_image ? "photoless-content" : "")}>
                                        {sectionImage(section)}
                                        <div className={"section-content"}>
                                            {sectionContent(section)}
                                        </div>
                                    </section>
                                )
                            }
                        )
                    }
                    {
                        hasPostDisplay !== undefined && hasPostDisplay ?
                            <section>
                                <h1 dangerouslySetInnerHTML={{__html: this.props.page.acf.posts.header}}/>
                                <PostDisplay postCategories={[this.props.page.acf.posts.post_category.slug]} postsCount={3} />
                            </section>
                         : ""
                    }

                </div>
            );
        return ""
    }
}

export default AdditionalPage;