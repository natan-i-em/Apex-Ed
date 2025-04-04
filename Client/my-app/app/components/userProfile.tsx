"use client";

import { useEffect, useState } from "react";

const UserProfile = () => {
    interface User {
        picture: string;
        name: string;
        email: string;
      }
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" }); // Ensures cookies are sent
      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="text-center">
      {user ? (
        <>
          <img
            src={user.picture}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <h1 className="text-3xl font-bold pt-10">
            Hello {user.name}! Welcome to Apex
          </h1>
          <p>{user.email}</p>
          <a
            href="/api/auth/logout"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block mt-4"
          >
            Logout
          </a>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold pt-10">Hello Apex!</h1>
          <a
            href="/api/auth/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mt-4"
          >
            Login
          </a>
        </>
      )}
    </div>
  );
};

export default UserProfile;
