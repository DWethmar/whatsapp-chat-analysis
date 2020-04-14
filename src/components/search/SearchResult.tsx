import React from "react";

export interface SearchResultProps {
    messageIndexes: number[];
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (props) => {
  return (
    <div>
      Search result: {props.messageIndexes.length}
    </div>
  );
};
