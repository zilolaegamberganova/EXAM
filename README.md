# 🚀 Flashcard Board (FastAPI + SQLite + JavaScript)

A modern, full-stack Kanban board web application built with a FastAPI backend, SQLite database, and an interactive frontend interface.

## 🛠 Technologies Used
* **Backend:** Python, FastAPI, Uvicorn, Pydantic[cite: 2]
* **Database:** SQLite3[cite: 6]
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API, Drag & Drop)[cite: 9]

## 📌 Features
* Interactive Kanban columns (Todo, Important, Accomplished, Trash)[cite: 14].
* Data persistence using SQLite (`database.py`)[cite: 6].
* Real-time progress bar tracking completed tasks and percentages[cite: 15].
* Automated API documentation via Swagger UI (`/docs`).

## ⚙️ How to Run Locally

1. Start the FastAPI backend server:
   ```bash
   uvicorn backend:app --reload
