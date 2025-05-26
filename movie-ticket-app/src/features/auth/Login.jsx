// src/features/auth/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // هنا ممكن تتحقق من الصلاحية وترسل طلب حقيقي
    login({ email });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">تسجيل دخول</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
        دخول
      </button>
    </form>
  );
}
