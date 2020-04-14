import React, { useEffect } from "react";
import { FixedSizeList as List, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./MessageList.css";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { Message } from "./Message";

export interface MessageListProps {
  messages: WhatsAppMessage[];
  highlighted: number[];
  scrollToItem: number;
  select: (index: number) => void;
}

export const MessageList: React.FunctionComponent<MessageListProps> = (
  props
) => {
  const { messages, highlighted, select, scrollToItem } = props;

  const listRef = React.createRef<FixedSizeList>();

  useEffect(() => {
    if (scrollToItem) {
      listRef.current?.scrollToItem(scrollToItem, "start");
    }
  }, [listRef, scrollToItem]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const message = messages[index];
    return (
      <div
        style={style}
        key={index}
        className={
          "message-list-row" +
          " message-list-row--" +
          (index % 2 === 0 ? "even" : "odd") +
          (highlighted.includes(index) ? " message--selected" : "")
        }
      >
        <Message message={message}></Message>
        <div className="message-list-row__actions">
          <button onClick={() => select(index)}>view</button>
        </div>
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
            itemCount={messages.length}
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
