import { Severity } from './Severity';

export class Message {
    severity: Severity;
    summary: string;
    detail: string;

    constructor(severity: Severity, summary: string, detail: string) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
}