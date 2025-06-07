require('dotenv').config();
const { DocumentServiceClient } = require('@google-cloud/discoveryengine');

async function uploadDoc() {
  const client = new DocumentServiceClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    apiEndpoint: 'us-discoveryengine.googleapis.com',
  });

  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const location = process.env.GOOGLE_CLOUD_LOCATION;
  const dataStoreId = process.env.GOOGLE_CLOUD_APP_ID;

  const parent = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${dataStoreId}`;

  const document = {
    id: 'doc1', // Unique document ID
    content: {
      structuredData: {
        title: 'About Dalave Services',
        body: 'Dalave Services is a cloud-based AI chatbot service to help users with their queries.',
      },
    },
  };

  const request = {
    parent,
    document,
  };

  try {
    const [response] = await client.createDocument(request);
    console.log('Document uploaded:', response);
  } catch (error) {
    console.error('Error uploading document:', error);
  }
}

uploadDoc();
