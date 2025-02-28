import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex gap-3 text-white font-semibold justify-center sticky top-0.5 z-10">
      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-md ${isActive ? "bg-blue-400" : "bg-blue-300"}`
        }
        to="/Sankranthi"
      >
        Sankranthi
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-md ${isActive ? "bg-blue-400" : "bg-blue-300"}`
        }
        to="/birthday"
      >
        Birthday
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-md ${isActive ? "bg-blue-400" : "bg-blue-300"}`
        }
        to="/cricket"
      >
        Cricket
      </NavLink>
    </div>
  );
}

export default NavBar;
