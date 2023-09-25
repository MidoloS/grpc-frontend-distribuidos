import { useState } from "react";
import { getCookie } from "../helpers";

export const FollowButton = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const text = isFollowing ? "Siguiendo" : "Seguir";

  const handleClick = () => {
    if (isFollowing) {
      fetch(`https://localhost:7055/api/user/unfollow/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: Number(getCookie("userId")),
      });
    } else {
      fetch(`https://localhost:7055/api/user/follow/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: Number(getCookie("userId")),
      });
    }
    setIsFollowing(!isFollowing);
  };

  if (user.id === Number(getCookie("userId"))) {
    return null;
  }

  const className = isFollowing
    ? "bg-slate-950 text-slate-50 px-4 py-2 font-semibold rounded-md"
    : "bg-slate-50 border border-slate-950 text-slate-950 px-4 py-2 font-semibold rounded-md";

  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
};
