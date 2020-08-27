import React, {Component} from "react";
import {ReactComponent as IconDownload} from '../../images/download.svg';


export class Attachment extends Component {
    render() {
        const { className, title, url } = this.props;
        if(title && title !== "" && title !== "..." && url && url !== "" && url !== "...")
        return (
            <a className={"attachment " + className} href={url} rel={"noopener noreferrer"} target={"_blank"}>
                <p dangerouslySetInnerHTML={{__html: title}}/>
                <div>
                    <IconDownload />
                </div>
            </a>
        );
        return ""
    }
}

export default Attachment;