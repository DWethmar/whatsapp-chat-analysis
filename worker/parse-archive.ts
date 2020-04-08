import {parseArchive} from "../src/utils/archive";

onmessage = function(e: MessageEvent) {

  console.log('Worker: Message received from main script');
  
  if (Array.isArray(e.data)) {
    const messages = parseArchive(e.data);
    console.log("Done", messages.length);
    postMessage(messages);
  } else {
    console.log("Incorrect data");
  }
}
