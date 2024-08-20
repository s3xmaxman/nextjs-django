from ninja import Router
from typing import List
import helpers
from ninja_jwt.authentication import JWTAuth

from django.shortcuts import get_object_or_404

from .schemas import (
    WaitlistEntryListSchema,
    WaitlistEntryDetailSchema,
    WaitlistEntryCreateSchema,
)
from .models import WaitlistEntry


router = Router()


@router.get(
    "",
    response=List[WaitlistEntryListSchema],
    auth=helpers.api_auth_user_or_annon,
)
def list_waitlist_entries(request):
    qs = WaitlistEntry.objects.filter(user=request.user)

    return qs


@router.post("", auth=helpers.api_auth_user_or_annon)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    print(data)
    obj = WaitlistEntry.objects.create(**data.dict())

    return obj


@router.get(
    "{entry_id}",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def list_waitlist_entries(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)

    return obj
