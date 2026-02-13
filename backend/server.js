const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder for Paystack Secret Key
// User must create a .env file with PAYSTACK_SECRET_KEY=sk_test_...
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_YOUR_SECRET_KEY_HERE";

app.post("/api/verify-payment", async (req, res) => {
    const { reference } = req.body;

    if (!reference) {
        return res.status(400).json({ status: false, message: "Reference is required" });
    }

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });

        const data = response.data;

        if (data.status && data.data.status === "success") {
            // Payment verified successfully
            // Here you can save the successful transaction to a database if you had one
            return res.json({ status: true, message: "Payment verified", data: data.data });
        } else {
            return res.status(400).json({ status: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Paystack verification error:", error.response?.data || error.message);
        return res.status(500).json({ status: false, message: "Verification server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
