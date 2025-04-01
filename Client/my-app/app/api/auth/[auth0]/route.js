import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  async callback(req, res) {
    const session = await handleCallback(req, res);
    const user = session?.user;

    if (user) {
      // Send user data to Express backend
      await fetch("http://localhost:5000/api/auth/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Auth_Id: user.sub,
          First_Name: user.given_name,
          Last_Name: user.family_name,
          Email: user.email,
          Username: user.name || null,
          Avatar: user.picture || null,
        }),
      
      });
    }

    return session;
  },
});
