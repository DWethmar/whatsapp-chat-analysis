import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "chartjs-plugin-zoom";

import "./App.css";
import "./pagination.css";

import { Header } from "./components/header/Header";
import { ArchiveUpload } from "./components/archive-upload/ArchiveUpload";
import { parseArchive, readLines } from "./utils/archive";
import { WhatsAppMessage } from "./models/whatsapp-message";
import { bytesToSize } from "./utils/file";
import { Chart } from "./components/chart/Chart";

const pageSize = 20;

function App() {
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<File>();
  const [lines, setLines] = useState<string[]>();

  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);

  useEffect(() => {
    const lines: string[] = [];
    if (file) {
      readLines(
        file,
        1000000000,
        (line) => {
          lines.push(line);
        },
        (error) => {
          if (error) {
            throw error;
          } else {
            setLines(lines);
          }
        }
      );
    }
  }, [file]);

  useEffect(() => {
    if (Array.isArray(lines)) {
      const messages = parseArchive(lines);
      setMessages(messages);
      console.log("Done", messages.length);
    }
  }, [lines]);

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  const pagesMessages = messages.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="App">
      <Header></Header>
      <ArchiveUpload setFile={setFile}></ArchiveUpload>

      <br />

      <table>
        <tbody>
          <tr>
            <td>file size:</td>
            <td>{!!file ? bytesToSize(file.size) : 0}</td>
          </tr>
          <tr>
            <td>Messages:</td>
            <td>{messages.length}</td>
          </tr>
          <tr>
            <td>Current page:</td>
            <td>{page + 1}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <br />
      <br />

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(messages.length / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        // subContainerClassName={'pages pagination'}
        activeClassName={"active"}
      />

      <hr />

      {pagesMessages.map((m, i) => (
          <div className="message" key={i}>
            <div className="message__sender">{m.sender}</div>
            <div className="message__date-time">
              {m.dateTime.toLocaleString()}
            </div>
            <div className="message__message">{m.message}</div>
          </div>
        ))}

        <Chart messages={messages} interval="day"></Chart>
    </div>
  );
}

export default App;
