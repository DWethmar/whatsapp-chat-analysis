import React, { FunctionComponent } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-zoom";

import { WhatsAppMessage } from "../../models/whatsappMessage";
import { getColorFromIndex } from "../../utils/color";

export type Interval = "minute" | "hour" | "day" | "week" | "month";
export interface MessageChartProps {
  messages: WhatsAppMessage[];
  interval: Interval;
}

export const MessageChart: FunctionComponent<MessageChartProps> = (props) => {
  const messages = props.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return <span>Chart has no data.</span>;
  }

  const dataSet: Record<string, Record<string, number>> = {};

  let useFormat = "";

  const monthFormat = "MM/YYYY";
  const dayFormat = "DD/MM/YYYY";
  const dateTimeFormat = "DD/MM/YYYY HH:mm";

  for (const message of messages) {
    let date: string = "";

    switch (props.interval) {
      case "minute":
        date = moment(message.dateTime)
          .startOf("minute")
          .format(dateTimeFormat);
          useFormat = dateTimeFormat;
        break;
      case "hour":
        date = moment(message.dateTime).startOf("hour").format(dateTimeFormat);
        useFormat = dateTimeFormat;
        break;
      case "day":
        date = moment(message.dateTime).format(dayFormat);
        useFormat = dayFormat;
        break;
      case "week":
        date = moment(message.dateTime).startOf("week").format(dayFormat);
        useFormat = dayFormat;
        break;  
      case "month":
        date = moment(message.dateTime).format(monthFormat);
        useFormat = monthFormat;
        break;
    }

    if (!dataSet.hasOwnProperty(message.sender)) {
      dataSet[message.sender] = {};
    }

    if (!dataSet[message.sender].hasOwnProperty(date)) {
      dataSet[message.sender][date] = 0;
    }

    dataSet[message.sender][date]++;
  }

  const data = {
    datasets: [
      ...Object.keys(dataSet).map((sender, i) => {
        return {
          label: sender,
          data: Object.entries(dataSet[sender]).map((s) => ({
            x: s[0],
            y: s[1],
          })),
          fill: false,
          borderColor: sender === "Whatsapp" ? "#075E54" : getColorFromIndex(i),
        };
      }),
    ],
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
      text: "Messages over time.",
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x'
        }
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: useFormat,
          },
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number of messages",
          },
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options}></Line>;
};
