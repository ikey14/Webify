//Header con nombre de la app y navegación (logout, ajustes, etc)

import { logout } from "@/lib/auth";

export default function Header({ hasLogout })
{
    return(<div className = "justify-center flex p-5 mb-auto">
      <h1 className = "font-bold text-6xl" >WEBIFY</h1>
      {hasLogout && <button onClick = {logout} className = " ml-8 border-2 hover:cursor-pointer hover:bg-linear-to-br from-red-600 to-black rounded-2xl p-2">LOGOUT</button>}
    </div>);
}