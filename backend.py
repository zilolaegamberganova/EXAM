from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from database import init_db, get_all_tasks, save_all_tasks

app = FastAPI()
init_db()

class TaskModel(BaseModel):
    id: int
    text: str
    status: str

@app.get("/api/tasks")
def get_tasks():
    return get_all_tasks()

@app.post("/api/tasks")
def update_tasks(new_tasks: list[TaskModel]): 
    
    tasks_to_save = [task.model_dump() for task in new_tasks]
    save_all_tasks(tasks_to_save)
    return {"status": "success", "message": "Bazaga yozildi!"}


@app.get("/")
def read_index(): 
    return FileResponse("index.html")
app.mount("/", StaticFiles(directory="."), name="static")
