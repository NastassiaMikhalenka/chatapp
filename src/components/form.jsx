import React, {useRef, useState} from "react";
import styles from './form.module.css';
import {Login} from "./login/login";
import {Chat} from "./chat/chat";


export const Form = () => {
    const [messages, setMessages] = useState([]);
    // const [users, setUsers] = useState([]);
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
        socket.current = new WebSocket('wss://young-headland-51523.herokuapp.com/')
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
            // const user = JSON.parse(e.data)
            setMessages(prev => [...prev, message])
            // setUsers(prev => [...prev, user])
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
            <Login connect={connect}
                   userName={userName} setUserName={setUserName}
                   connected={connected} setConnected={setConnected}
                   setMessages={setMessages}/>
        )
    }

    return (
        <Chat setValue={setValue}
              value={value}
              messages={messages}
              sendMessage={sendMessage}
        />
    )
}