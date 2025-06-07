require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { SearchServiceClient } = require('@google-cloud/discoveryengine');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Dalave AI Chat Backend is running!');
});

// Get the key file path from your .env
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Create Search Client with correct GLOBAL endpoint
const client = new SearchServiceClient({
  keyFilename: keyFilePath,
  apiEndpoint: 'discoveryengine.googleapis.com', // ✅ Fixed endpoint for global region
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send('Message is required.');

  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const location = process.env.GOOGLE_CLOUD_LOCATION;
  const dataStoreId = process.env.GOOGLE_CLOUD_APP_ID;

  const servingConfig = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${dataStoreId}/servingConfigs/default_serving_config`;

  const request = {
    servingConfig,
    query: message,
    pageSize: 1,
  };

  try {
    const [response] = await client.search(request, { autoPaginate: false });

    const summaryText =
      response.summary?.summaryText ||
      "I'm sorry, I couldn't find a specific answer. Please try asking differently.";

    res.json({ reply: summaryText });
  } catch (error) {
    console.error('❌ Vertex AI Search error:', error);
    res.status(500).send('Error processing your request. Please try again later.');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
