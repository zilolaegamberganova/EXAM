from database import init_db,get_all_tasks,save_all_tasks

"""Testing the database"""

def test_database():
    init_db()

    test_tasks=[
        {"id":1,"text":"Test vazifa","status":"active"}
    ]

    save_all_tasks(test_tasks)

    tasks=get_all_tasks()

    assert len(tasks)>0
    
    print("You passed a test succesfully ")

    if __name__ == "__main__":
      test_databse()

tasks=get_all_tasks()
assert len(tasks)>0

print("Seccesfully passed a test!:Bazaga malumotlar yozildi ")