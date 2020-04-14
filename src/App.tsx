import React, { useState, useEffect } from "react";

import "./App.css";
import "./pagination.css";

import { Header } from "./components/header/Header";
import { ArchiveUpload } from "./components/archive-upload/ArchiveUpload";
import { readLines } from "./utils/archive";
import { WhatsAppMessage } from "./models/whatsappMessage";
import { bytesToSize } from "./utils/file";
import {
  MessageChart,
  Interval,
} from "./components/message-chart/MessageChart";
import { MessageList } from "./components/message-list/MessageList";
import { Search } from "./components/search/Search";
import { SearchResult } from "./components/search/SearchResult";

const parseArchiveWorker = new Worker(
  process.env.PUBLIC_URL + "/workers/parse-archive.js"
);

function App() {
  const [file, setFile] = useState<File | null>();
  const [lines, setLines] = useState<string[]>();

  const [percentage, setPercentage] = useState<number>(0);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [interval, setInterval] = useState<Interval>("month");
  const [searchResult, setSearchResult] = useState<number[]>([]);

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
      setPercentage(0);
      setMessages([]);
      setSearchResult([]);
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

  return (
    <div className="App">
      <Header></Header>

      <hr />

      <ArchiveUpload setFile={setFile}></ArchiveUpload>

      <br />

      <table>
        <tbody>
          <tr>
            <td>Size:</td>
            <td>{!!file ? bytesToSize(file.size) : 0}</td>
          </tr>
          <tr>
            <td>Messages:</td>
            <td>{messages.length}</td>
            <td>&nbsp; {percentage}%</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {percentage === 100 && messages.length > 0 && (
        <>
          <Search
            messages={messages}
            searchResult={(result) => setSearchResult(result)}
          ></Search>

          <SearchResult messageIndexes={searchResult}></SearchResult>

          <hr />

          <MessageList
            messages={messages}
            highlighted={searchResult}
          ></MessageList>

          <hr />

          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value as Interval)}
          >
            {["day", "week", "month"].map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>

          <MessageChart messages={messages} interval={interval}></MessageChart>
        </>
      )}
    </div>
  );
}

export default App;
