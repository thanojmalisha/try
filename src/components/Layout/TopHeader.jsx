import React, { useState, useEffect } from 'react';
import { Clock, User } from 'lucide-react';

const TopHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left side - could add breadcrumbs or page title here */}
      <div className="flex-1"></div>

      {/* Right side - Clock and User Info */}
      <div className="flex items-center gap-8">
        {/* Clock Section */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{formattedTime}</p>
            <p className="text-xs text-gray-600">{formattedDate}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>

        {/* User Info Section */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-600">Logged In</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
