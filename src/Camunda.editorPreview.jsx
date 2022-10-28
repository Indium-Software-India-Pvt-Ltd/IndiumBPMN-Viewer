import { Component,createElement  } from "react";

export class preview extends Component {
    render() {
        const viewerProps = {
            xml: this.props.xml
        }
        return <BPMNDiagram {...viewerProps}></BPMNDiagram>
    }
}

export function getPreviewCss() {
    return require("./ui/Camunda.css");
}
