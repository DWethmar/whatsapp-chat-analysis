import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './App.css';
import './pagination.css';

import { Header } from './components/header/Header';
import { ArchiveUpload } from './components/archive-upload/ArchiveUpload';
import { parseArchive, WhatsAppMessage } from './utils/parse-archive';

const pageSize = 10;

function App() {

  const [page, setPage] = useState<number>(0);
  const [archive, setLines] = useState<string[]>([]);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  
  useEffect(() => {
    const messages = parseArchive(archive);
    setMessages(messages);
    console.log('Done', messages.length);
  }, [archive])

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  }

  return (
    <div className="App">
      <Header></Header>
      <ArchiveUpload setLines={setLines} ></ArchiveUpload>

      <br />

      <div>
        <div>Messages: { archive.length }</div>
        <div>Current page: { page + 1}</div>
      </div>

      <hr />

      <br />
      <br />

      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(messages.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName={'pagination'}
          // subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />

      <hr />

      {
        messages.slice(page * pageSize, (page * pageSize) + pageSize).map((m, i) => (
          <div className="message" key={i}>
            <div className="message__sender">{m.sender}</div>
            <div className="message__date-time">{m.dateTime.toLocaleString()}</div>
            <div className="message__message">{m.message}</div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
