import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <header className="bg-white shadow-md ">
        <div className="text-center mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Currency Converter App</h1>
        </div>
      </header>
      <main className="py-6">
        <div className="mx-auto sm:px-6 lg:px-8">
          <CurrencyConverter />
        </div>
      </main>
    </div>
  );
}

export default App;
