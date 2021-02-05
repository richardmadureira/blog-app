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