"use server";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair";

export async function POST(request: Request) {
  const requestData = await request.json();

  const jsonData = JSON.stringify(requestData);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };

  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    return NextResponse.json(
      { loggedIn: true, ...responseData },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { loggedIn: false, ...responseData },
    { status: 400 }
  );
}
