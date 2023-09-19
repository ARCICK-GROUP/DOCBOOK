const natural = require('natural');
const classifier = new natural.BayesClassifier();

const trainingData = require('../datasets/user_chat_dataset.json');

trainingData.forEach((example) => {
    classifier.addDocument(example.text, example.intent);
});

classifier.train();

module.exports = { classifier };
