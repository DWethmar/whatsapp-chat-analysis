import React from "react";

import { WhatsAppMessage } from "../../models/whatsappMessage";

export interface MessageProps {
  message: WhatsAppMessage;
  highlighted: boolean;
  index: number;
}

export const Message: React.FunctionComponent<MessageProps> = (props) => {
  const { index, message, highlighted } = props;
  return (
    <div
      className={
        "message" +
        " message--" +
        (index % 2 === 0 ? "even" : "odd") +
        (highlighted ? " message--selected" : "")
      }
    >
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
