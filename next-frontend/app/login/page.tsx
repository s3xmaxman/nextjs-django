"use client";
import React from "react";

// const LOGIN_URL = "http://127.0.0.1:8001/api/token/pair";
const LOGIN_URL = "/api/login/";

const page = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event, event.target);
    const formData = new FormData(event.target as HTMLFormElement);
    const objectFormData = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFormData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData,
    };
    const response = await fetch(LOGIN_URL, requestOptions);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div className="h-[95vh]">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" required name="username" placeholder="username" />
        <input
          type="password"
          required
          name="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
