from ninja import Router
from typing import List

from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailSchema
from .models import WaitlistEntry


router = Router()


@router.get("", response=List[WaitlistEntryListSchema], auth=JWTAuth())
def list_waitlist_entries(request):
    qs = WaitlistEntry.objects.all()

    return qs


@router.get("{entry_id}", response=WaitlistEntryDetailSchema, auth=JWTAuth())
def list_waitlist_entries(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id)

    return obj
