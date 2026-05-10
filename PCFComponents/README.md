# Campus Connect - PCF Components (CampusChatbot)

Welcome to the **PCF Components** module of the **Campus Connect** project. This directory contains custom-built Power Apps Component Framework (PCF) controls, primarily featuring the advanced **CampusChatbot** widget.

## Overview

While Power Apps provides excellent out-of-the-box controls, Campus Connect requires a bespoke, highly interactive, and visually stunning AI chatbot interface. The **CampusChatbot** PCF component delivers a React-based, glassmorphism UI embedded directly into the Power Apps environment.

## Key Features of CampusChatbot

- **Glassmorphism UI:** Features a modern, sleek design with blurred backgrounds and dynamic visual feedback that enhances the premium feel of the platform.
- **React Integration:** Built using React to provide a fluid, single-page-application feel within the Power App host.
- **RAG (Retrieval-Augmented Generation) Capabilities:** Designed to handle complex, multi-turn conversations based on campus-specific data.
- **Rich Media & Markdown Support:** The message list component can parse and beautifully render structured responses, tables, and lists.
- **Seamless Communication:** Communicates directly with the `groot-backend` server for secure and blazing-fast Groq AI inferences.

## Technology Stack

- **Framework:** Power Apps Component Framework (PCF)
- **Language:** TypeScript & React (`.tsx`)
- **Build Tools:** Microsoft `pcf-scripts`, ESLint, Webpack
- **Styling:** Custom Vanilla CSS tailored for dynamic aesthetics and modern typography.

## Development Commands

This project uses standard PCF lifecycle commands:

- `npm run build`: Compiles the component for deployment.
- `npm run start`: Runs a local test harness to preview the chatbot outside of Power Apps.
- `npm run lint`: Analyzes the TypeScript code for best practices using `@microsoft/eslint-plugin-power-apps`.

---
*The custom PCF controls represent the bleeding edge of user experience within the Campus Connect ecosystem, bringing native web-app fluidity into the Power Platform.*
