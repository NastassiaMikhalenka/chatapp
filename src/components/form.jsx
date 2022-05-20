import React, {useRef, useState} from "react";
import styles from './form.module.css';


export const Form = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [userName, setUserName] = useState('');


    const sendMessage = async () => {
        const message = {
            userName,
            message: value,
            id: Date.now(),
            event: 'message',
        }

        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    const connect = () => {
        socket.current = new WebSocket('ws://young-headland-51523.herokuapp.com/')
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                userName,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message));
            console.log('socket.current.onOpen')
        }
        socket.current.onmessage = (e) => {
            const message = JSON.parse(e.data)
            setMessages(prev => [...prev, message])
            console.log('socket.current.onMessage')
        }
        socket.current.onclose = () => {
            console.log('socket.current.onClose')
        }
        socket.current.onerror = () => {
            console.log('socket.current.onError')
        }
    }

    if (!connected) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.frame}>
                    <input type={'text'}
                           placeholder={'Your name'}
                           value={userName} onChange={e =>
                        setUserName(e.target.value)}/>
                    <button onClick={connect}>Connect</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapperChat}>
            <div className={styles.frame}>
                <div>
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div>Пользователь {mess.userName} подключился</div>
                                : <div className={mess.id}>{mess.userName}: {mess.message}</div>
                            }
                        </div>
                    )}
                </div>
                <div>
                    <input type={'text'} value={value} onChange={e => setValue(e.target.value)}/>
                    <button onClick={sendMessage}>Add</button>
                </div>
            </div>
        </div>
    )
}