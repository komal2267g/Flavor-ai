'use client';

import { useState, useEffect } from 'react';
import GoogleTranslate from './GoogleTranslate';
import { Globe } from 'lucide-react';

export default function GoogleTranslateWrapper() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.translate-wrapper')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative translate-wrapper">
      {/* Globe Button */}
      <button
        onClick={toggleDropdown}
        className={`rounded-full w-10 h-10 bg-purple-800/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-800/70 ${
          isDropdownOpen ? 'bg-purple-800/70 scale-110' : ''
        }`}
        aria-label="Open language selector"
        type="button"
      >
        <Globe size={18} className="text-white" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-12 right-0 z-[9999] rounded-lg p-3 min-w-[250px] transition-all duration-200 ${
          isDropdownOpen
            ? 'opacity-100 visible transform translate-y-0'
            : 'opacity-0 invisible transform -translate-y-2'
        }`}
      >
        {!isTranslateLoaded && (
          <p className="text-sm text-gray-400">Loading translator...</p>
        )}
        <GoogleTranslate onLoad={() => setIsTranslateLoaded(true)} />
      </div>
    </div>
  );
}
