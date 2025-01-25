# routers/notifications.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models.notifications import Notification
from app.database import get_db
from sqlalchemy.dialects.postgresql import UUID

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/")
def get_all_notifications(db: Session = Depends(get_db)):
    notifications = db.query(Notification).all()
    return notifications

@router.get("/{notification_id}")
def get_notification_by_id(notification_id: str, db: Session = Depends(get_db)):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification