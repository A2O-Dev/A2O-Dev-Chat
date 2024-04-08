import { FC, useEffect } from 'react';
import echo from '../services/echo';

const TestSocket: FC = () => {
    useEffect(() => {
        echo.channel('chat')
            .listen('test', (data: any) => {
                console.log('Event gotten:', data);
            });
    });

    return (
        <div>
           hi!!
        </div>
    );
};

