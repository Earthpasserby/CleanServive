const axios = require("axios");

async function testBackend() {
  const baseUrl = "http://localhost:5000";

  const initUrl = `${baseUrl}/api/initialize-payment`;
  console.log(`Testing Backend Connection: POST ${initUrl}`);
  console.log("Initializing payment with dummy email/amount...");

  let reference = null;
  try {
    const initResponse = await axios.post(initUrl, {
      email: "test@example.com",
      amount: 10000, // 100 NGN in kobo
    });
    console.log("Init Success! Server responded:", initResponse.data);
    reference = initResponse.data?.data?.reference || null;
  } catch (error) {
    if (error.response) {
      console.log("Server Reached! (Init responded with error):");
      console.log(`Status: ${error.response.status}`);
      console.log("Message:", error.response.data);
    } else if (error.request) {
      console.error(
        "Error: No response received. Is the server running on port 5000?",
      );
    } else {
      console.error("Error:", error.message);
    }
    return;
  }

  const verifyUrl = `${baseUrl}/api/verify-payment`;
  console.log(`Testing Backend Connection: POST ${verifyUrl}`);
  console.log(
    `Sending reference: '${reference || "TEST_REF_123"}' (expected to be unpaid) ...`,
  );

  try {
    const response = await axios.post(verifyUrl, {
      reference: reference || "TEST_REF_123",
    });
    console.log("Verify Success! Server responded:", response.data);
  } catch (error) {
    if (error.response) {
      // The server responded with a status code explicitly (e.g., 400 Bad Request)
      // This means the server IS working but rejected the fake reference (which is expected)
      console.log(
        "Server Reached! (Responded with error as expected for fake ref):",
      );
      console.log(`Status: ${error.response.status}`);
      console.log("Message:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(
        "Error: No response received. Is the server running on port 5000?",
      );
    } else {
      console.error("Error:", error.message);
    }
  }
}

testBackend();
