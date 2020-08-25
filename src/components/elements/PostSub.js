import React, {Component} from "react";
import Moment from "react-moment";
import WindowSizeListener from 'react-window-size-listener'
import {Link} from "react-router-dom";
import "moment/locale/pl";
import PropTypes from "prop-types";
import "../../config";
import axios from "axios";

import Attachment from "./Attachment"
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export class PostSub extends Component {
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
        isLoaded: false
    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        postNr: PropTypes.number
    }

    extendButtonClick(){
        let textHeight = document.getElementById(this.props.post.id).scrollHeight;

        if (document.body.offsetWidth <= this.state.mobileMaxWidth){
            textHeight += 350;
        } else {
            textHeight += 40;
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

    // componentDidMount() {
    //     const {image_gallery} = this.props.gallery;
    //
    //     if (image_gallery !== null){
    //         let galleryArray = image_gallery.split(",");
    //
    //         if(galleryArray.length !== 0) {
    //             let getGalleryArray = [];
    //             let galleryImages = [];
    //
    //             galleryArray.forEach(elem => {
    //                 getGalleryArray.push(axios.get(global.config.proxy + "/wp-json/wp/v2/media/" + elem));
    //             })
    //
    //             axios.all(getGalleryArray).then(axios.spread((...responses) => {
    //                 responses.forEach(elem => {
    //                     galleryImages.push(elem.data);
    //                 })
    //                 this.setState({
    //                     gallery: galleryImages,
    //                     isGalleryLoaded: true,
    //                     isLoaded: true
    //                 })
    //             })).catch(err => console.log(err));
    //         }
    //     }
    //     this.updateDimensions();
    // }

    render() {
        const {id, title, slug, date, acf} = this.props.post;
        const {text, image_gallery, attachments} = acf;
        const {isExpanded, shortHeight, expandedHeight, contentWidth} = this.state;

        const {postNr} = this.props;
        const postDirection = postNr%2;

        console.log(image_gallery);

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

        // if(isLoaded) {
            return (
                <WindowSizeListener
                    onResize={(windowSize) => {
                        this.updateDimensions(windowSize.windowWidth)
                    }}>
                <div className={"post " + (postDirection ? "post-left" : "post-right")} style={isExpanded? {maxHeight: expandedHeight} : {maxHeight: shortHeight} }>
                    <div className={"post-image-container"}>
                        <ImageGallery items={images} additionalClass={images.length === 1 ? "single" : ""} useBrowserFullscreen={false}/>
                    </div>

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
                                            attachments.map(att => {
                                                if (att) return <Attachment key={att.attachment.id}
                                                                            className={"post-attachment"}
                                                                            title={att.attachment.title}
                                                                            url={att.attachment.url}/>
                                                else return "";
                                            }) : ""
                                    }
                                </div>
                                <div className={"after"} style={isExpanded? {opacity:"0", width: contentWidth} : {opacity:"1", width: contentWidth} } />
                            </div>
                        </div>
                    </div>
                    <button className={"post-button button-accent-2"}
                            onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                    </button>
                </div>
                </WindowSizeListener>
            );
        // }
        // return <div className={"post post-empty"}/>
    }
}

export default PostSub;