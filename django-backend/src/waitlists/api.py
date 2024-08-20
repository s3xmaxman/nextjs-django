from ninja import Router
from typing import List
import helpers
from ninja_jwt.authentication import JWTAuth

from django.shortcuts import get_object_or_404
from .forms import WaitlistEntryCreateForm
from .schemas import (
    WaitlistEntryListSchema,
    WaitlistEntryDetailSchema,
    WaitlistEntryCreateSchema,
    ErrorWaitlistEntryCreateSchema,
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


@router.post(
    "",
    response={
        200: WaitlistEntryDetailSchema,
        400: ErrorWaitlistEntryCreateSchema,
    },
    auth=helpers.api_auth_user_or_annon,
)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    form = WaitlistEntryCreateForm(data.dict())
    if form.is_valid():
        obj = form.save(commit=False)

        if request.user.is_authenticated:
            obj.user = request.user
        obj.save()
    return obj


@router.get(
    "{entry_id}",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def list_waitlist_entries(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)

    return obj
