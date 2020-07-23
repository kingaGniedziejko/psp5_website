import React, {Component} from "react";
import Attachment from "./Attachment"

import Moment from "react-moment";
import "moment/locale/pl";
import PropTypes from "prop-types";
import axios from "axios";

export class Post extends Component {
    state = {
        imgUrl: '',
        isLoaded: false,
        isExpanded: false,
        excerptLength: 190
    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        postNr: PropTypes.number
    }

    componentDidMount() {
        const {featured_media} = this.props.post;
        axios.get(`/wp-json/wp/v2/media/${featured_media}`)
            .then(res => this.setState({
                imgUrl: res.data.media_details.sizes.full.source_url,
                isLoaded: true,
                isExpanded: false
            }));
    }

    extendButtonClick(){
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const {title, date, content, acf} = this.props.post;
        const {postNr} = this.props;
        const excerpt = content.rendered.substring(0, this.state.excerptLength)+"...";
        const {imgUrl, isLoaded, isExpanded} = this.state;
        const attachments = [
            acf.attachment1,
            acf.attachment2,
            acf.attachment3,
            acf.attachment4,
            acf.attachment5
        ];
        const postDirection = postNr%2;

        if (isLoaded){
            return (
                <div className={"post " + (postDirection ? "post-left" : "post-right")}>
                    <div>
                        <img src={imgUrl} alt={title.rendered}/>
                        { isExpanded ? <div>
                            { attachments.map(att => {
                                if (att) return <Attachment key={att.id} className={"post-attachment"} title={att.title} url={att.url}/>
                            })}
                        </div> : "" }
                    </div>
                    <div>
                        <h2 className={"post-title"}>{title.rendered}</h2>
                        <small className={"post-date"}>
                            <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                        </small>
                        <p className={"post-text"} dangerouslySetInnerHTML={{ __html: isExpanded ? content.rendered : excerpt}} />
                        <button className={"post-button button-accent-2"}
                                onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default Post;