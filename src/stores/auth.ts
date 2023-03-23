import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: null,
      token: localStorage.getItem("token") || "",
      returnUrl: "/",
      role: null,
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

        // Store token in local storage
        localStorage.setItem("token", bearerToken);

        //const token = await response.text();
        this.user = username;
        this.token = bearerToken;

        router.push(this.returnUrl || "/");
      }
    },
    logout() {
      // Remove Pinia store data from local storage
      localStorage.removeItem("pinia");

      // Remove JWT token from local storage
      localStorage.removeItem("jwt_token");

      this.user = null;
      this.token = "";
      router.push("/login");
    },
  },
});
