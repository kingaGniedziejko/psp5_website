import React, {Component} from "react";
import {ReactComponent as IconDownload} from '../../images/download.svg';


export class Attachment extends Component {
    render() {
        const { className, title, url } = this.props;
        return (
            <a className={"attachment " + className} href={url} rel={"noopener noreferrer"} target={"_blank"}>
                <p>{title}</p>
                 <IconDownload />
            </a>
        );
    }
}

export default Attachment;