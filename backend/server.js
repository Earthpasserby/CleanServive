const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Paystack Secret Key (must be provided via .env)
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET_KEY) {
    throw new Error("PAYSTACK_SECRET_KEY is missing. Set it in backend/.env");
}

app.post("/api/initialize-payment", async (req, res) => {
    const { email, amount, metadata, reference, callback_url } = req.body;

    if (!email || !amount) {
        return res.status(400).json({
            status: false,
            message: "Email and amount are required",
        });
    }

    try {
        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount, // amount in kobo
                metadata,
                reference,
                callback_url,
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            },
        );

        return res.json(response.data);
    } catch (error) {
        console.error("Paystack initialize error:", error.response?.data || error.message);
        return res.status(500).json({
            status: false,
            message: "Initialization server error",
        });
    }
});

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
        const status = error.response?.status || 500;
        const payload = error.response?.data || {
            status: false,
            message: "Verification server error",
        };
        console.error("Paystack verification error:", payload);
        return res.status(status).json(payload);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
