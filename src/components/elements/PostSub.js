import React, {Component} from "react";
import Moment from "react-moment";
import "moment/locale/pl";
import PropTypes from "prop-types";
import "../../config";
import axios from "axios";

import Attachment from "./Attachment"
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {Link} from "react-router-dom";

export class PostSub extends Component {
    state = {
        isExpanded: false,
        isMobile: false,
        mobileHeight: 420 + "px",
        descHeight: 210 + "px",
        shortHeight: 210 + "px",
        expandedHeight: 1000 + "px",
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

        if (document.body.offsetWidth <= 636){
            textHeight += 220;
        } else {
            textHeight += 40;
        }

        this.setState({
            expandedHeight: textHeight + "px",
            isExpanded: !this.state.isExpanded
        });
    }

    updateHeight(){
        if (document.body.offsetWidth <= 636){
            this.setState({
                shortHeight: this.state.mobileHeight
            })
        } else {
            this.setState({
                shortHeight: this.state.descHeight
            })
        }
    }

    componentDidMount() {
        const {image_gallery} = this.props.gallery;

        if (image_gallery !== null){
            let galleryArray = image_gallery.split(",");

            if(galleryArray.length !== 0) {
                let getGalleryArray = [];
                let galleryImages = [];

                galleryArray.forEach(elem => {
                    getGalleryArray.push(axios.get(global.config.proxy + "/wp-json/wp/v2/media/" + elem));
                })

                axios.all(getGalleryArray).then(axios.spread((...responses) => {
                    responses.forEach(elem => {
                        galleryImages.push(elem.data);
                    })
                    this.setState({
                        gallery: galleryImages,
                        isGalleryLoaded: true,
                        isLoaded: true
                    })
                })).catch(err => console.log(err));
            }
        }
        this.updateHeight();
    }

    render() {
        const {id, title, slug, date, acf} = this.props.post;
        const {text, attachments} = acf;
        const {isExpanded, shortHeight, expandedHeight, isGalleryLoaded, gallery, isLoaded} = this.state;

        const {postNr} = this.props;
        const postDirection = postNr%2;

        // window.addEventListener('resize', this.updateHeight.bind(this));

        let images = [];
        gallery.forEach(elem => {
            images.push({
                fullscreen: elem.media_details.sizes.full.source_url,
                original: elem.media_details.sizes.medium.source_url,
                thumbnail: elem.media_details.sizes.thumbnail.source_url
            })
        })

        if(isLoaded) {
            return (
                <div className={"post " + (postDirection ? "post-left" : "post-right")} style={isExpanded? {maxHeight: expandedHeight} : {maxHeight: shortHeight} }>
                    <div className={"post-image-container"}>
                        <ImageGallery items={images} additionalClass={images.length === 1 ? "single" : ""} useBrowserFullscreen={false}/>
                    </div>

                    <div className={"post-content-container"} id={id}>
                        <div>
                            <Link to={"/aktualnosci/" + id + "/" + slug}><h2 className={"post-title"}>{title.rendered}</h2></Link>
                            <small className={"post-date"}>
                                <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                            </small>
                            <div className={"post-text"}>
                                <div dangerouslySetInnerHTML={{ __html: text}}/>
                                <div>
                                    {
                                        attachments !== undefined ?
                                            attachments.map(att => {
                                                if (att) return <Attachment key={att.attachment.id}
                                                                            className={"post-attachment"}
                                                                            title={att.attachment.title}
                                                                            url={att.attachment.url}/>
                                                else return "";
                                            }) : ""
                                    }
                                </div>
                                <div className={"after"} style={isExpanded? {opacity:"0"} : {opacity:"1"}} />
                            </div>
                        </div>
                    </div>
                    <button className={"post-button button-accent-2"}
                            onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                    </button>
                </div>
            );
        }
        return ""
    }
}

export default PostSub;