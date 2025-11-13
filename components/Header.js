'use client';

import { useState } from 'react';
import Settings from './Settings';

/**
 * Header component - displays app branding and navigation
 */
export default function Header({ userProfile, onProfileUpdate }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-rollbar-bg-header z-50 px-6 shadow-lg">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between h-[70px]">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-rollbar-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-xl font-semibold">Budget Personnel</span>
            </div>

            <div className="flex items-center gap-3">
              {userProfile && (
                <button 
                  onClick={() => setShowSettings(true)}
                  className="btn-blue"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Paramètres
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showSettings && (
        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          userProfile={userProfile}
          onUpdate={onProfileUpdate}
        />
      )}
    </>
  );
}
