// errorHandler.js
export function handleGlobalErrors() {
    window.addEventListener('error', function(event) {
        const errorData = {
            message: event.message,
            filename: event.filename,
            lineNumber: event.lineno,
            columnNumber: event.colno,
            error: event.error ? event.error.stack : null
        };

        fetch('/log/error', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorData)
        }).catch(error => {
            console.error('Error sending error data:', error);
        });
    });
}
