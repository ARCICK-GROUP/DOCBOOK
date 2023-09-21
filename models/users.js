const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database_connector');

class Hospital extends Model {}
Hospital.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Hospital',
    timestamps: true,
  }
);

class Doctor extends Model {}
Doctor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Doctor',
    timestamps: true,
  }
);

class Timetable extends Model {}
Timetable.init(
  {
    dayOfWeek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Timetable',
    timestamps: true,
  }
);

class Patient extends Model {}
Patient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
  }
);

class Appointment extends Model {}
Appointment.init(
  {
    appointmentTime: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    timestamps: true,
  }
);

// Define associations
Hospital.hasMany(Doctor, { foreignKey: 'HospitalRegistrationNumber' });
Doctor.belongsTo(Hospital, { foreignKey: 'HospitalRegistrationNumber' });

Doctor.hasMany(Timetable);
Timetable.belongsTo(Doctor);

Patient.hasMany(Appointment);
Doctor.hasMany(Appointment);

module.exports = { Hospital, Doctor, Timetable, Patient, Appointment };
