import React, { useEffect, useState } from 'react';
import './Alert.css'

export default function Alert({ msg, setAlterMsg }) {

    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (msg !== '') {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [msg]);



    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false)
            }, 1000);
            setTimeout(() => {
                setAlterMsg('')
            }, 1500);
        }
    }, [setAlterMsg, visible]);




    return <div className='alert-container'>
        {msg !== '' ?
            <div className={visible ? 'alert' : 'alert hide'}>{msg}</div>
            : null
        }
    </div>
}
