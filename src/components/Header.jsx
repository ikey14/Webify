//Header con nombre de la app y navegación (logout, ajustes, etc)

import { logout } from "@/lib/auth";

export default function Header({ hasLogout })
{
    return(<div className = "justify-center items-center flex flex-col md:flex-row p-5 mb-auto">
      <h1 className = "font-bold md:text-6xl text-5xl text-center" >WEBIFY</h1>
      {hasLogout && <button 
        onClick = {logout} 
        className = "md:ml-8 mt-5 md:my-0 border-2 hover:cursor-pointer hover:bg-linear-to-br from-red-600 to-black rounded-2xl p-2">
          LOGOUT
      </button>}
    </div>);
}