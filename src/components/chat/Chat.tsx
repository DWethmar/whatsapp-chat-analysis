import React, { useState } from "react";
import { WhatsAppMessage } from "../../models/whatsappMessage";
import { MessageModal } from "../message/MessageModal";
import { Search } from "../search/Search";
import { SearchResult } from "../search/SearchResult";
import { MessageList } from "../message/MessageList";

export interface ChatProps {
  messages: WhatsAppMessage[];
}

export const Chat: React.FunctionComponent<ChatProps> = (props) => {
  const { messages } = props;

  const [searchResult, setSearchResult] = useState<number[]>([]);

  const [gotoItem, setGotoItem] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="chat">
      {selected !== null && (
        <MessageModal
          message={messages[selected]}
          close={() => setSelected(null)}
        >
          {selected > 0 && (
            <button onClick={() => setSelected(selected - 1)}>Previous</button>
          )}

          {selected < messages.length - 1 && (
            <button onClick={() => setSelected(selected + 1)}>Next</button>
          )}
        </MessageModal>
      )}

      <Search
        messages={messages}
        searchResult={(result) => setSearchResult(result)}
      ></Search>

      <SearchResult
        messageIndexes={searchResult}
        select={(index) => setGotoItem(index)}
      ></SearchResult>

      <hr />

      <MessageList
        messages={messages}
        highlighted={searchResult}
        select={(index) => setSelected(index)}
        scrollToItem={gotoItem || 0}
      ></MessageList>
    </div>
  );
};
