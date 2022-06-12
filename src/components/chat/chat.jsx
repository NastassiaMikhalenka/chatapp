import React, {useEffect, useRef} from "react";
import styles from "./chat.module.css";


export const Chat = ({setValue, value, messages, sendMessage}) => {

    const bottomDiv = useRef(null)

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })

    return (
        <div className={styles.wrapperChat}>
            <div className={styles.messagesContainer}>
                {messages.map(mess =>
                    <div key={mess.id}>
                        {mess.event === 'connection'
                            ? <div className={styles.userConnected}>User {mess.userName} connected</div>
                            : <>
                                <div ref={bottomDiv}/>
                                <div className={styles.messContainer}>
                                    <p className={styles.username}>{mess.userName}</p>
                                    <p className={styles.message}>{mess.message}</p>
                                </div>
                            </>

                        }
                    </div>
                )}
            </div>
            <form className={styles.wrap} onKeyDown={(e) => {
                if (e.shiftKey && (e.keyCode === 13)) {
                    value += '\r\n';
                } else if (e.keyCode === 13 && value.trim() !== '') {
                    sendMessage();
                }
            }}>
                <textarea value={value}
                          onChange={e => setValue(e.target.value)}

                />
                <button onClick={sendMessage}
                        className={styles.btnSend} disabled={!value}></button>
            </form>
        </div>
    )
}
