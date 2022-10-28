import { Component,createElement  } from "react";
import BPMNDiagram from "./components/BPMNDiagram";

import "./ui/Camunda.css";

export class Camunda extends Component {
    render() {
        const viewerProps = {
            xml: this.props.SampleXml
        }
        return <BPMNDiagram {...viewerProps}></BPMNDiagram>;
    }
}
