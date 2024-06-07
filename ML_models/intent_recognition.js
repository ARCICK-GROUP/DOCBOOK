const natural = require('natural');
const intent_classifier = new natural.BayesClassifier();

const trainingData = require('../datasets/user_chat_dataset.json');

trainingData.forEach((example) => {
    intent_classifier.addDocument(example.text, example.intent);
});

intent_classifier.train();

module.exports = { intent_classifier };
