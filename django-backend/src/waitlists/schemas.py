from ninja import Schema
from datetime import datetime
from pydantic import EmailStr


class WaitlistCreateSchema(Schema):
    """
    ウェイトリスト作成用のスキーマ
    主な仕様: ユーザーのメールアドレスを受け取る
    制限事項: メールアドレスの形式チェックは行わない
    """

    email: EmailStr  # メールアドレス


class WaitlistEntryDetailSchema(Schema):
    """
    ウェイトリストエントリー詳細用のスキーマ
    主な仕様: ユーザーのメールアドレスとタイムスタンプを返す
    制限事項: タイムスタンプの形式チェックは行わない
    """

    email: EmailStr  # メールアドレス
    timestamp: datetime  # タイムスタンプ
