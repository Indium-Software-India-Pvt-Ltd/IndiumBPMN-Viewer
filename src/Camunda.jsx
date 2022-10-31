import { Component,createElement  } from "react";
import BPMNDiagram from "./components/BPMNDiagram";

import "./ui/Camunda.css";

export class Camunda extends Component {
    render() {
        const viewerProps = {
            xml: this.props.bpmnxml,
            height: this.props.height,
            width: this.props.width,
            url: this.props.url,
            xmlUrl: this.props.urlAttribute,
            taskdata: this.props.taskdata
        }
        return <BPMNDiagram {...viewerProps}></BPMNDiagram>;
    }
}
