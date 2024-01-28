"use client";
import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { getCsrfToken } from "next-auth/react";

export default function HealthCheck() {
  const [response, setResponse] = useState<string | undefined>("");

  const buttonHandler = async () => {
    try {
      // Normally you'd use GET here, but we want to show how to do CSRF protection too,
      // Which with the default configuration doesn't happen on GET requests
      const csrfToken = await getCsrfToken();

      if (!csrfToken) {
        throw new Error("No csrf token");
      }

      console.log(csrfToken);
      // const res2 = await
      const res = await fetch(`http://localhost:8000/auth/`, {
        // method: "GET",
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-Token": csrfToken,
        },
      });
      const res_json = await res.json();
      setResponse(res_json.message);
    } catch (e) {
      setResponse("error");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={buttonHandler}>Talk to FastAPI!</Button>
      {response ? <pre> {response} </pre> : null}
    </div>
  );
}
