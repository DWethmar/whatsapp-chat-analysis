import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById("modal");

export interface ModalProps {}

export class Modal extends React.Component<ModalProps> {
  private element: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);
    // We create an element div for this modal
    this.element = document.createElement("div");
  }

  // We append the created div to the div#modal
  componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.element);
    }
  }

  /**
   * We remove the created div when this Modal Component is unmounted
   * Used to clean up the memory to avoid memory leak
   */
  componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.element);
    }
  }

  render() {
    return createPortal(this.props.children, this.element);
  }
}
