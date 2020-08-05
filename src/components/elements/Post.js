import React, {Component} from "react";
import Moment from "react-moment";
import "moment/locale/pl";
import PropTypes from "prop-types";
import "../../config";

import Attachment from "./Attachment"
import {CSSTransition} from "react-transition-group";

export class Post extends Component {
    state = {
        isExpanded: false,
        excerptLength: 150
    }

    static propTypes = {
        post: PropTypes.object.isRequired,
        postNr: PropTypes.number
    }

    extendButtonClick(){
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        const {title, date, acf} = this.props.post;
        const {text, image} = acf;
        const excerpt = text.substring(0, this.state.excerptLength)+"...";
        const {isExpanded} = this.state;
        const attachments = [
            acf.attachment1,
            acf.attachment2,
            acf.attachment3,
            acf.attachment4,
            acf.attachment5
        ];

        const {postNr} = this.props;
        const postDirection = postNr%2;

        return (
            <div className={"post " + (postDirection ? "post-left" : "post-right")}>
                <div>
                    <img src={image.url} alt={title.rendered}/>
                    { isExpanded ? <div>
                        { attachments.map(att => {
                            if (att) return <Attachment key={att.id} className={"post-attachment"} title={att.title} url={att.url}/>
                            else return "";
                        })}
                    </div> : "" }
                </div>
                <div>
                    <h2 className={"post-title"}>{title.rendered}</h2>
                    <small className={"post-date"}>
                        <Moment locale={"pl"} format="DD MMMM YYYYr. HH:mm">{date}</Moment>
                    </small>
                    <p className={"post-text"} dangerouslySetInnerHTML={{ __html: isExpanded ? text : excerpt}} />
                    <button className={"post-button button-accent-2"}
                            onClick={this.extendButtonClick.bind(this)}>{isExpanded ? "mniej" : "więcej"}
                    </button>
                </div>
            </div>
        );
    }
}

export default Post;