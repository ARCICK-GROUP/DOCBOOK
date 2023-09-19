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


module.exports = {classifier};