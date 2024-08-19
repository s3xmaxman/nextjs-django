import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = `http://127.0.0.1:8001/api/waitlists/`;

export async function GET(request: Request) {
  const authToken = getToken();

  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(DJANGO_API_WAITLISTS_URL, options);
  console.log(response);

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json({ ...result }, { status: 400 });
  }

  return NextResponse.json({ ...result }, { status: 200 });
}
