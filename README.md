# React + AWS Bedrock Project

## Description
This project includes a frontend built with React and a backend using Node.js with Express, which sends requests to AWS BedrockRuntimeClient. Everything runs in a Docker container.

## How to Run
1. Build and run the container:
   ```sh
   docker build -t react-bedrock .
   docker run -p 5001:5001 -p 3010:3010 react-bedrock
   ```
2. Open `http://localhost:3010` to use the application.