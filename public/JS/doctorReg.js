document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reg-form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        try {
            const response = await fetch('/api/user/signup', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataObject)
            });

            const data = await response.json();
            console.log(data)
            if (data.success) {
                alert("Registration successful!");
            } else {
                alert("Registration failed! " + data.message);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    });
});
