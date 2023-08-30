let btnsOpen = document.querySelectorAll('[data-modal]')
let btnsClose = document.querySelectorAll('[data-close]')
let modal = document.querySelector('.modal')

btnsOpen.forEach(btn => {
    btn.onclick = () => {
        modal.style.display = 'block'
    }
})

btnsClose.forEach(btn => {
    btn.onclick = () => {
        modal.style.display = 'none'
    }
})

let forms = document.querySelectorAll('form')
let pattern = {
    name: /^[a-z ,.'-]+$/i,
    phone: /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/
}

function submit(form) {
    let user = {}
    let formData = new FormData(form)

    formData.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);
    form.reset()
}

forms.forEach(form => {
    let inputs = form.querySelectorAll('input')
    inputs.forEach(input => {
        input.onkeyup = () => {
            if (pattern[input.name].test(input.value)) {
                input.style.border = '1px solid blue'
            } else {
                input.style.border = '1px solid red'
            }
        }
    })

    form.onsubmit = (event) => {
        event.preventDefault()
        let error = false

        inputs.forEach(input => {
            if (input.style.border === '1px solid red') {
                error = true
                input.style.border = '1px solid red'
            } else {
                input.style.border = '1px solid blue'
            }
        })

        if (!error) {
            submit(form)
        }

    }
})


let contents = document.querySelectorAll('.tabcontent')
let tabButtons = document.querySelectorAll('.tabheader__item')

contents.forEach(item => item.classList.add('hide', 'fade'))
contents[0].classList.remove('hide')

tabButtons.forEach((btn, idx) => {
    btn.onclick = () => {
        tabButtons.forEach(btn => btn.classList.remove('tabheader__item_active'))
        btn.classList.add('tabheader__item_active')

        contents.forEach(item => item.classList.add('hide'))
        contents[idx].classList.remove('hide')
    }
})

let slider = document.querySelector('.offer__slider-wrapper')
let next = document.querySelector('.offer__slider-next')
let prev = document.querySelector('.offer__slider-prev')
let slides = document.querySelectorAll('.offer__slide')
let slideInfo = document.querySelector('.current')
let index = 3

slides.forEach(slide => slide.classList.add('hide', 'fade'))
slides[2].classList.remove('hide')

next.onclick = () => {
    index++
    if (index >= slides.length + 1) {
        index = 1
    }
    slideInfo.innerHTML = `0${index}`
    slides.forEach(slide => slide.classList.add('hide'))
    slides[index - 1].classList.remove('hide')
}
prev.onclick = () => {
    index--
    if (index < 1) {
        index = slides.length
    }
    slideInfo.innerHTML = `0${index}`
    slides.forEach(slide => slide.classList.add('hide'))
    slides[index - 1].classList.remove('hide')
}




let people = document.querySelectorAll('#gender div')
let personInfo = document.querySelectorAll('.calculating__choose_medium input')
let activityItems = document.querySelectorAll('.calculating__choose_big div')
let result = document.querySelector('.calculating__result span')

let personData = {
    height: '',
    weight: '',
    age: ''
}

let activityLevel = 1.5


let gender = document.querySelector('#gender .calculating__choose-item_active').innerHTML

people.forEach(person => {
    person.onclick = () => {
        people.forEach(person => person.classList.remove('calculating__choose-item_active'))
        person.classList.add('calculating__choose-item_active')
        gender = document.querySelector('#gender .calculating__choose-item_active').innerHTML
    }
})

function calculator() {
    let height = personData.height
    let weight = personData.weight
    let age = personData.age

    if (gender === 'Женщина') {
        result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activityLevel);
    } else {
        result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activityLevel);
    }
}

personInfo.forEach(input => {
    input.onkeyup = () => {
        personData[input.id] = input.value
        calculator()
    }
})

activityItems.forEach((activity, idx) => {
    activity.onclick = () => {
        activityItems.forEach(activity => activity.classList.remove('calculating__choose-item_active'))
        activity.classList.add('calculating__choose-item_active')
        activityLevel = [1.375, 1.55, 1.7, 1.9][idx];
        calculator()
    }
})


let days = document.querySelector('#days')
let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let seconds = document.querySelector('#seconds')
let canvas = document.querySelector('.confetti')

const jsConfetti = new JSConfetti();
let confettiIsRunning = false;


function deadLine() {
    let day = +days.innerHTML
    let hour = +hours.innerHTML
    let minute = +minutes.innerHTML
    let second = +seconds.innerHTML

    if (second > 0) {
        second--
    } else if (minute > 0) {
        minute--
        second = 60
    } else if (hour > 0) {
        hour--
        minute = 60
    } else if (day > 0) {
        day--
        hour = 24
    } else {
        if (!confettiIsRunning) {
            showConfetti();
            confettiIsRunning = true;
        }
    }

    days.innerHTML = day
    hours.innerHTML = hour
    minutes.innerHTML = minute
    seconds.innerHTML = second
}

setInterval(deadLine, 1)

function showConfetti() {
    jsConfetti.addConfetti({
        confettiNumber: 500, 
        confettiColors: ['#ff0000', '#00ff00', '#FFFB04'], 
        confettiRadius: 8,
    });
}

