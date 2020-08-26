import React, {Component} from "react";
import {ReactComponent as IconLink} from '../../images/link.svg';


export class Link extends Component {
    render() {
        const { title, url } = this.props;
        return (
            <a className={"link"} href={url} rel={"noopener noreferrer"} target={"_blank"}>
                <p dangerouslySetInnerHTML={{__html: title}}/>
                <div>
                    <IconLink />
                </div>
            </a>
        );
    }
}

export default Link;