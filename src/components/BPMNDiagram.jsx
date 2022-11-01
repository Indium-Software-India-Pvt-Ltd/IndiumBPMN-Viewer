import React from 'react';
import {createElement, cloneElement }   from "react";
import axios from "axios";

import Viewer from 'bpmn-js/lib/NavigatedViewer';
import Modeler from 'bpmn-js/lib/Modeler';
import "../ui/Camunda.css";


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
    if((prevProps.xml || prevProps.xmlUrl) && (this.props.xml || this.props.xmlUrl))
      this.openXml();
  }

  openFromUrl(url) {
    console.log('attempting to open <' + url + '>');
    axios.get(url)
    .then(async (r) => {
      await this.importXML(r.data)
      this.highlightCurrentTask();
    })
    .catch((e) => {
      console.log(e);
    });
    
  }

  async importXML(xml) {
    if(xml){
      try {
        const result = this.viewer.importXML(xml);
        const { warnings } = result;
        result.zoom('fit-viewport', 'auto');
        this.setState({loaded: true});
        console.log(warnings);
      } catch (err) {
        console.log(err.message, err.warnings);
      }
      
    }
  }

  highlightCurrentTask(){
    if(this.props.taskdata){
      var overlays = this.viewer.get('overlays');
      var elementRegistry = this.viewer.get('elementRegistry'); 
      var shape = elementRegistry.get(this.props.taskdata.value);
      if(shape){
        var $overlayHtml = document.createElement('div') 
        $overlayHtml.className  ='highlight-overlay'
        $overlayHtml.style.cssText = `width:${shape.width}px;height:${shape.height}px;background-color: green;opacity: 0.4;pointer-events: none; `
  
          overlays.add(this.props.taskdata.value, {
            position: {
              top: 0,
              left: 0
            },
            html: $overlayHtml
          });
        }
      }
      
  }

  componentDidMount() {
    this.viewer.attachTo(this.container);
    this.openXml();
  }

  async openXml(){
    const {
      url,
      xml,
      xmlUrl
    } = this.props;

    if(xmlUrl){
      this.openFromUrl(xmlUrl.value)
    }
    else if(xml) {
      await this.importXML(xml.value)
      this.highlightCurrentTask();
    }
    else if(url){
      this.openFromUrl(url)
    }
  }
}