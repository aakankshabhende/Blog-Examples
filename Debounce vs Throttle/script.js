const input = document.querySelector('input')
const defaultText = document.getElementById('default')
const debouncedText = document.getElementById('debounce')
const throttledText = document.getElementById('throttle')

input.addEventListener("input", event => {
    defaultText.textContent = event.target.value;
    updatedDebouncedText(event.target.value)
    throttledText.textContent = updatedThrottledText(event.target.value)
})

function debounce(func, delay = 2000) {
    let timer;
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

function throttle(func, delay = 2000) {
    let shouldWait = false;
    let remainingArgs;

    const timeOutFunc = () => {
        if (remainingArgs === null){
            shouldWait = false
        }
        else{
            func(...remainingArgs)
            remainingArgs = null
            setTimeout(timeOutFunc, delay)
        }
    }    

    return (...args) => {
        if (shouldWait){
            remainingArgs = args;
            return
        }

        func(...args)   
        shouldWait = true

        setTimeout(timeOutFunc, delay)
    }
}

const updatedDebouncedText = debounce((value) => {
    debouncedText.textContent = value
}, 3000)

const updatedThrottledText = throttle((value) => {
    throttledText.textContent = value
}, 3000)