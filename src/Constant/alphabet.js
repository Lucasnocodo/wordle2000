const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
const allAlphabet = [...firstRow, ...secondRow, ...thirdRow]

let allphabetObj = {}
allAlphabet.forEach((e) => {
    allphabetObj = { ...allphabetObj, [e]: '' }
})
export default allAlphabet
export { firstRow, secondRow, thirdRow, allphabetObj }