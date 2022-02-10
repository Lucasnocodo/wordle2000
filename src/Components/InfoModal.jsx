import React from 'react'
import './ResultModal.css'

export default function ResultModal({ handleCloseModal, visible }) {

    return (<div style={visible ? {} : { display: 'none' }}>
        <div className='mask' onClick={() => handleCloseModal()} />
        <div className='modal-container'>
            <div className='close-btn' onClick={() => handleCloseModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="#d7dadc" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </div>
            <h1>how to play</h1>
            <div className='describe'>
                <p>這是一個簡易版的wordle, 謎底的答案會是國中2000單字內的程度，讓大家可以更輕鬆的玩</p>
                <p>原作者:Josh Wardle  <a href='https://www.powerlanguage.co.uk/wordle/' className='link'>原版連結</a></p>

            </div>
        </div>
    </div >
    )
}
