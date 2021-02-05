import { getSeverityClass } from "../lib/utils";

export default function Message({ severity, value }) {
    const severityClass = getSeverityClass(severity)
    return (
        <div className={`alert ${severityClass}`}>
            {Object.keys(value).map((summary, idx) => {
                return (
                    <div key={idx}>
                        <h5 className="alert-heading">{summary}</h5>
                        {value[summary].map((m, idx2)  => <div key={idx2}>{m}</div>)}
                    </div>
                );
            })}
        </div>
    );
}