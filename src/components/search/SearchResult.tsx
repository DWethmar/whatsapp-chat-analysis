import React, { useState, useEffect } from "react";

export interface SearchResultProps {
  messageIndexes: number[];
  select: (index: number) => void;
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (
  props
) => {
  const { messageIndexes, select } = props;

  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (
      messageIndexes.length > 0 &&
      selected >= 0 &&
      selected < messageIndexes.length
    ) {
      select(messageIndexes[selected]);
    }
  }, [messageIndexes, selected, select]);

  return (
    <div>
      {messageIndexes.length > 0 && (
        <div>
          <span>
            Search results: {selected + 1}/{props.messageIndexes.length}
          </span>

          <button
            disabled={selected === 0}
            onClick={() => setSelected(selected - 1)}
          >
            Previous
          </button>

          <button
            disabled={selected >= messageIndexes.length - 1}
            onClick={() => setSelected(selected + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
