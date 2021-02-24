import { Message } from "../components/Message";
import Severity from "../lib/models/Severity";
import { getMessagesGroupedBySeverityAndSummary } from "../lib/utils";
import MessagesProps from "../lib/interfaces/MessagesProps";

export default function Messages({ messages }: MessagesProps) {
    let msgs = !Array.isArray(messages)? [messages]: messages;
    const mapMessages = getMessagesGroupedBySeverityAndSummary(msgs);
    
    return (
        <>
            {Array.from(mapMessages.keys()).map((severity: Severity, idx: number) => <Message key={idx} severity={severity} mapMessages={mapMessages.get(severity)} />)}
        </>
    );
}