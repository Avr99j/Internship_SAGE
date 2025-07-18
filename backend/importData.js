const mongoose = require('mongoose');
require('dotenv').config();

// Import the Agent model
const Agent = require('./models/Agent');

// Sample agent data (copied from react-app/src/data/agentData.ts)
const agentsData = [
  {
    id: "1",
    title: "DevAssistant AI",
    domain: "Development",
    subdomain: "Software Development / DevOps",
    description: "An AI assistant specialized in helping developers with code completion, bug fixing, and code reviews. Supports multiple programming languages including JavaScript, Python, and Java.",
    rating: 4.8,
    comments: 2,
    trial: true,
    trialUrl: "https://trial.devassistant.ai/register",
    reviewsList: [
      {
        author: "John Dev",
        date: "2025-05-12",
        rating: 5,
        comment: "Incredibly helpful for debugging complex issues. Saved me hours of work!"
      },
      {
        author: "Alice Coder",
        date: "2025-05-01",
        rating: 4,
        comment: "Very good at suggesting code improvements. Occasionally misses context in larger projects."
      }
    ]
  },
  {
    id: "2",
    title: "HealthTech Analyzer",
    domain: "Healthcare",
    subdomain: "Healthcare",
    description: "Specialized AI for healthcare data analysis, patient record management, and medical research assistance. HIPAA compliant and trained on validated medical datasets.",
    rating: 4.5,
    comments: 2,
    trial: false,
    reviewsList: [
      {
        author: "Dr. Smith",
        date: "2025-06-03",
        rating: 5,
        comment: "Excellent for analyzing patient data trends. Very accurate recommendations."
      },
      {
        author: "Medical Researcher",
        date: "2025-05-22",
        rating: 4,
        comment: "Great tool for research assistance, but requires some domain expertise to get the best results."
      }
    ]
  },
  {
    id: "3",
    title: "DataViz Master",
    domain: "Data",
    subdomain: "Data Analytics & Business Intelligence",
    description: "AI-powered data visualization tool that automatically creates insightful charts and dashboards from raw data. Supports multiple data sources and export formats.",
    rating: 4.2,
    comments: 1,
    trial: true,
    trialUrl: "https://datavizmaster.io/trial",
    reviewsList: [
      {
        author: "Data Analyst",
        date: "2025-06-10",
        rating: 4,
        comment: "Creates beautiful visualizations with minimal effort. Would like more customization options."
      }
    ]
  },
  {
    id: "4",
    title: "TestSuite Pro",
    domain: "Testing",
    subdomain: "Testing",
    description: "AI agent that automatically generates comprehensive test cases, performs regression testing, and identifies potential vulnerabilities in your code.",
    rating: 4.6,
    comments: 1,
    trial: false,
    reviewsList: [
      {
        author: "QA Lead",
        date: "2025-05-18",
        rating: 5,
        comment: "Dramatically improved our test coverage. Finds edge cases we would have missed."
      }
    ]
  },
  {
    id: "5",
    title: "AI Safety Guard",
    domain: "AI",
    subdomain: "AI Safety & Security",
    description: "A specialized agent for monitoring and ensuring the ethical and safe operation of other AI systems. Provides risk assessments and mitigation strategies.",
    rating: 4.9,
    comments: 1,
    trial: true,
    trialUrl: "https://ai-safety-guard.dev/try",
    reviewsList: [
      {
        author: "AI Ethics Officer",
        date: "2025-06-15",
        rating: 5,
        comment: "Essential tool for our AI governance framework. Comprehensive monitoring capabilities."
      }
    ]
  }
];

// Function to import data
async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Agent.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    const result = await Agent.insertMany(agentsData);
    console.log(`✅ Imported ${result.length} agents successfully`);

    // Verify the import
    const count = await Agent.countDocuments();
    console.log(`📊 Total agents in database: ${count}`);

    // Show sample data
    const sampleAgent = await Agent.findOne();
    console.log('📋 Sample agent:', sampleAgent.title);

    console.log('🎉 Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData(); 