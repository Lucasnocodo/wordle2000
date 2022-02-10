import React, { useState, useRef, useEffect } from 'react';
import Keyboard from './Keyboard'
import TileGrid from './TileGrid'
import Header from './Header'
import ResultModal from './ResultModal'
import InfoModal from './InfoModal'
import Alert from './Alert'
import wordsList from '../1000en.json'
import dictionary from '../dictionary.json'
import { allphabetObj } from '../Constant/alphabet';


export default function ReactPage() {
    const gridIndex = useRef(-1);
    const alterIndex = useRef(0);
    const targetWords = wordsList.data.map(e => Object.keys(e)[0])
    let tileArrPorto = useRef(new Array(30))
    tileArrPorto.current.fill({ alphabet: '', active: false, shake: false, dance: false, flip: false })

    const [tileArr, setTileArr] = useState(tileArrPorto.current);
    const [keyDown, setKeyDown] = useState(false);
    const [curTileValue, setCurTileValue] = useState('');
    const [alterMsg, setAlterMsg] = useState('');
    const [isFliping, setIsFliping] = useState(false);
    const [keyboardState, setKeyboardState] = useState(allphabetObj);
    const [isGuessed, setIsGuessed] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false)
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(true)
    const [israndomMode, setIsrandomMode] = useState(false)

    function getRandom(x) {
        return Math.floor(Math.random() * x) + 1;
    };

    const offsetFromDate = new Date(2022, 0, 1)
    const msOffset = Date.now() - offsetFromDate
    const dayOffset = msOffset / 1000 / 60 / 60 / 24
    const targetWordValue = targetWords[Math.floor(dayOffset)]
    const isFiveWord = tileArr.filter((e) => e.active).length > 4
    const [targetWord, setTargetWord] = useState(targetWordValue)
    const targetWordArr = targetWord?.split('')
    console.log('targetWordArr', targetWordArr)
    const handlePress = (e) => {
        if (gridIndex.current > 28) return
        if (isFiveWord && !isGuessed) return
        setCurTileValue(e.toLowerCase())
        setKeyDown(true)
        setIsGuessed(false)
        gridIndex.current = gridIndex.current + 1

    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitGuess()
            return
        }
        if (e.key === 'Backspace' || e.key === 'Delete') {
            handleDelete()
            return
        }
        if (e.key.match(/^[a-z]$/)) {
            handlePress(e.key)
        }
        e.preventDefault();
    }

    const handleDelete = () => {
        let preTileArr = [...tileArr]
        if (!preTileArr[gridIndex.current].active) return
        preTileArr[gridIndex.current] = { ...preTileArr[gridIndex.current], active: false, alphabet: '' }

        setTileArr(preTileArr)
        gridIndex.current = gridIndex.current - 1
    }
    useEffect(() => {
        if (keyDown) {
            let tmpArr = [...tileArr]
            tmpArr[gridIndex.current] = { ...tmpArr[gridIndex.current], active: true, alphabet: curTileValue }
            setTileArr(tmpArr)
            setKeyDown(false)
        }
    }, [curTileValue, keyDown, tileArr, tileArrPorto]);


    const submitGuess = () => {

        if (!isFiveWord) {
            showAlert('長度不足')
            shakeTile()
            return
        }

        const tmpArr = [...tileArr]
        const guessArr = tmpArr.map((e) => {
            if (e.active) {
                return e.alphabet
            } else return ''

        })

        const guess = guessArr.reduce((a, b) => a + b)
        if (!dictionary.includes(guess)) {
            showAlert('查無此字')
            shakeTile()
            return
        }

        let triggerTimeOffset = -1
        const newArr = tmpArr.map((e) => {
            if (e.active) {
                triggerTimeOffset += 1

                const tartgetAlphabet = e.alphabet.toUpperCase()
                if (guess === targetWord) {
                    showAlert('恭喜獲勝')
                    setTimeout(() => {
                        setIsResultVisible(true)
                    }, 1500);
                    setKeyboardState(pre => ({ ...pre, [tartgetAlphabet]: 'correct' }))
                    return { ...e, dance: true, correct: true }
                } else if (targetWordArr[triggerTimeOffset] === e.alphabet) {
                    setKeyboardState(pre => ({ ...pre, [tartgetAlphabet]: 'correct' }))
                    return { ...e, flip: true, correct: true }

                } else if (targetWordArr.includes(e.alphabet)) {
                    setKeyboardState(pre => ({ ...pre, [tartgetAlphabet]: 'wrong-location' }))
                    return { ...e, flip: true, wrongLocation: true }
                } else {
                    setKeyboardState(pre => ({ ...pre, [tartgetAlphabet]: 'wrong' }))
                    return { ...e, flip: true, wrong: true }
                }
            } else return e
        })
        setIsFliping(true)
        setTileArr(newArr)
    }

    useEffect(() => {
        if (isFliping) {
            const tmpArr = [...tileArr]
            setTimeout(() => {
                const newArr = tmpArr.map((e) => {
                    if (e.flip) {
                        return { ...e, flip: false, active: false }
                    } else return e
                })
                setTileArr(newArr)
                setIsFliping(false)

            }, 500);
            setIsGuessed(true)
        }
    }, [curTileValue, isFliping, tileArr]);

    useEffect(() => {
        if (israndomMode) {

            setTileArr(tileArrPorto.current)
            setCurTileValue('');
            setKeyboardState(allphabetObj);
            gridIndex.current = -1
            setIsrandomMode(false)
            setTargetWord(targetWords[getRandom(targetWords.length)])
        }

    }, [israndomMode, targetWords])


    const showAlert = (msg) => {
        setAlterMsg(msg)
    }

    const shakeTile = () => {
        const tmpArr = [...tileArr]
        const newArr = tmpArr.map((e) => {
            if (e.active) {
                return { ...e, shake: true }
            } else return e
        })
        setTileArr(newArr)

    }

    const originAttribute = () => {
        const temArr = [...tileArr]
        const newArr = temArr.map(e => {
            if (e.active) {
                return { ...e, shake: false }
            } else {
                return e
            }
        })

        setTileArr(newArr)
    }
    console.log('targetWord', targetWord)

    return <div onKeyDown={(e) => handleKeyPress(e)} tabIndex="0" style={{ outline: 'none' }}>

        <Header setIsInfoModalVisible={setIsInfoModalVisible} />

        <Alert key={`alert_${alterIndex.current}`} msg={alterMsg} setAlterMsg={setAlterMsg} />)
        <TileGrid tileData={tileArr} originAttribute={originAttribute} />
        <Keyboard
            handlePress={handlePress}
            handleDelete={handleDelete}
            submitGuess={submitGuess}
            keyboardState={keyboardState} />
        <ResultModal
            visible={isResultVisible}
            handleCloseModal={setIsResultVisible}
            tileArr={tileArr}
            showAlert={showAlert}
            setIsrandomMode={setIsrandomMode}
            guessTime={(gridIndex.current + 1) / 5} />

        <InfoModal
            visible={isInfoModalVisible}
            handleCloseModal={setIsInfoModalVisible} />
    </div>;
}
