import { EventSourcePolyfill } from 'event-source-polyfill';

export class SSEService {
    constructor() {
        this.eventSource = null;
        this.reconnectTimeout = null;
    }

    connect(onMessage, onError) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'text/event-stream'
        };

        this.eventSource = new EventSourcePolyfill('http://localhost:3001/sse/subscribe', {
            headers,
            heartbeatTimeout: 3600000
        });

        this.eventSource.addEventListener('message', (event) => {
            try {
                onMessage(JSON.parse(event.data));
            } catch (e) {
                onMessage(event.data);
            }
        });

        this.eventSource.onerror = (error) => {
            onError(error);
            this.close();
            this.reconnectTimeout = setTimeout(() => this.connect(onMessage, onError), 1000);
        };
    }

    close() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
    }
}