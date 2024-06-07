const natural = require('natural');
const dataset = require('../datasets/medical_diagnosis_dataset.json');
const prediction_classifier = new natural.BayesClassifier();

dataset.forEach((data) => {
    const symptoms = Object.keys(data)
      .filter((key) => key !== 'prognosis' && data[key] === 1);
    const disease = data.prognosis;
  
    if (symptoms.length > 0) {
      prediction_classifier.addDocument(symptoms.join(','), disease);
    }
  });

prediction_classifier.train();


module.exports = {prediction_classifier};