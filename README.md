# Solar Delay & Risk Monitoring System

A full-stack web application designed to help solar installation companies track projects, monitor milestone delays, manage installers, and reduce operational risks through role-based dashboards and real-time project monitoring.

---

# Features

## Authentication & Authorization
- JWT-based authentication
- Secure login system
- Protected routes
- Role-based access control

## Role-Based Dashboards

### Admin Dashboard
- View all projects
- Monitor overall risk
- Track delayed projects
- Create new projects

### Manager Dashboard (FlowX)
- Manage assigned projects
- Monitor installers
- Track milestone progress
- Identify project risks

### Installer Dashboard (FixX)
- View assigned projects only
- Update milestone statuses
- Track installation workflow

---

# Project Management

- Create and manage solar projects
- Assign installers and managers
- Track project status
- Monitor risk scores
- View project details

---

# Milestone Tracking

Each project contains milestones such as:
- Site Inspection
- Panel Installation
- Electrical Wiring
- Final Testing

Installers can:
- Start milestones
- Complete milestones
- Update progress in real time

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend
- Node.js
- Express.js
- JWT Authentication
- PostgreSQL

## Database
- PostgreSQL
- pgAdmin

---

# Folder Structure

```bash
solar-delay-system/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md

```
git clone https://github.com/saicharan4316/Lumenor_assessment.git ||
cd solar-delay-system/backend ||
npm install

#### DOT ENV VARIABLES---
PORT=5000
DATABASE_URL=postgresql://postgres:Saivarsha%40123@127.0.0.1:5500/solar_delay_system
JWT_SECRET=supersecretkey

npm run dev ||
cd solar-delay-system/frontend ||
npm install ||
npm run dev

#########


API Features
Authentication APIs
Register User
Login User
Project APIs
Create Project
Get All Projects
Get Project By ID
Milestone APIs
Get Milestones
Update Milestone Status
Security Features
Protected backend routes
JWT token verification
Role-based restrictions
Installer permission limitations
Future Improvements
Notification system
Delay prediction using AI/ML
Analytics dashboard
Real-time updates using sockets
File upload support
Deployment on AWS/Vercel
Purpose of the Project

This platform was built to solve operational inefficiencies in solar installation workflows by centralizing project tracking, milestone monitoring, installer management, and risk visibility into a single dashboard system.

Author
Sai Charan Utukuri

