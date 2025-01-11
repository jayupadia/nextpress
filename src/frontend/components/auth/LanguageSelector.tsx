'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Language, languages, useLanguage } from '@/frontend/services/languageService';
import { translations } from '@/frontend/locales/translations';

export default function LanguageSelector() {
  const router = useRouter();
  const { setLanguage, currentLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = languages.find(lang => lang.code === e.target.value);
    if (selected) {
      setSelectedLanguage(selected);
    }
  };

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    router.push('/auth/register');
  };

  const direction = selectedLanguage.direction || 'ltr';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="w-96 bg-white p-8 shadow-lg rounded-md"
        style={{ direction }}
      >
        <div className="text-center">
          <img
            src="/wordpress-logo.png"
            alt="Logo"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {translations[selectedLanguage.code as keyof typeof translations]?.selectLanguage ||
              translations['en'].selectLanguage}
          </h2>
        </div>

        <div className="mt-6 relative">
          <select
            value={selectedLanguage.code}
            onChange={handleLanguageChange}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            size={10} // Increase dropdown size
          >
            {languages.map(language => (
              <option key={language.code} value={language.code} className="py-2">
                {language.nativeName} ({language.name})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {translations[selectedLanguage.code as keyof typeof translations]?.continue ||
              translations['en'].continue}
          </button>
        </div>
      </div>
    </div>
  );
}
