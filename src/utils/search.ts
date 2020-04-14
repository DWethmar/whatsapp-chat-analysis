import { WhatsAppMessage } from "../models/whatsappMessage";

export function *doSearch(messages: WhatsAppMessage[], query: string) {
    let i = 0;
    for (const message of messages) {
        if (message.message.toLocaleLowerCase().includes(query)) {
            yield i;
        }
        i++;
    }
}
