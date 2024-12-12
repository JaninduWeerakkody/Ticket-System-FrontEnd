# Frontend README

This README provides information on how to set up and run the frontend portion of the Ticket Management System.

## Prerequisites
- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js)

---

## Installation and Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm start
   ```
   The frontend will be running at [http://localhost:3000](http://localhost:3000).

---

## Usage Instructions

1. **Configure the Ticket System**
   - Open the web app at [http://localhost:3000](http://localhost:3000).
   - Fill in the fields in the **System Configuration** form.
   - Click **Submit** to save the configuration.

2. **Start and Stop the System**
   - Use the **Start** and **Stop** buttons to control the ticket system.

3. **View Ticket Status**
   - View real-time ticket status under the **Ticket Status** section.

4. **Check System Logs**
   - View and clear system logs in the **System Logs** section.

---

## Project Structure

```
frontend/
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Main pages for navigation
│   ├── assets/       # Static files (images, styles, etc.)
```

---

## Troubleshooting

| **Issue**         | **Solution**                            |
|------------------|-----------------------------------------|
| UI not loading    | Ensure `npm start` is running. Check for errors in the terminal. |

---
