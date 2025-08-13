const form = document.querySelector('.form')
const sum = document.querySelector('.sum')
const res = document.querySelector('.res')
const select = document.querySelector('.select')

const obj = {
    USD: 0.000080,
    Yevro: 0.000068,
    Rubl: 0.013,
}

for (const item in obj) {
    const option = document.createElement('option')
    option.value = item
    option.textContent = item
    select.appendChild(option)
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const result = select.value
    const result1 = sum.value
    res.textContent = `${result1} sum  ${Number(obj[result]) * Number(result1)} ${result} bo'ladi`
})