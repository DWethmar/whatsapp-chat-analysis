import React, { useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { doSearch } from "../../utils/search";

export interface SearchProps {
  messages: WhatsAppMessage[];
  searchResult: (index: number[]) => void;
}

const minChars = 2;

export const Search: React.FunctionComponent<SearchProps> = (props) => {
  const [query, setQuery] = React.useState("");

  const search = useCallback(
    debounce((query: string) => {
      if (query.length > minChars) {
        const searchResult = Array.from(
          doSearch(props.messages, query.toLocaleLowerCase())
        );
        props.searchResult(searchResult);
      }
    }, 500),
    []
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return (
    <div>
      <input
        type="text"
        placeholder={`Search (min ${minChars} chars)`}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
