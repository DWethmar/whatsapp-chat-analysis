import React from "react";

import "./MessageModal.css";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { Modal } from "../modal/Modal";

export interface MessageModalProps {
  message: WhatsAppMessage;
  close: () => void;
}

export const MessageModal: React.FunctionComponent<MessageModalProps> = (
  props
) => {
  const { message, close, children } = props;
  return (
    <Modal>
      <div className="message-modal">
        <button className="message-modal__close" onClick={close}>
          close
        </button>

        <h2>{message.sender}</h2>

        <span>{message.dateTime.toUTCString()}</span>

        {children && <div>{children}</div>}

        <div className="message-modal__message">
          {message.message.split("\n").map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
      </div>
    </Modal>
  );
};
