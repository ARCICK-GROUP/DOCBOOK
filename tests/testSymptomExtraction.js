const trainingData = [
    { text: "I have a high fever and chills.", entities: ["high fever", "chills"] },
    { text: "My stomach hurts, and I feel nauseous.", entities: ["stomach hurts", "nauseous"] },
    { text: "I've been vomiting all night.", entities: ["vomiting"] },
    { text: "My head is pounding, and I have a migraine.", entities: ["head pounding", "migraine"] },
    { text: "I feel weak and fatigued.", entities: ["weak", "fatigued"] },
  ];
  const { Router } = require('express');


  const natural = require('natural');
  const tokenizer = new natural.WordTokenizer();
  
  // Create feature vectors
  const features = trainingData.map(example => {
    const tokens = tokenizer.tokenize(example.text);
    return tokens;
  });

  const { BayesClassifier } = natural;
  const classifier = new BayesClassifier();
  
  // Add labeled data to the classifier
  trainingData.forEach((example, index) => {
    const tokens = features[index];
    const entities = example.entities;
  
    classifier.addDocument(tokens, entities);
  });
  
  // Train the classifier
  classifier.train();

  const textToAnalyze = "I am feeling weak";
  const tokensToAnalyze = tokenizer.tokenize(textToAnalyze);
  
  const namedEntities = classifier.classify(tokensToAnalyze);
  console.log("Named Entities:", namedEntities);
  