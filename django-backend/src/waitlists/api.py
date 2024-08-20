from ninja import Router
from typing import List
import json
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
        201: WaitlistEntryDetailSchema,
        400: ErrorWaitlistEntryCreateSchema,
    },
    auth=helpers.api_auth_user_or_annon,
)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    """
    待機リストエントリを作成する

    Args:
        request (HttpRequest): リクエストオブジェクト
        data (WaitlistEntryCreateSchema): 待機リストエントリのデータ

    Returns:
        tuple: (HTTPステータスコード, 待機リストエントリオブジェクト または エラー情報)
    """
    form = WaitlistEntryCreateForm(data.dict())

    if not form.is_valid():
        # フォームのバリデーションが失敗した場合、エラー情報を返す
        form_errors = json.loads(form.errors.as_json())
        return 400, form_errors

    obj = form.save(commit=False)

    if request.user.is_authenticated:
        # ユーザーが認証されている場合は、ユーザーを待機リストエントリに紐付ける
        obj.user = request.user
    obj.save()
    return 201, obj


@router.get(
    "{entry_id}",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def list_waitlist_entries(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)

    return obj
