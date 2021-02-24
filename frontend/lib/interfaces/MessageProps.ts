import Message from "../models/Message";
import Severity from "../models/Severity";

export default interface MessageProps {
    severity: Severity,
    mapMessages: Map<string, Message[]>;
}