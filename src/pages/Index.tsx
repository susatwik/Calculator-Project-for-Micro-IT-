
import { useState } from 'react';
import Calculator from '../components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Simple Calculator</h1>
      <Calculator />
      <p className="text-sm text-gray-500 mt-8">Built with React & TailwindCSS</p>
    </div>
  );
};

export default Index;
