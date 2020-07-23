import React, {Component} from "react";

export class Attachment extends Component {
    render() {
        const { className, title, url } = this.props;
        return (
            <div className={"attachment " + className}>
                <p>{title}</p>
                <a href={url} rel={"noopener noreferrer"} target={"_blank"}><div className={"attachment-download"}/></a>
            </div>
        );
    }
}

export default Attachment;