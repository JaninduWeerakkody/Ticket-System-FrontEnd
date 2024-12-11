README

Introduction

This system is a Ticket Management System designed to simulate and manage ticket generation, retrieval, and monitoring. It consists of a frontend built with React (MUI-based UI) and a backend powered by Spring Boot. The system allows users to configure ticket settings, start/stop operations, and view real-time status, logs, and ticket availability.

Setup Instructions

Prerequisites

To run the project locally, you will need the following installed on your machine:

Frontend Prerequisites

Node.js (version 16 or higher recommended)

npm (comes with Node.js)

Backend Prerequisites

Java (version 17 or higher)

Maven (for building the Spring Boot application)

Installation and Setup

1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Set up the Backend

Navigate to the backend/ directory.

cd backend

Build the application using Maven.

mvn clean install

Run the Spring Boot application.

mvn spring-boot:run

The backend will be running at http://localhost:9095.

3. Set up the Frontend

Navigate to the frontend/ directory.

cd frontend

Install dependencies using npm.

npm install

Run the React development server.

npm start

The frontend will be running at http://localhost:3000.

Usage Instructions

Configuring the System

Open the web app at http://localhost:3000.

Use the System Configuration form to set up ticket system properties, such as:

Total Tickets: Total number of tickets to be released.

Ticket Release Rate: Rate at which tickets are released.

Customer Retrieval Rate: Rate at which customers retrieve tickets.

Max Ticket Capacity: Maximum capacity of available tickets.

Number of Vendors: Number of vendors generating tickets.

Number of Customers: Number of customers retrieving tickets.

Click Submit to save the configuration, which will be sent to the backend for processing.

Starting and Stopping the System

Use the Control Panel to start or stop the ticket system.

Start Button: Starts ticket generation and retrieval.

Stop Button: Stops all ticket activities.

Viewing Ticket Status

View the total available tickets in real-time under the Ticket Status section. The count updates every 2 seconds.

Viewing Logs

The System Logs section displays real-time system logs.

Logs are refreshed every 2 seconds.

Click Clear Logs to delete all system logs.

Project Structure

project-root/
  ├── frontend/   # React application (UI/UX)
  └── backend/    # Spring Boot application (API and logic)

Backend (Spring Boot)

Base URL: http://localhost:9095

Key Directories:

src/main/java/com/yourpackage/: Contains the Java source code.

src/main/resources/: Configuration files, such as application.properties.

Frontend (React + MUI)

Base URL: http://localhost:3000

Key Directories:

src/components/: Contains reusable React components.

src/pages/: Pages that the user can navigate to.

src/assets/: Images, styles, and other static files.

API Endpoints

Configuration Endpoints

Method

Endpoint

Description

POST

/api/config

Sets ticket system configuration

Control Endpoints

Method

Endpoint

Description

POST

/api/start

Starts the ticket system

POST

/api/stop

Stops the ticket system

Ticket Endpoints

Method

Endpoint

Description

GET

/api/tickets/count

Returns available ticket count

Log Endpoints

Method

Endpoint

Description

GET

/api/log

Fetches system logs

DELETE

/api/log

Clears system logs

UI Controls

1. System Configuration

Purpose: Configure ticket-related properties.

Fields:

Total Tickets

Ticket Release Rate

Customer Retrieval Rate

Max Ticket Capacity

Number of Vendors

Number of Customers

Action: Submits configuration to the backend via a POST request to /api/config.

2. Control Panel

Start Button: Sends a POST request to /api/start to start ticket generation.

Stop Button: Sends a POST request to /api/stop to stop ticket generation.

3. Ticket Status

Displays the count of available tickets, fetched from /api/tickets/count.

Updates every 2 seconds.

4. System Logs

Displays logs in reverse chronological order.

Uses /api/log to fetch logs and /api/log (DELETE) to clear them.

Contributing

We welcome contributions! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature/new-feature-name).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/new-feature-name).

Open a pull request.

Troubleshooting

Issue

Solution

Port in use

Make sure ports 3000 and 9095 are free.

Backend errors

Check console logs for stack traces.

UI not loading

Ensure npm start is running. Check for errors in the terminal.

License

This project is licensed under the MIT License.

Contact

If you encounter issues, feel free to open an issue or submit a pull request. For questions, reach out to your-email@example.com.