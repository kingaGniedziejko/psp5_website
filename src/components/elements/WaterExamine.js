import React, {Component} from "react";
import Attachment from "./Attachment";

export class WaterExamine extends Component {

    render() {
        const {examine} = this.props;
        return (
            <div className={"water-examine-element"}>
                <h3>{examine.title.rendered}</h3>
                {examine.acf.water_examine.map((elem, index) => {
                    return <Attachment key={index} className={"water-examine-attachment"} title={elem.attachment.title} url={elem.attachment.url}/>
                })}
            </div>
        );
    }
}

export default WaterExamine;