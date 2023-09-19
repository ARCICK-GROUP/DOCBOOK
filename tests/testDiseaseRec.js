const {prediction_classifier} = require('../ML_models/disease_prediction')

// Example: Predict disease based on symptoms
// Chills,Vomiting,High Fever,Sweating,Headache,Nausea
// const inputSymptoms = ['itching', 'skin_rash', 'nodal_skin_eruptions'];
const inputSymptoms = ['chills', 'vomiting', 'high_fever', 'sweating', 'headache', 'nausea'];
const symptomsStr = inputSymptoms.join(',');
const diseasePrediction = prediction_classifier.classify(symptomsStr);

console.log(`Predicted Disease: ${diseasePrediction}`);
