import moment from "moment";
import { WhatsAppMessage } from "../models/whatsapp-message";


/**
 * Read up to and including |maxlines| lines from |file|.
 *
 * @param {Blob} file - The file to be read.
 * @param {integer} maxLines - The maximum number of lines to read.
 * @param {function(string)} forEachLine - Called for each line.
 * @param {function(error)} onComplete - Called when the end of the file
 *     is reached or when |maxlines| lines have been read.
 */
export function readLines(
  file: File, 
  maxLines: number, 
  forEachLine: (line: string) => void, 
  onComplete: (error?: DOMException | null) => void
) {
  const CHUNK_SIZE = 50000; // 50kb, arbitrarily chosen.
  const decoder = new TextDecoder();
  let offset = 0;
  let linecount = 0;
  let results = '';
  const fr = new FileReader();

  fr.onload = function() {
      // Use stream:true in case we cut the file
      // in the middle of a multi-byte character
      results += decoder.decode(fr.result as ArrayBuffer, {stream: true});
      var lines = results.split('\n');
      results = lines.pop() as string; // In case the line did not end yet.
      linecount += lines.length;
  
      if (linecount > maxLines) {
          // Read too many lines? Truncate the results.
          lines.length -= linecount - maxLines;
          linecount = maxLines;
      }
  
      for (var i = 0; i < lines.length; ++i) {
          forEachLine(lines[i] + '\n');
      }

      offset += CHUNK_SIZE;
      seek();
  };
  fr.onerror = function() {
      onComplete(fr.error);
  };
  seek();
  
  function seek() {
      if (linecount === maxLines) {
          // We found enough lines.
          onComplete(); // Done.
          return;
      }
      if (offset !== 0 && offset >= file.size) {
          // We did not find all lines, but there are no more lines.
          forEachLine(results); // This is from lines.pop(), before.
          onComplete(); // Done
          return;
      }
      var slice = file.slice(offset, offset + CHUNK_SIZE);
      fr.readAsArrayBuffer(slice);
  }
}

export function parseArchive(lines: string[]): WhatsAppMessage[] {
  const messages: WhatsAppMessage[] = [];

  let whatsAppMessage: WhatsAppMessage | null = null;
  const messageRegex = /\[(\d{2}-\d{2}-\d{4}\s\d{2}:\d{2}:\d{2})]\s([^:]+):\s(.*)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

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
