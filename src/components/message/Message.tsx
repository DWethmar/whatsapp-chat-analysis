import React from "react";

import "./Message.css";

import { WhatsAppMessage } from "../../models/whatsappMessage";

export interface MessageProps {
  message: WhatsAppMessage;
}

export const Message: React.FunctionComponent<MessageProps> = (props) => {
  const { message } = props;
  return (
    <div className="message">
      <div
        className={
          "message__sender" +
          (message.isWhatsApp ? " message__sender--whatsapp" : "")
        }
      >
        {message.sender}
      </div>
      <div className="message__date-time">
        {message.dateTime.toLocaleString()}
      </div>
      <div className="message__message" title={message.message}>
        {message.message.split("\n").map((item, i) => {
          return <p key={i}>{item}</p>;
        })}
      </div>
    </div>
  );
};
