import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./MessageList.css";

import { WhatsAppMessage } from "../../models/whatsappMessage";

export interface MessageListProps {
  messages: WhatsAppMessage[];
}

export const MessageList: React.FunctionComponent<MessageListProps> = (
  props
) => {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const message = props.messages[index];
    return (
      <div style={style} key={index} className="message-list__row">
        <div className={"message" + (index % 2 === 0 ? " even" : " odd")}>
          <div className={"message__sender" + (message.isWhatsApp ? " message__sender--whatsapp" : "")  }>{message.sender}</div>
          <div className="message__date-time">
            {message.dateTime.toLocaleString()}
          </div>
          <div className="message__message" title={message.message}>
            {message.message.split("\n").map((item, i) => {
              return <p key={i}>{item}</p>;
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="message-list">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={props.messages.length}
            itemSize={40}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
