import React from 'react';
import {createElement, cloneElement }   from "react";
import axios from "axios";

import Viewer from 'bpmn-js/lib/NavigatedViewer';


export default class BPMNDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = new Viewer({
      height: this.props.height  ? parseInt(this.props.height) : 500,
      width: this.props.width  ? `${this.props.width}%` : '100%',
      canvas: {
        deferUpdate: false
      }
    });

    this.state = {
      loaded: false
    };
  }

  storeContainer = container => {
    this.container = container;
  }

  render() {
    return <div className='BPMNDiagram' style={this.props.style} ref={this.storeContainer}>
      {this.state.loaded && this.props.children && React.cloneElement(this.props.children, { viewer: this.viewer })}
    </div>;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.xml !== this.props.xml) {
      const {
        url,
        xml
      } = this.props;
  
      if(url){
        this.openFromUrl(url)
      }
      else if(xml) {
        this.importXML(xml.value)
      }
    }
  }

  openFromUrl(url) {
    console.log('attempting to open <' + url + '>');
    axios
    .get(
      url
    )
    .then((r) => {
      this.importXML(r.data)
    })
    .catch((e) => {
      console.log(e);
    });
    
  }

  async importXML(xml) {
    try {
      const result = this.viewer.importXML(xml);
      const { warnings } = result;
      result.resized();
      result.zoom('fit-viewport', 'auto');

      this.setState({loaded: true});
      console.log(warnings);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }

  componentDidMount() {
    this.viewer.attachTo(this.container);
    const {
      url,
      xml,
      xmlUrl
    } = this.props;

    if(xmlUrl){
      this.openFromUrl(xmlUrl.value)
    }
    else if(xml) {
      this.importXML(xml.value)
    }
    else if(url){
      this.openFromUrl(url)
    }
  }
}