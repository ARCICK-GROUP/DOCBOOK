const { Doctor, Hospital } = require('../models/users'); // Replace 'your-model-file' with the actual path to your model definitions
const { DocBySpec } = require("../controllers/user.controller");

// Define the specialty you want to search for
const specialtyToFind = 'Cardiologist'; // Replace with the specialty you want to search for

async function main() {
  const Doctors = await DocBySpec(specialtyToFind);

  Doctors.forEach(async (doctor) => {
    console.log(`Doctor : ${doctor.name}`)
    console.log(`SPECIALITY : ${doctor.speciality}`)
    console.log(`Hospital Name: ${doctor.Hospital.name}`)
  });
}

main()
  .catch((error) => {
    console.error('Error:', error);
  });

// Query the database to find doctors with the specified specialty and include their connected hospital
// Doctor.findAll({
//   where: { speciality: specialtyToFind },
//   include: Hospital, // Include the Hospital model to retrieve hospital information
// })
//   .then((doctors) => {
//     doctors.forEach((doctor) => {
//       console.log(`Doctor Name: ${doctor.name}`);
//       console.log(`Speciality: ${doctor.speciality}`);
      
//       // Check if the hospital is not null before accessing its properties
//       if (doctor.Hospital) {
//         console.log(`Hospital Name: ${doctor.Hospital.name}`); // Access the connected hospital's name
//       } else {
//         console.log('Hospital: Not Assigned'); // Handle the case where no hospital is assigned
//       }
      
//       console.log('-----------------------------');
//     });
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });