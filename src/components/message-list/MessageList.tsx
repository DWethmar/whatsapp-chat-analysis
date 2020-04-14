import React from "react";
import { FixedSizeList as List, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./MessageList.css";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { Message } from "./Message";

export interface MessageListProps {
  messages: WhatsAppMessage[];
  highlighted: number[];
  scrollToItem?: number;
}

export const MessageList: React.FunctionComponent<MessageListProps> = (
  props
) => {
  const listRef = React.createRef<FixedSizeList>();

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
        <Message
          message={message}
          highlighted={props.highlighted.includes(index)}
          index={index}
        ></Message>
      </div>
    );
  };

  return (
    <div className="message-list">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
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
