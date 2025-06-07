require('dotenv').config();
const { DataStoreServiceClient } = require('@google-cloud/discoveryengine');

async function listDataStores() {
  const client = new DataStoreServiceClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    apiEndpoint: 'us-discoveryengine.googleapis.com', // make sure it matches your location endpoint
  });

  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'us';

  const parent = `projects/${projectId}/locations/${location}`;

  try {
    const [dataStores] = await client.listDataStores({ parent });

    if (dataStores.length === 0) {
      console.log('No DataStores found.');
      return;
    }

    console.log(`Found ${dataStores.length} DataStore(s):`);
    dataStores.forEach(ds => {
      console.log(`- DataStore name: ${ds.name}`);
    });
  } catch (error) {
    console.error('Error listing DataStores:', error);
  }
}

listDataStores();
