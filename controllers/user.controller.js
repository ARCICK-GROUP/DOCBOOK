const bcrypt = require('bcrypt');
const { Hospital, Doctor, Patient, Timetable, Appointment } = require('../models/users');
const { sequelize } = require('sequelize');
const sequelize = require('../models/database_connector');


// const createDoctor = async (userData) => {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const newDoctor = await Doctor.create({...userData, password: hashedPassword});
//     return newDoctor;
// };


// const createPatient = async (userData) => {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const newPatient = await Patient.create({...userData, password: hashedPassword});
//     return newPatient;
// };


// const findDoctorByEmail = async (email) => {
//     return await Doctor.findOne({where: { email }});
// };

// const findPatientByEmail = async (email) => {
//     return await Patient.findOne({where: { email }});
// };

const CreateHospital = async (HospitalData) => {
    const hashedPassword = await bcrypt.hash(HospitalData.password, 10);
    const newHospital = await Hospital.create({...HospitalData, password: hashedPassword});
    return newHospital;
};

const CreateDoctor = async (DoctorData, HID) => {
    return await Doctor.create({
        ...DoctorData, 
        HospitalId: HID
    });
}

const CreateTimeTable = async (DocID, tableData) => {
    return await Timetable.create({
        ...tableData,
        DoctorId: DocID,
    });
};

const CreatePatient = async (patientData) => {
    return await Patient.create({
        ...patientData,
    });
}


const CreateAppointment = async (patientID, doctorID) => {
    const time = new Date();
    return await Appointment.create({
        time,
        PatientId: patientID,
        DoctorId: doctorI,

    })
}

const NearestHospitals = async (latitude, longitude, distance) => {
    const haversine = `(
        6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
    )`;
    return await Hospital.findAll({
        attributes: [
            'registrationNumber',
            [sequelize.literal(haversine), 'distance'],
        ],
        order: sequelize.col('distance'),
        having: sequelize.literal(`distance <=${distance}`),
        limit: 5
    })
}


// find doctors nearby utilizing haversine formula
const FindDoctor = async (locationInfo, specialization) => {
    const hospitals = await NearestHospitals(...locationInfo);
    const HospitalRegNo = hospitals.map((hospital) => hospital.registrationNumber);

    const doctors = await Doctor.findAll({
        where: {
            speciality: specialization,
            HospitalId: {
                [sequelize.Op.in]: HospitalRegNo,
            }
        }
    })

    return doctors;

}

const ExistingHospital = async(reg) => {
    return await Hospital.findOne({
        where: { registrationNumber: reg }
    })
};

const ExistingDoctor = async(reg) => {
    return await Doctor.findOne({
        where: { registrationNumber: reg }
    })
}

module.exports = { CreateDoctor, CreatePatient, CreateHospital, CreateTimeTable, FindDoctor};