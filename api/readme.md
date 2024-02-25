# flsk API for aleph

This Flask API provides endpoints for file management (uploading, adding, removing, retrieving) and logging into a crypto wallet.

## Available Endpoints

### 📤 File Upload
- **URL:** `/upload`
- **HTTP Method:** POST
- **Description:** Uploads a file to IPFS and pins it using Aleph.
- **Parameters:** Files are sent in the multipart/form-data request.

### 📥 File Retrieval
- **URL:** `/get/<CID>`
- **HTTP Method:** GET
- **Description:** Retrieves a file from IPFS using its CID.

### 📋 List Files
- **URL:** `/list_files`
- **HTTP Method:** GET
- **Description:** Returns a list of available files in JSON format with their information (hash, date, sender, channel, etc.).

### ➕ Runtime File Addition
- **URL:** `/runtime/add_file`
- **HTTP Method:** POST
- **Description:** Adds a file during application runtime.

### ➖ Runtime File Removal
- **URL:** `/runtime/remove_file`
- **HTTP Method:** POST
- **Description:** Removes a file during application runtime.

### 🔐 Crypto Wallet Login
- **URL:** `/login_crypto_wallet`
- **HTTP Method:** GET
- **Description:** Allows login to a crypto wallet using a specific private key.

## Running the Application

1. Make sure you have Python installed on your system.
2. Install dependencies by running `pip install -r requirements.txt`.
3. Run the application by executing `python app.py`.
4. The API will be accessible at `http://localhost:5000`.

## Example Usage

1. Upload a file by sending a POST request to `/upload`.
2. Retrieve a file by sending a GET request to `/get/<CID>`.
3. Get a list of files with their information by sending a GET request to `/list_files`.
4. Add a file at runtime by sending a POST request to `/runtime/add_file`.
5. Remove a file at runtime by sending a POST request to `/runtime/remove_file`.
6. Login to a crypto wallet by sending a GET request to `/login_crypto_wallet`.

Don't forget to customize certain parts of the code to match your specific implementation, such as file management and connection details.

