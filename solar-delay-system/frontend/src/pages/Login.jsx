 import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      });
      console.log(res.data)

      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
  "role",
  res.data.role
);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
 return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 border rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;