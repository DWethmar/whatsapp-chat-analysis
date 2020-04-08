import React from "react";
import "./MessageList.css";

import { WhatsAppMessage } from "../../models/whatsapp-message";

export interface MessageListProps {
  messages: WhatsAppMessage[];
}

export const MessageList: React.FunctionComponent<MessageListProps> = (
  props
) => {
  return (
    <div>
      {props.messages.map((m, i) => (
        <div className="message" key={i}>
          <div className="message__sender">{m.sender}</div>
          <div className="message__date-time">
            {m.dateTime.toLocaleString()}
          </div>
          <div className="message__message">{m.message}</div>
        </div>
      ))}
    </div>
  );
};
