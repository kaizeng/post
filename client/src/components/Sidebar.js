// client/src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ apps }) {
  return (
    <aside className="sidebar">
      <h2>Apps</h2>
      <nav>
        {apps.map(name => (
          <NavLink
            key={name}
            to={`/app/${name}`}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar;