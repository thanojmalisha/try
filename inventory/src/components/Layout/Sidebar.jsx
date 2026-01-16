import React from 'react';
import { useInventory } from '../../context/InventoryContext';
import { navigationConfig } from '../../config/navigation';

const Sidebar = () => {
  const { activeScreen, setActiveScreen } = useInventory();

  return (
    <div className="w-72 bg-gray-900 text-white overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">SmartRetail Pro</h1>
        <p className="text-sm text-gray-400 mt-1">Inventory Management</p>
      </div>
      
      <nav className="p-4">
        {navigationConfig.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-400 uppercase">
              <section.icon size={16} />
              {section.label}
            </div>
            <div className="mt-2 space-y-1">
              {section.screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(screen.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeScreen === screen.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <screen.icon size={18} />
                  <span className="text-sm">{screen.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
