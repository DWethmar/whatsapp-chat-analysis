import moment from "moment";

export interface WhatsAppMessage {
  sender: string;
  dateTime: Date;
  message: string;
  media: boolean;
}

export function parseArchive(archive: string[]): WhatsAppMessage[] {
  const messages: WhatsAppMessage[] = [];

  let whatsAppMessage: WhatsAppMessage | null = null;
  const messageRegex = /\[(\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}:\d{2})]\s([^:]+):\s(.*)/;

  for (let i = 0; i < archive.length; i++) {
    const line = archive[i];

    // if (i === 0 || i === 1) {
    //   console.log('line', line, messageRegex.test(line), messageRegex.exec(line), line.indexOf("\n") !== -1);
    // }

    if (messageRegex.test(line)) {
      const r = messageRegex.exec(line);

      if (r !== null) {
        // ‎[30-03-2020 19:57:50] ananas

        const dateTime = moment(r[1], "DD-MM-YYYY HH:mm:ss");
        
        whatsAppMessage = {
          dateTime: dateTime.toDate(),
          sender: r[2],
          message: r[3],
          media: false,
        };
        messages.push(whatsAppMessage);
      } else {
        if (whatsAppMessage) {
          whatsAppMessage.message += line;
        }
      }
    }
  }

  return messages;
}
