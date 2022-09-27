import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();
    console.log(event);
    console.log(user);

    // debugger;
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${user.username}&password=${user.password}`,
      {
        method: "GET",
        // body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
          authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          throw new Error("Invalid username or password");
        }

        localStorage.setItem("token", data.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        alert(error.toString());
      })
      .finally(() => {});
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <table>
          <tr>
            <td>User</td>
            <td>
              <input
                type="text"
                name="username"
                value={user.username ?? ""}
                onChange={(event) =>
                  setUser({ ...user, username: event.target.value })
                }
                required
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                name="password"
                value={user.password ?? ""}
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
                required
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="submit" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Login;
