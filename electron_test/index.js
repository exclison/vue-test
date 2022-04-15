console.log(window.myAPI,'api')
const counter = document.getElementById('counter')

window.myAPI.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
    event.sender.send('counter-value', newValue)
})