import sqlite3

DB_NAME = "todo.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            text TEXT NOT NULL,
            status TEXT NOT NULL         
        )
    """)
    conn.commit()
    conn.close()

def get_all_tasks():
    conn = sqlite3.connect(DB_NAME) 
    cursor = conn.cursor()
    cursor.execute("SELECT id, text, status FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r[0], "text": r[1], "status": r[2]} for r in rows]

def save_all_tasks(tasks):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks")
    for t in tasks:
        cursor.execute("INSERT INTO tasks (id, text, status) VALUES (?, ?, ?)", (t['id'], t['text'], t['status']))
    conn.commit()
    conn.close()
