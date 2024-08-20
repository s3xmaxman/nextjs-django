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
    WaitlistEntryUpdateSchema,
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
    "{entry_id}/",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def get_wailist_entry(request, entry_id: int):
    """
    待機リストエントリを取得する

    Args:
        request (HttpRequest): リクエストオブジェクト
        entry_id (int): 取得する待機リストエントリのID

    Returns:
        WaitlistEntryDetailSchema: 待機リストエントリオブジェクト

    Raises:
        Http404: 指定されたIDの待機リストエントリが存在しない場合
    """
    obj = get_object_or_404(
        WaitlistEntry,
        id=entry_id,
        user=request.user,
    )
    return obj


@router.put(
    "{entry_id}/",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def update_waitlist_entry(
    request,
    entry_id: int,
    payload: WaitlistEntryUpdateSchema,
):
    """
    待機リストエントリを更新する

    Args:
        request (HttpRequest): リクエストオブジェクト
        entry_id (int): 更新する待機リストエントリのID
        payload (WaitlistEntryUpdateSchema): 更新するデータ

    Returns:
        WaitlistEntryDetailSchema: 更新された待機リストエントリオブジェクト

    Raises:
        Http404: 指定されたIDの待機リストエントリが存在しない場合
    """
    # IDとユーザーに一致する待機リストエントリを取得する。存在しない場合は404を返す
    obj = get_object_or_404(
        WaitlistEntry,
        id=entry_id,
        user=request.user,
    )

    # リクエストのペイロードを辞書に変換
    payload_dict = payload.dict()

    # 各フィールドを更新
    for key, value in payload_dict.items():
        setattr(obj, key, value)

    # 更新したオブジェクトを保存
    obj.save()

    # 更新されたオブジェクトを返す
    return obj


@router.delete(
    "{entry_id}/delete/",
    response=WaitlistEntryDetailSchema,
    auth=helpers.api_auth_user_required,
)
def delete_waitlist_entry(request, entry_id: int):
    """
    待機リストエントリを削除する

    Args:
        request (HttpRequest): リクエストオブジェクト
        entry_id (int): 削除する待機リストエントリのID

    Returns:
        WaitlistEntryDetailSchema: 削除された待機リストエントリオブジェクト

    Raises:
        Http404: 指定されたIDの待機リストエントリが存在しない場合
    """
    obj = get_object_or_404(
        WaitlistEntry,
        id=entry_id,
        user=request.user,
    )
    obj.delete()
    return obj
