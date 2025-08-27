from fastapi import APIRouter, status
from src.clients import get_firestore_client
from src.model.app.project import Project

router = APIRouter()

@router.get("/projects", status_code=status.HTTP_200_OK)
async def get_projects_async(org_id: str) -> list[Project]:
    """
    Fetches all projects for a given organization.
    """
    firestore_client = get_firestore_client()
    projects = await firestore_client.get_projects_async(org_id)
    return projects
