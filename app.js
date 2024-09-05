const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');
const crypto = require('crypto');
const base64url = require('base64url');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const API_ID = process.env.API_ID;


function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hour}${minute}${second}`;
}

function generateSignature(httpBody, timestamp) {
  const dataToSign = `${API_ID}${timestamp}${httpBody}`;
  const hmacKey = Buffer.from(API_KEY, 'ascii');
  const signatureBytes = crypto.createHmac('sha256', hmacKey).update(dataToSign).digest();
  return base64url(signatureBytes);
}

async function fetchAndLogInvoices() {
  try {
    const httpBody = {
      Periodstart: 20240824,
      PeriodEnd: 20240910,
      UnPaid: true
    };
    const timestamp = getFormattedTimestamp()
    const signature = generateSignature(httpBody, timestamp)
    const response = await axios.post(
      `${API_URL}?ApiId=${API_ID}&timestamp=${timestamp}&signature=${signature}`,
      httpBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const invoices = response.data;
    console.log('Invoices:', invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error.message);
  }
}

schedule.scheduleJob('*/15 * * * *', () => {
  console.log('Fetching invoices...');
  fetchAndLogInvoices();
});

app.get('/', (req, res) => {
  res.send('Invoice Logger is running. Check the console for logs.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});