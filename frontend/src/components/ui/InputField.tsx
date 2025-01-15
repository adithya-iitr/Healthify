import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function InputField({ icon, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
          icon ? 'pl-10' : ''
        }`}
      />
    </div>
  );
}