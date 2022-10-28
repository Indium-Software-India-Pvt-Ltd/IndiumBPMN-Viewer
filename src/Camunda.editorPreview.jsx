import { Component,createElement  } from "react";

export class preview extends Component {
    render() {
        const viewerProps = {
            xml: this.props.bpmnxml,
            height: this.props.height,
            width: this.props.width,
            url: this.props.url,
            xmlUrl: this.props.urlAttribute
        }
        return <BPMNDiagram {...viewerProps}></BPMNDiagram>
    }
}

export function getPreviewCss() {
    return require("./ui/Camunda.css");
}
