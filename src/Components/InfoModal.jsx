import React from 'react'
import './ResultModal.css'
import './TailGrid.css'

import { rightSample, wrongLocationSample, WrongSample, Answer } from '../Constant/sample'


export default function ResultModal({ handleCloseModal, visible }) {
    const getBackgroundColor = (type) => {

        if (type === 'wrong') {
            return {
                border: 'none',
                backgroundColor: 'hsl(240, 2%, 23%)'
            }
        }
        if (type === 'wrongLocation') {
            return {
                border: 'none',
                backgroundColor: 'hsl(49, 51%, 47%)'
            }
        }
        if (type === 'correct') {
            return {
                border: 'none',
                backgroundColor: 'hsl(115, 29%, 43%)'
            }
        }

    }
    return (<div style={visible ? {} : { display: 'none' }}>
        <div className='mask' onClick={() => handleCloseModal()} />
        <div className='modal-container info'>
            <div className='close-btn' onClick={() => handleCloseModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="#d7dadc" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </div>
            <h1>how to play</h1>
            <div className='describe'>
                <p>這是一個簡易版的wordle, 謎底的答案會是國中2000單字內的程度，讓大家可以更輕鬆的玩</p>
                <h1>玩法</h1>
                <div>
                    <div className='sample grid-box' data-guess-grid>
                        {rightSample.map((e, i) => (<div
                            key={`tile_${i}`}
                            className='tile'
                            style={getBackgroundColor(i === 4 ? 'correct' : '')}
                        > {e}</div>))}

                    </div>
                    <p className="describe-text">第五個位置Ｋ顯示綠色代表謎底有這個字且位置也正確</p>
                </div>
                <div>
                    <div className='sample grid-box' data-guess-grid>
                        {wrongLocationSample.map((e, i) => (<div
                            key={`tile_${i}`}
                            className='tile'
                            style={getBackgroundColor(i === 1 ? 'wrongLocation' : '')}
                        > {e}</div>))}


                    </div>
                    <p className="describe-text">第二個位置Ａ顯示黃色代表謎底有這個字但位置不正確</p>
                </div>
                <div>
                    <div className='sample grid-box' data-guess-grid>
                        {WrongSample.map((e, i) => (<div
                            key={`tile_${i}`}
                            className='tile'
                            style={getBackgroundColor(i === 2 ? 'wrong' : '')}
                        > {e}</div>))}

                    </div>
                    <p className="describe-text">第三個位置I顯示灰色代表謎底有沒有這個字</p>
                </div>
                <div>
                    <div className='sample grid-box' data-guess-grid>
                        {Answer.map((e, i) => (<div
                            key={`tile_${i}`}
                            className='tile'
                            style={getBackgroundColor('correct')}
                        > {e}</div>))}

                    </div>
                    <p className="describe-text">每個謎底都是由五個字母組成，目標是五個字母背景都變成綠色</p>
                </div>


                <p>原作者:Josh Wardle  <a href='https://www.powerlanguage.co.uk/wordle/' className='link'>原版連結</a></p>
            </div>
        </div>
    </div >
    )
}
