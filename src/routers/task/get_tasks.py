from fastapi import APIRouter, status
from src.clients import get_firestore_client
from src.model.app.task import Task

router = APIRouter()

@router.get("/tasks", status_code=status.HTTP_200_OK)
async def get_tasks_async(org_id: str, project_id: str) -> list[Task]:
    """
    Fetches all tasks for a given project.
    """
    firestore_client = get_firestore_client()
    tasks = await firestore_client.get_tasks_async(org_id, project_id)
    return tasks
