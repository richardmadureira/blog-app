import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageProps from "../lib/interfaces/MessageProps";
import Severity from "../lib/models/Severity";

export function Message({ severity, mapMessages }: MessageProps) {
    const color = severity === Severity.error ? 'red' : severity === Severity.success ? 'teal' : severity === Severity.warning ? 'yellow' : 'black';
    return (
        <div className={`my-1 border-l-4 border-${color}-500 bg-${color}-100 border border-${color}-400 text-${color}-700 px-3 py-2 rounded relative`} role="alert">
            {Array.from(mapMessages.keys()).map((summary, idx) => {
                return (
                    <div key={idx}>
                        <strong className="font-boldf block"><FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;{summary}</strong>
                        {mapMessages.get(summary).map((m, idx2) => <div key={idx2} className="block">{m.detail}</div>)}
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className={`fill-current h-6 w-6 text-${color}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}