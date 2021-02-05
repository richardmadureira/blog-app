import { agruparMensagens, getSeverityClass } from "../lib/utils";
import Message from "./message";

export default function Messages({ value }) {
    let msgs = value;
    if (!Array.isArray(value)) {
        msgs = [value]
    }
    const mensagensAgrupadas = agruparMensagens(msgs);
    
    return Object.keys(mensagensAgrupadas).map((severity, idx) => {
        return (<Message key={idx} severity={severity} value={mensagensAgrupadas[severity]} />);
    });

}