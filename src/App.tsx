import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import "./App.css";
import "./pagination.css";

import { Header } from "./components/header/Header";
import { ArchiveUpload } from "./components/archive-upload/ArchiveUpload";
import { readLines } from "./utils/archive";
import { WhatsAppMessage } from "./models/whatsapp-message";
import { bytesToSize } from "./utils/file";
import { Chart } from "./components/chart/Chart";
import { MessageList } from "./components/message-list/MessageList";

const parseArchiveWorker = new Worker(
  process.env.PUBLIC_URL + "/workers/parse-archive.js"
);

const pageSize = 15;

function App() {
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<File | null>();
  const [lines, setLines] = useState<string[]>();

  const [percentage, setPercentage] = useState<number>(0);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);

  const isLoading = () => percentage !== 100;

  useEffect(() => {
    const handler = (e: any) => {
      if (e.data.hasOwnProperty("percentage")) {
        setPercentage(Math.round(e.data.percentage));
      }

      if (e.data.hasOwnProperty("messages")) {
        setMessages(e.data.messages);
      }
    };
    parseArchiveWorker.addEventListener("message", handler, false);
    return () => parseArchiveWorker.removeEventListener("message", handler);
  });

  useEffect(() => {
    if (Array.isArray(lines)) {
      setPage(0);
      setPercentage(0);
      setMessages([]);
      parseArchiveWorker.postMessage(lines);
    }
  }, [lines]);

  useEffect(() => {
    const lines: string[] = [];
    if (file) {
      readLines(
        file,
        1000000000,
        (line) => lines.push(line),
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

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  const pagesMessages = isLoading()
    ? []
    : messages.slice(page * pageSize, page * pageSize + pageSize);

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
            <td>&nbsp; {percentage}%</td>
          </tr>
          <tr>
            <td>Current page:</td>
            <td>{page + 1}</td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <hr />

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break"}
        pageCount={Math.ceil(messages.length / pageSize)}
        forcePage={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      <hr />

      <br />
      <br />


      <MessageList messages={pagesMessages}></MessageList>
      <Chart messages={messages} interval="month"></Chart>
    </div>
  );
}

export default App;
