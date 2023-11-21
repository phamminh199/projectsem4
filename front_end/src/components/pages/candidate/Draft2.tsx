import React, { useState, useEffect, useRef } from 'react';
import styles from './Draft.module.scss' 
import clsx from 'clsx';



function Draft2() {

    const [transcript, setTranscript] = useState('');
    // `$ {id}` ép id thành string
    //@ts-ignore
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = (event:any) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        setTranscript(text);
    };

    const startRecognition = () => {
        recognition.start();
    };

    return (
        <div className={clsx(styles.component_Draft)}>
            <div>
                <button onClick={startRecognition}>Start Speech Recognition</button>
                <p>Transcript: {transcript}</p>
            </div>
        </div>
    )
}

export default Draft2