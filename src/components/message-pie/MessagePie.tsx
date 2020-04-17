import React, { FunctionComponent } from "react";
import { Doughnut } from "react-chartjs-2";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { getColorFromIndex } from "../../utils/color";

export interface MessagePieProps {
  messages: WhatsAppMessage[];
}

export const MessagePie: FunctionComponent<MessagePieProps> = (props) => {
  const messages = props.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return <span>Chart has no data.</span>;
  }

  const numberOfMessagesPerSender: Record<string, number> = {};

  const colors: string[] = [];

  let chatParticipants = 0;
  for (const message of messages) {
    if (!numberOfMessagesPerSender.hasOwnProperty(message.sender)) {
      numberOfMessagesPerSender[message.sender] = 0;
      colors.push(getColorFromIndex(chatParticipants));
      chatParticipants++;
    }
    numberOfMessagesPerSender[message.sender]++;
  }

  const _data: number[] = [];
  const _labels: string[] = [];

  Object.entries(numberOfMessagesPerSender).forEach(([sender, numberOfmsg]) => {
    _data.push(numberOfmsg);
    _labels.push(sender);
  });

  const data = {
    datasets: [
      {
        data: _data,
        backgroundColor: colors,
      },
    ],
    labels: _labels,
  };

  const options = {
    responsive: true,
    animation: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    title: {
      display: true,
      text: "Amount of messages per chat participant.",
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};
