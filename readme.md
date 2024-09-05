# Invoice Logger

This Node.js application periodically fetches and logs invoices from an API using HMAC-SHA256 for authentication. It uses Express for serving a simple status route, Axios for making HTTP requests, and Node Schedule for scheduling tasks.

## Features

- Fetches invoices every 15 minutes.
- Authenticates API requests using HMAC-SHA256 signatures.
- Logs invoice data to the console.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_directory>

2. **Install Dependencies**

   ```bash
   npm install

3. **Create Environment File**

   Create a .env file in the root directory of the project and add your environment variables:
   PORT=3000
   API_KEY=your_api_key
   API_ID=your_api_id
   API_URL=https://aktiva.merit.ee/api/v1


4. **Run server**

   ```bash
   node app.js