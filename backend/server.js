const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Change to your verified domain email if you have one
            to: process.env.YOUR_EMAIL_ADDRESS, // Your actual email address where you want to receive messages
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Message from Portfolio Website</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
    console.log(`Don't forget to set up your .env file with RESEND_API_KEY and YOUR_EMAIL_ADDRESS`);
});
