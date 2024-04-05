import { FC, useEffect } from 'react';
import echo from '../services/echo';

const TestSocket: FC = () => {
    useEffect(() => {
        echo.channel('chat')
            .listen('test-event', (data: any) => {
                console.log('hola')
                console.log('Event gotten:', data);
            });
    });

    return (
        <div>
           hi!!
        </div>
    );
};

export default TestSocket;
