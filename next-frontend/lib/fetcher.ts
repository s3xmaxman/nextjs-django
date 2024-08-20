/**
 * FetchError クラスは、フェッチリクエストが失敗したときにスローされるエラーを表します。
 * @extends Error
 */
class FetchError extends Error {
  /** HTTPステータスコード */
  status: number;
  /** エラーに関する追加情報 */
  info: any;

  /**
   * FetchError のインスタンスを生成します。
   * @param message エラーメッセージ
   * @param status HTTPステータスコード
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * 指定されたURLからデータをフェッチする関数。
 * @param url フェッチ先のURL
 * @returns フェッチしたデータ
 * @throws FetchError データのフェッチに失敗した場合
 */
const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new FetchError(
      "An error occurred while fetching the data.",
      res.status
    );

    error.info = await res.json();
    throw error;
  }

  return res.json();
};

export default fetcher;
