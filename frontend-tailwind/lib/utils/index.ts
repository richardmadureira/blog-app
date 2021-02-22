import Message from "../models/Message";
import Severity from "../models/Severity";

export const fetcher = (url: string) => fetch(url).then(res => res.json());

export const fetcherPost = (url: string) => fetch(url, { method: 'post' }).then(res => res.json());

export const getMessagesGroupedBySeverityAndSummary = (messages: Message[]): Map<Severity, Map<string, Message[]>> => {
    const mapMessages = new Map<Severity, Map<string, Message[]>>();

    for (let m of messages) {
        if (!mapMessages.get(m.severity)) {
            mapMessages.set(m.severity, new Map<string, Message[]>());
        }
        if (!mapMessages.get(m.severity).get(m.summary)) {
            mapMessages.get(m.severity).set(m.summary, []);
        }
        mapMessages.get(m.severity).get(m.summary).push(m);
    }
    return mapMessages;
}