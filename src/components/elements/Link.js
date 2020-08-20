import React, {Component} from "react";
import {ReactComponent as IconLink} from '../../images/link.svg';
import {ReactComponent as IconDownload} from "../../images/download.svg";


export class Link extends Component {
    render() {
        const { title, url } = this.props;
        return (
            <a className={"link"} href={url} rel={"noopener noreferrer"} target={"_blank"}>
                <p>{title}</p>
                <IconLink />
            </a>
        );
    }
}

export default Link;