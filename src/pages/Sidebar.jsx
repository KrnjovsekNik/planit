import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes from '../routes/routes';

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <div className="fixed top-[45px] left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 lg:translate-x-0 border-r border-gray-200 shadow-xl">
                <div className="px-4 py-4">
                    <ul>
                        {routes.map((n, i) => (
                            <li key={i} className="mb-1">
                                <Link
                                    to={n.path}
                                    className={`group flex items-center gap-4 p-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                                        pathname === n.path
                                            ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-violet-500'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <div
                                        className="group-hover:rotate-180 transition-transform duration-700"
                                    >
                                        {n.icon}
                                    </div>
                                    {n.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
