const natural = require('natural');

const dataset = require('../datasets/medical_diagnosis_dataset.json');

const classifier = new natural.BayesClassifier();

dataset.forEach((data) => {
  const symptoms = Object.keys(data)
    .filter((key) => key !== 'prognosis' && data[key] === 1);
  const disease = data.prognosis;

  if (symptoms.length > 0) {
    classifier.addDocument(symptoms.join(','), disease);
  }
});

classifier.train();

// Example: Predict disease based on symptoms
// Chills,Vomiting,High Fever,Sweating,Headache,Nausea
// const inputSymptoms = ['itching', 'skin_rash', 'nodal_skin_eruptions'];
const inputSymptoms = ['chills', 'vomiting', 'high_fever', 'sweating', 'headache', 'nausea'];
const symptomsStr = inputSymptoms.join(',');
const diseasePrediction = classifier.classify(symptomsStr);

console.log(`Predicted Disease: ${diseasePrediction}`);
