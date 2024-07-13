# virtual_staff_assignment

# Video and Audio Upload Application

This project is a MERN stack application that allows users to upload video and audio files to an AWS S3 server. The application includes the following features:
- Upload video and audio files with metadata.
- Limit the duration of the uploaded files to a maximum of 30 minutes.
- Compress video files after uploading.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submission](#submission)

## Requirements

- Node.js
- MongoDB
- AWS S3
- ffmpeg

## Setup

### Backend

1. **Clone the repository:**

    ```bash
    git clone https://github.com/jay42719/virtual_staff_assignment.git
    cd virtual_staff_assignment/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `backend` directory with the following variables:

    ```plaintext
    AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
    AWS_REGION=<your-aws-region>
    S3_BUCKET_NAME=<your-s3-bucket-name>
    MONGODB_URI=<your-mongodb-uri>
    PORT=<select-port>
    ```

4. **Start the backend server:**

    ```bash
    npm start
    ```

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the frontend server:**

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the form to upload video and audio files along with their metadata.
3. View the upload progress in the progress bar.
4. After uploading, view the list of uploaded files and their metadata.

## Testing

1. **Test the application:**

    - Upload files and ensure they are correctly uploaded and stored in S3.
    - Verify that metadata is stored in MongoDB.
    - Ensure that files longer than 30 minutes are rejected.
    - Check that videos are compressed after uploading.

## Documentation

### File Upload Endpoint

- **URL:** `/upload`
- **Method:** `POST`
- **Parameters:**
  - `file`: The file to be uploaded.
  - `title`: The title of the file.
  - `description`: The description of the file.
- **Response:**
  - `200 OK`: File uploaded successfully.
  - `400 Bad Request`: File duration exceeds 30 minutes or other validation errors.
  - `500 Internal Server Error`: An error occurred on the server.

## Submission

Submit the code as a GitHub repository link. Ensure the repository includes:
- Complete source code for the backend and frontend.
- A `README.md` file with setup instructions.
- Clear documentation on configuring AWS S3 and MongoDB.
