import React from 'react';
import {
    Users,
    DollarSign,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    Settings,
    ShieldCheck,
    BarChart3

} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardOverview = () => {


    return (
        <div className="p-6 bg-gray-50 min-h-screen pt-[100px]">
            <header className="mb-8 flex justify-center text-center">
               <div>
                 <h1 className="text-2xl font-bold text-gray-800">Admin Control Center</h1>
                <p className="text-gray-500">Monitor performance and select a module to manage.</p>
               </div>
            </header>

            {/* Mini Stats Row */}

            {/* Main Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all text-left"
                ><ShoppingBag />
                    <Link to="/admin/orders">

                        <div className={`w-12 h-12  rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Orders Dashboard</h3>
                        <p className="text-gray-500 leading-relaxed mb-4">

                        </p>
                        <span className="text-orange-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            Open Module <ArrowUpRight size={16} className="ml-1" />
                        </span>
                    </Link>
                </button>
                <button
                    className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all text-left"
                ><ShieldCheck />
                    <Link to="/admin/skus">
                        <div className={`w-12 h-12  rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Skus Dashboard</h3>
                        <p className="text-gray-500 leading-relaxed mb-4">

                        </p>
                        <span className="text-orange-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            Open Module <ArrowUpRight size={16} className="ml-1" />
                        </span>
                    </Link>
                </button>
                <button
                    className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all text-left"
                ><BarChart3 />
                    <Link to="/admin/products">
                        <div className={`w-12 h-12  rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Products Dashboard</h3>
                        <p className="text-gray-500 leading-relaxed mb-4">

                        </p>
                        <span className="text-orange-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            Open Module <ArrowUpRight size={16} className="ml-1" />
                        </span>
                    </Link>
                </button>
            </div>
        </div>
    );
};