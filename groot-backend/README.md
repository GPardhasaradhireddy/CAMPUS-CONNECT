# Campus Connect - Groot Backend (AI Proxy)

Welcome to the **Groot Backend** module of the **Campus Connect** project. This directory contains the Node.js server that securely powers the AI interactions for the Campus Connect platform.

## Overview

The Groot Backend serves as a secure middleware and proxy between the Campus Connect frontend (Power Apps / PCF Controls) and the **Groq AI API**. By routing requests through this dedicated backend, we ensure that API keys remain secure on the server side and that we can effectively manage, log, and format AI inference requests.

## Features

- **Secure API Key Management:** Prevents the exposure of the Groq API key to the client side.
- **High-Speed Inference:** Leverages the `groq-sdk` for ultra-fast, low-latency LLM responses to power the 24/7 campus assistant.
- **CORS Configured:** Securely configured using `cors` to accept requests only from authenticated Campus Connect environments.
- **RESTful Endpoints:** Express-based routing to handle varied AI requests such as chat completions, RAG data ingestion, and priority predictions.

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js (`^5.2.1`)
- **AI SDK:** Groq SDK (`^1.1.2`)
- **Environment Management:** dotenv (`^17.4.2`)
- **Security:** CORS (`^2.8.6`)

## How It Works
1. The student interacts with the PCF Chatbot component in Power Apps.
2. The component sends an HTTP POST request to this Express server.
3. The server constructs the prompt with the appropriate context and system instructions.
4. The server securely calls the Groq AI API.
5. The processed response is returned to the frontend widget for the user to view.

---
*This backend ensures our AI features are fast, reliable, and fundamentally secure against client-side tampering.*
