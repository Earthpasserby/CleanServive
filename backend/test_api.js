const axios = require('axios');

async function testBackend() {
    const url = 'http://localhost:5000/api/verify-payment';
    console.log(`Testing Backend Connection: POST ${url}`);
    console.log("Sending dummy reference: 'TEST_REF_123'...");

    try {
        const response = await axios.post(url, {
            reference: 'TEST_REF_123'
        });
        console.log("✅ Success! Server responded:", response.data);
    } catch (error) {
        if (error.response) {
            // The server responded with a status code explicitly (e.g., 400 Bad Request)
            // This means the server IS working but rejected the fake reference (which is expected)
            console.log("✅ Server Reached! (Responded with error as expected for fake ref):");
            console.log(`Status: ${error.response.status}`);
            console.log("Message:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("❌ Error: No response received. Is the server running on port 5000?");
        } else {
            console.error("❌ Error:", error.message);
        }
    }
}

testBackend();
