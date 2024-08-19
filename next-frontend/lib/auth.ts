/**
 * 認証トークンを管理するためのユーティリティ関数を提供します。
 * 主な機能:
 * - トークンの取得
 * - トークンの削除
 * - トークンの設定
 * - リフレッシュトークンの設定
 * 制限事項:
 * - クッキーはHTTPOnlyであり、JavaScriptからアクセスできません。
 */

const { cookies } = require("next/headers");

const TOKEN_NAME = "auth-token"; // 認証トークンの名前
const TOKEN_REFRESH_NAME = "auth-refresh-token"; // リフレッシュトークンの名前
const TOKEN_AGE = 3600; // トークンの有効期限（秒）

/**
 * 認証トークンを取得します。
 * @returns {string | undefined} トークンの値。トークンが存在しない場合はundefined。
 */
export function getToken() {
  const myAuthToken = cookies().get(TOKEN_NAME);
  return myAuthToken?.value;
}

/**
 * トークンを削除します。
 * @returns {void}
 */
export function deleteTokens() {
  cookies().delete(TOKEN_REFRESH_NAME);
  return cookies().delete(TOKEN_NAME);
}

/**
 * 認証トークンを設定します。
 * @param {string} authToken - 設定する認証トークン。
 * @returns {void}
 */
export function setToken(authToken: string) {
  return cookies().set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

/**
 * リフレッシュトークンを設定します。
 * @param {string} authRefreshToken - 設定するリフレッシュトークン。
 * @returns {void}
 */
export function setRefreshToken(authRefreshToken: string) {
  // login
  return cookies().set({
    name: TOKEN_REFRESH_NAME,
    value: authRefreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}
