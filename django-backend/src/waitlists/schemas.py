from ninja import Schema
from typing import List, Any, Optional
from datetime import datetime
from pydantic import EmailStr


class WaitlistEntryCreateSchema(Schema):
    """
    ウェイトリスト作成用のスキーマ
    主な仕様: ユーザーのメールアドレスを受け取る
    制限事項: メールアドレスの形式チェックは行わない
    """

    email: EmailStr


class ErrorWaitlistEntryCreateSchema(Schema):
    """
    ウェイトリストエントリー作成エラー用のスキーマ
    主な仕様: エラー発生時のメールアドレスに関するエラー情報を返す
    制限事項: エラーの詳細情報はリスト形式で返すが、内容の検証は行わない
    """

    email: List[Any]


class WaitlistEntryListSchema(Schema):
    """
    ウェイトリストエントリー一覧用のスキーマ
    主な仕様: ユーザーのメールアドレスとタイムスタンプを返す
    制限事項: タイムスタンプの形式チェックは行わない
    """

    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime
    description: Optional[str] = ""


class WaitlistEntryDetailSchema(Schema):
    """
    ウェイトリストエントリー詳細用のスキーマ
    主な仕様: ユーザーのメールアドレスとタイムスタンプを返す
    制限事項: タイムスタンプの形式チェックは行わない
    """

    email: EmailStr
    updated: datetime
    timestamp: datetime
