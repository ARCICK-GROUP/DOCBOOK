document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reg-form')

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        })

        fetch('/api/user/signup', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                alert("Registration successful!")
            } else {
                alert("Registration failed!" + data.message)
            }
        })
        .catch(err => {
            console.log("Error : ", err);
        })
    })
})