import { parseIso, format, parseISO } from 'date-fns';
const ptBR = require('date-fns/locale/pt-BR');

export function agruparMensagens(mensagens) {
    let messages = {};

    mensagens.map(msg => {
        const { severity, summary, detail } = msg;
        if (!messages[severity]) {
            messages[severity] = {};
        }
        if (!messages[severity][summary]) {
            messages[severity][summary] = [];
        }
        messages[severity][summary].push(detail);
    });
    return messages;
}

export function getSeverityClass(severity) {
    switch (severity) {
        case 'error':
            return 'alert-danger';
        case 'warning':
            return 'alert-warning';
        case 'info':
            return 'alert-info';
        case 'success':
            return 'alert-success';
        default:
            return 'alert-info';
    }
}

export function formatDate(dateString) {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', {locale: ptBR});
}