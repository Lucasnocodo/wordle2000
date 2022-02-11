import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ResultModal.css'

export default function ResultModal({ handleCloseModal, visible, tileArr,
    guessTime, showAlert, setIsrandomMode, isWinGame, targetWord }) {
    const [copied, setCopied] = useState(false)

    const resultEmoji = tileArr.map((e, i) => {
        if (e?.wrong) {
            if (i % 5 === 4) {
                return `⬛
`
            } else {
                return `⬛`
            }

        } else if (e?.wrongLocation) {
            if (i % 5 === 4) {
                return `🟨
`
            } else {
                return '🟨'
            }
        } else if (e?.correct) {
            if (i % 5 === 4) {
                return `🟩
`
            } else {
                return '🟩'
            }

        } else {
            return ''
        }
    }).join('')
    const content = `Wordle-2000  ${guessTime}/6
${resultEmoji}`

    useEffect(() => {
        if (copied) {
            showAlert('已複製至剪貼簿')
            setCopied(false)
        }
    }, [copied, showAlert])
    const handleNextWordle = () => {
        setIsrandomMode(true)
        handleCloseModal()
    }

    const renderTitle = () => {
        switch (isWinGame) {
            case undefined:
                return '想跳過這個迷底嗎？'
            case true:
                return '恭喜過關'
            case false:
                return '再接再厲'
            default:
                return '總結'
        }
    }

    return (<div style={visible ? {} : { display: 'none' }}>
        <div className='mask' />
        <div className='modal-container'>
            <div className='close-btn' onClick={() => handleCloseModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="#d7dadc" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </div>

            <h1> {renderTitle()}</h1>
            {isWinGame === false && <p>{`本次的謎底是： ${targetWord}`}</p>}
            <div className='describe'>
                <p>正常來說一天只能猜一次，但如果你很想趕快猜下一個的話，可以按下面的按鈕來進行下一關</p>

            </div>
            <div className='info-box'>
                <div className='countdown-container'>
                    <button className='next footer-btn' onClick={() => handleNextWordle()}>
                        <p> next Wordle</p>
                    </button>
                </div>
                <div className='share-container'>
                    <CopyToClipboard text={content} onCopy={() => setCopied(true)}>
                        <button className='share footer-btn'>
                            <span style={{ marginRight: 10 }}>分享</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path fill="#fff" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
                            </svg>
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    </div >
    )
}
