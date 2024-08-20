from typing import List, Any, Optional
from datetime import datetime
from ninja import Schema
from pydantic import EmailStr


class WaitlistEntryCreateSchema(Schema):
    """
    ウェイトリストエントリ作成スキーマ
    Attributes:
        email (EmailStr): メールアドレス
    """

    email: EmailStr


class ErrorWaitlistEntryCreateSchema(Schema):
    """
    ウェイトリストエントリ作成エラースキーマ
    Attributes:
        email (List[Any]): メールアドレスのエラー情報
    """

    email: List[Any]


class WaitlistEntryListSchema(Schema):
    """
    ウェイトリストエントリ一覧スキーマ
    Attributes:
        id (int): エントリID
        email (EmailStr): メールアドレス
        updated (datetime): 更新日時
        timestamp (datetime): 作成日時
        description (Optional[str]): 説明（省略可）
    """

    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime
    description: Optional[str] = ""


class WaitlistEntryDetailSchema(Schema):
    """
    ウェイトリストエントリ詳細スキーマ
    Attributes:
        id (int): エントリID
        email (EmailStr): メールアドレス
        updated (datetime): 更新日時
        timestamp (datetime): 作成日時
        description (Optional[str]): 説明（省略可）
    """

    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime
    description: Optional[str] = ""


class WaitlistEntryUpdateSchema(Schema):
    """
    ウェイトリストエントリ更新スキーマ
    Attributes:
        description (str): 説明（デフォルトは空文字列）
    """

    description: str = ""
