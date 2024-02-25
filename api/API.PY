import asyncio
import logging
import subprocess
from typing import Any, Dict, List
import aioipfs
from flask import Flask, jsonify, request

app = Flask(__name__)

# Define custom types for clarity
Multiaddr = str
CID = str

async def raise_no_cid():
    raise ValueError("Could not obtain a CID")

async def aggregate_messages_hashes(messages: List[Dict[str, Any]], multiaddr: Multiaddr) -> CID:
    client = aioipfs.AsyncIPFS(maddr=multiaddr)

    try:
        aggregated_info = []
        for message in messages:
            hash_info = await client.object.get(message["hash"])
            aggregated_info.append({
                "hash": message["hash"],
                "date": message["date"],
                "sender": message["sender"],
                "channel": message["channel"],
                "type_hash": hash_info["Type"],
                # Add more fields as needed
            })

        # Save the aggregated info as a JSON file
        aggregated_json = json.dumps(aggregated_info, indent=4)
        aggregated_path = Path("aggregated_messages.json")
        aggregated_path.write_text(aggregated_json)

        # Upload the JSON file to IPFS
        cid = await client.add(aggregated_path)
        print(f"Uploaded aggregated messages info with CID: {cid}")

        return cid
    finally:
        await client.close()

async def upload_site(files: List[Path], multiaddr: Multiaddr, batch_size=10) -> CID:
    client = aioipfs.AsyncIPFS(maddr=multiaddr)

    try:
        cid = None
        total_files = len(files)
        for i in range(0, total_files, batch_size):
            batch = files[i:i+batch_size]
            print(f"Uploading batch of files {i+1} to {min(i+batch_size, total_files)} out of {total_files}...")
            async for added_file in client.add(*batch, recursive=True, wrap_with_directory=False):
                print(f"Uploaded file {added_file['Name']} with CID: {added_file['Hash']}")
                cid = added_file["Hash"]  # Update cid with the latest file's CID
            print(f"Batch of files {i+1} to {min(i+batch_size, total_files)} uploaded.")
        # The last CID is the CID of the directory uploaded
        return cid or raise_no_cid()
    finally:
        await client.close()

async def pin_file(cid: CID):
    try:
        # Use subprocess to call Aleph CLI and pin the file
        result = subprocess.run(["aleph", "file", "pin", cid], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully pinned CID: {cid}")
        else:
            print(f"Failed to pin CID: {cid}\n{result.stderr}")
    except Exception as e:
        print(f"An error occurred while pinning CID: {cid}\n{e}")

@app.route('/upload', methods=['POST'])
async def upload_file():
    # Code to handle file upload
    # Assuming files are received in the request and stored in a directory
    files = request.files.getlist('files')
    multiaddr = "/dns6/ipfs-2.aleph.im/tcp/443/https"
    cid = await upload_site(files, multiaddr)
    await pin_file(cid)
    return jsonify({"CID": cid}), 200

@app.route('/get/<string:CID>', methods=['GET'])
def get_file(CID):
    # Code to retrieve file using CID
    # Assuming CID is provided in the URL
    return jsonify({"CID": CID}), 200

@app.route('/list_files', methods=['GET'])
def list_files():
    # Code to list files (JSON format) - hash, date, sender, channel
    # Assuming files information is retrieved and formatted as JSON
    files_info = [...]  # Replace [...] with actual files information
    return jsonify(files_info), 200

@app.route('/runtime/add_file', methods=['POST'])
def runtime_add_file():
    # Code to add file during runtime
    # Assuming file is received in the request
    return jsonify({"message": "File added successfully"}), 200

@app.route('/runtime/remove_file', methods=['POST'])
def runtime_remove_file():
    # Code to remove file during runtime
    # Assuming file is removed based on some criteria provided in the request
    return jsonify({"message": "File removed successfully"}), 200

@app.route('/login_crypto_wallet', methods=['GET'])
def login_crypto_wallet():
    # Code to login to crypto wallet (private key provided)
    private_key = "0xd6cfc7c37C7E3F7a3AC942eb0a341DfB8d938DEE"
    return jsonify({"private_key": private_key}), 200

async def main_async():
    messages = [...]  # Replace [...] with your list of message dictionaries containing hash, date, sender, channel, etc.
    multiaddr = "/dns6/ipfs-2.aleph.im/tcp/443/https"
    await aggregate_messages_hashes(messages, multiaddr)

def POST():
    asyncio.run(main_async())

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    POST()
