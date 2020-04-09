import React from "react";

export const Header = () => {
  return (
    <header>
      <h1>WhatsApp Chat Analysis</h1>
      <p>Upload a Whatsapp chat archive to view the messages and stats.</p>
      <p>Everything is done in the browser, so no data is sent to a server and the data does not persists after a page refresh. But don't use this is you have <b>any</b> privacy concerns.</p>
      <p>Click <a href="https://faq.whatsapp.com/en/android/23756533/">here </a> to find out how to export a chat on android.</p>
      <p><a download href="https://raw.githubusercontent.com/DWethmar/whatsapp-chat-analysis/master/public/_chat.txt">Download example Whatsapp chat</a></p>
    </header>
  );
};