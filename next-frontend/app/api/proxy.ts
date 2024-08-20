import { getToken } from "@/lib/auth";

/**
 * @class ApiProxy
 * @classdesc APIリクエストをプロキシするためのクラス
 */
export default class ApiProxy {
  /**
   * @method getHeaders
   * @description 認証が必要な場合に適切なヘッダーを取得します。
   * @param {boolean} requireAuth - 認証が必要かどうか
   * @returns {Promise<Record<string, string>>} ヘッダーオブジェクト
   */
  static async getHeaders(
    requireAuth: boolean
  ): Promise<Record<string, string>> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const authToken = getToken();
    if (authToken && requireAuth === true) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  }

  /**
   * @method handleFetch
   * @description APIエンドポイントにリクエストを送信し、レスポンスを処理します。
   * @param {string} endpoint - APIエンドポイントのURL
   * @param {RequestInit} requestOptions - リクエストオプション
   * @returns {Promise<{data: any, status: number}>} レスポンスデータとステータスコード
   */
  static async handleFetch(
    endpoint: string,
    requestOptions: RequestInit
  ): Promise<{ data: any; status: number }> {
    let data: any = {};
    let status: number = 500;
    try {
      const response = await fetch(endpoint, requestOptions);
      data = await response.json();
      status = response.status;
    } catch (error) {
      data = { message: "Cannot reach API server", error: error };
      status = 500;
    }
    return { data, status };
  }

  /**
   * @method put
   * @description PUTリクエストを送信します。
   * @param {string} endpoint - APIエンドポイントのURL
   * @param {object} object - 送信するデータオブジェクト
   * @param {boolean} requireAuth - 認証が必要かどうか
   * @returns {Promise<{data: any, status: number}>} レスポンスデータとステータスコード
   */
  static async put(
    endpoint: string,
    object: object,
    requireAuth: boolean
  ): Promise<{ data: any; status: number }> {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: headers,
      body: jsonData,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  /**
   * @method delete
   * @description DELETEリクエストを送信します。
   * @param {string} endpoint - APIエンドポイントのURL
   * @param {boolean} requireAuth - 認証が必要かどうか
   * @returns {Promise<{data: any, status: number}>} レスポンスデータとステータスコード
   */
  static async delete(
    endpoint: string,
    requireAuth: boolean
  ): Promise<{ data: any; status: number }> {
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: headers,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  /**
   * @method post
   * @description POSTリクエストを送信します。
   * @param {string} endpoint - APIエンドポイントのURL
   * @param {object} object - 送信するデータオブジェクト
   * @param {boolean} requireAuth - 認証が必要かどうか
   * @returns {Promise<{data: any, status: number}>} レスポンスデータとステータスコード
   */
  static async post(
    endpoint: string,
    object: object,
    requireAuth: boolean
  ): Promise<{ data: any; status: number }> {
    const jsonData = JSON.stringify(object);
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: jsonData,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }

  /**
   * @method get
   * @description GETリクエストを送信します。
   * @param {string} endpoint - APIエンドポイントのURL
   * @param {boolean} requireAuth - 認証が必要かどうか
   * @returns {Promise<{data: any, status: number}>} レスポンスデータとステータスコード
   */
  static async get(
    endpoint: string,
    requireAuth: boolean
  ): Promise<{ data: any; status: number }> {
    const headers = await ApiProxy.getHeaders(requireAuth);
    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
    };
    return await ApiProxy.handleFetch(endpoint, requestOptions);
  }
}
