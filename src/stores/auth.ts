import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: localStorage.getItem("username") || null,
      token: localStorage.getItem("token") || "",
      returnUrl: "/",
      role: localStorage.getItem("role") || null,
    };
  },
  actions: {
    async login(username: string, password: string) {
      const response = await fetch("http://localhost:9191/authenticate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status == 200) {
        const tokenString = await response.text();
        const tokenObject = JSON.parse(tokenString);
        const bearerToken = tokenObject.token;

        // Store token and username in local storage
        localStorage.setItem("token", bearerToken);
        localStorage.setItem("username", username);

        // Get user role from backend API
        const roleResponse = await fetch(`http://localhost:9191/${username}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (roleResponse.status == 200) {
          const roleString = await roleResponse.text();
          const roleObject = roleString;

          // Store user and role in Pinia store and localStorage
          this.user = username;
          this.token = bearerToken;
          this.role = roleObject;
          localStorage.setItem("role", roleObject);
        } else {
          // Handle error getting user role
          console.error("Error getting user role:", roleResponse);
          // Set role to null to avoid errors later on
          this.role = null;
        }

        router.push(this.returnUrl || "/");
      }
    },
  },
});
