const patientSignIn = document.getElementById('patientSignIn')
const doctorSignIn = document.getElementById('doctorSignIn')


patientSignIn.addEventListener('click', () => {
    window.location.href = '/app/patientSignin';
})


doctorSignIn.addEventListener('click', () => {
    window.location.href = '/app/doctorSignin';
})