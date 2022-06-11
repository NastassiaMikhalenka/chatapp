import React, {useRef} from "react";
import styles from "./login.module.css";
import {useFormik} from "formik";
import * as Yup from "yup";


export const Login = ({userName, setUserName, connect, setConnected, setMessages}) => {

    const connectBtn = () => {
        if (userName) {
            connect()
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div>
                <p className={styles.chatName}>quick chat</p>
                <p className={styles.chatNameDes}>connect</p>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.frame}>

                    {/*<form onSubmit={formik.handleSubmit} className={styles.form}>*/}
                    {/*    <div className={styles.formInfo}>*/}
                    {/*        <label>Name</label>*/}
                    {/*        <input type={'text'} {...formik.getFieldProps('name')}*/}
                    {/*            //    value={userName} onChange={e =>*/}
                    {/*            // setUserName(e.target.value)}*/}
                    {/*        />*/}
                    {/*        {formik.errors.name ?*/}
                    {/*            <div style={{color: '#FF5B5A', fontSize: '12px'}}>{formik.errors.name}</div> : null}*/}
                    {/*    </div>*/}
                    {/*    <button type={'submit'}>GO</button>*/}
                    {/*</form>*/}
                    <div className={styles.form}>
                        <label>Name</label>
                        <input type={'text'}
                               value={userName} onChange={e =>
                            setUserName(e.target.value)} min={10}/>
                    </div>
                    <button onClick={connectBtn} disabled={!userName} className={styles.btn}>GO</button>
                </div>
            </div>
        </div>
    )
}
