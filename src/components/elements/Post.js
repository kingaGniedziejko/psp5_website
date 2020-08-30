import React, {Component} from "react";
import Moment from "react-moment";
import WindowSizeListener from "react-window-size-listener";
import {Link} from "react-router-dom";
import VizSensor from 'react-visibility-sensor';
import "moment/locale/pl";
import PropTypes from "prop-types";
import "../../config";
import AttachedLink from "./Link";
import Attachment from "./Attachment";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export class Post extends Component {
    state = {
        isExpanded: false,
        isMobile: false,
        mobileMaxWidth: 636,
        mobileHeight: 490 + "px",
        descHeight: 215 + "px",
        shortHeight: 215 + "px",
        expandedHeight: 1000 + "px",
        contentWidth: 68 + "%",
        isGalleryLoaded: false,
        gallery: [],
        isLoaded: false,
        isTopVisible: false
    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        postNr: PropTypes.number
    }

    extendButtonClick(){
        let textHeight = document.getElementById(this.props.post.id).scrollHeight;

        if (document.body.offsetWidth <= this.state.mobileMaxWidth){
            textHeight += 240;
        } else {
            textHeight += 40;
        }

        console.log(document.getElementById("post-" + this.props.post.id).scrollTop);

        if (this.state.isExpanded){
            if (!this.state.isTopVisible) {
                // setTimeout()
                window.scrollBy({
                    top: (textHeight - this.state.shortHeight.slice(0, -2)) * (-1),
                    behavior: 'smooth'
                });
            }
        }

        this.setState({
            expandedHeight: textHeight + "px",
            isExpanded: !this.state.isExpanded
        });
    }

    updateDimensions(windowWidth){
        let shortHeight;

        if (windowWidth <= this.state.mobileMaxWidth){
            shortHeight = this.state.mobileHeight;
        } else {
            shortHeight = this.state.descHeight;
        }

        this.setState({
            shortHeight: shortHeight,
            contentWidth: document.getElementById(this.props.post.id) !== null ?
                (document.getElementById(this.props.post.id).offsetWidth + 2) + "px"
                : 68 + "%"
        })
    }

    render() {
        const {id, title, slug, date, acf} = this.props.post;
        const {text, image_gallery, attachments, links} = acf;
        const {isExpanded, shortHeight, expandedHeight, contentWidth} = this.state;

        const {postNr} = this.props;
        const postDirection = postNr%2;

        let images = [];

        if (image_gallery !== undefined) {
            image_gallery.forEach(elem => {
                if (elem.image) {
                    images.push({
                        fullscreen: elem.image.url,
                        original: elem.image.url,
                        thumbnail: elem.image.sizes.thumbnail
                    })
                }
            })
        }

        return (
            <WindowSizeListener
                onResize={(windowSize) => {
                    this.updateDimensions(windowSize.windowWidth)
                }}>
                <div className={"post " + (postDirection ? "post-left" : "post-right")}
                     id={"post-" + id}
                     style={isExpanded? {maxHeight: expandedHeight} : {maxHeight: shortHeight} }>
                    <VizSensor
                        onChange={(isVisible) => {
                            this.setState({isTopVisible: isVisible})
                        }}>
                        <div className={"post-image-container"}>
                            <ImageGallery items={images} additionalClass={images.length === 1 ? "single" : ""} useBrowserFullscreen={false}/>
                        </div>
                    </VizSensor>

                    <div className={"post-content-container"} id={id}>
                        <div>
                            <Link to={"/aktualnosci/" + id + "/" + slug}><h2 className={"post-title"} dangerouslySetInnerHTML={{__html: title.rendered}}/></Link>
                            <small className={"post-date"}>
                                <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                            </small>
                            <div className={"post-text" + (isExpanded? "" : " disabled-content")}>
                                <div dangerouslySetInnerHTML={{ __html: text}}/>
                                <div>
                                    {
                                        attachments !== undefined && attachments !== false ?
                                            attachments.map((att, index) => {
                                                if (att && att.attachment !== "") return <Attachment key={index}
                                                                            className={"post-attachment"}
                                                                            title={att.attachment.title}
                                                                            url={att.attachment.url}/>
                                                else return "";
                                            }) : ""
                                    }
                                    {
                                        links !== undefined && links !== false ?
                                            links.map((link, index) => {
                                                if (link && link.link !== "") return <AttachedLink key={index}
                                                                       title={link.link.title}
                                                                       url={link.link.url}/>
                                                else return "";
                                            }) : ""
                                    }
                                </div>
                                <div className={"after"} style={isExpanded? {opacity:"0", width: contentWidth} : {opacity:"1", width: contentWidth} } />
                            </div>
                        </div>
                    </div>
                    {/*{isExpanded?*/}
                    {/*    <AnchorLink offset={110} href={"#post-" + id}>*/}
                    {/*        <button className={"post-button button-accent-2"}*/}
                    {/*                onClick={this.extendButtonClick.bind(this)}>mniej</button>*/}
                    {/*    </AnchorLink>*/}
                    {/*    :*/}
                    {/*    <button className={"post-button button-accent-2"}*/}
                    {/*        onClick={this.extendButtonClick.bind(this)}>więcej</button>*/}
                    {/*}*/}

                    <button className={"post-button button-accent-2"}
                            onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                    </button>
                </div>
            </WindowSizeListener>
        );
    }
}

export default Post;