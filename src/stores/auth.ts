import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: null,
      token: "",
      returnUrl: "/",
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

        //const token = await response.text();
        this.user = username;
        this.token = bearerToken;
        router.push(this.returnUrl || "/");
      }
    },
    logout() {
      this.user = null;
      this.token = "";
      router.push("/login");
    },
  },
});
