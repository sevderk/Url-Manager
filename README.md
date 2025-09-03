# Proder E-ticaret (URL Manager)

**Proder E-ticaret (URL Manager)** is a Windows desktop application built with **Electron + React (Vite)**.  
It provides a secure login system, password recovery, and an ergonomic interface to manage frequently used URLs.

## ✨ Features

- 🔑 **Authentication**
  - Demo login: `proder` / `proder`
  - Password change & factory reset
  - Security question for password recovery (case-insensitive, Turkish-aware)

- 🌐 **URL Management**
  - Add, remove, and persist URLs
  - Validate format (http/https)
  - One-click “Open All” in the default browser

- 🏠 **Home Screen**
  - Welcome message
  - Quick navigation buttons to URL Manager and Settings
  - Open all saved URLs if available (or show guidance if none exist)

- 🎨 **UI/UX**
  - Clean white theme
  - Proder brand color
  - Modern, minimal layout with clear spacing and typography

---

## 🛠 Tech Stack

- **Electron 31** (main process, preload, packaging)  
- **React 19 + Vite 5** (frontend)  
- **electron-store** (local persistent storage)  
- **electron-builder** (packaging and installer generation)  

---

## 📥 Download Installer

👉 [Download Proder E-ticaret Setup v1.0.1](https://drive.google.com/file/d/1DbveYA8Ovt7RQMa_EgGo0W5yxOJ59XBr/view) 

*(Hosted on Google Drive — click to download and run the installer.)*  

---

## Screenshots

<img width="1446" height="928" alt="image" src="https://github.com/user-attachments/assets/c5e9f5e4-cbe2-43a1-b745-520900173feb" />
<img width="1447" height="931" alt="image" src="https://github.com/user-attachments/assets/56f6ecd0-c661-45d0-9460-b5bd6efed310" />
<img width="1446" height="928" alt="image" src="https://github.com/user-attachments/assets/1f7d5fc7-b32a-4a67-b6d0-700423b1e782" />
<img width="1446" height="931" alt="image" src="https://github.com/user-attachments/assets/391bc6e3-8d2c-4526-a370-c992b5e47cb0" />
<img width="1450" height="913" alt="image" src="https://github.com/user-attachments/assets/e2ab0a62-01e0-4056-9bf1-85a224539e08" />
<img width="1442" height="928" alt="image" src="https://github.com/user-attachments/assets/dff00648-ac5e-4461-afcf-71f83e6f2fa9" />



## 🖥 Installation & Development

### Run in development mode
```bash
cd Url-Manager
npm install
npm run dev
```

- Runs both Vite dev server and Electron main process concurrently.

### Build production installer
```bash
npm run dist
```

- Creates a Windows installer (.exe) inside the release/ folder.

## 👤 Author

Developed by [@sevderk](https://github.com/sevderk)

For Proder Software — published here for portfolio and demonstration purposes.

