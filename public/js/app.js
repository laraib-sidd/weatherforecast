const para = document.querySelectorAll('p')

var weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    para[1].innerText = "Loading...."
    const int = e.target[0].value
    url = `/weather?address=${int}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                para[1].innerText = data.error
            } else {
                para[1].innerText = data.location
                para[2].innerText = data.weather
            }
        })
})
