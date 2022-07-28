import { Outlet } from 'react-router-dom';

export function Navbar() {
  return (
    <div>
      <h1> Sup im navbar just like a gambar i drop bars on mars with cars and wars, jars, vars and chars</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
