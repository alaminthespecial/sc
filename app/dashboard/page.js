// pages/dashboard.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setWalletBalance(res.data.walletBalance);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div style={styles.container}>
        <h2>Dashboard</h2>
        {user && (
          <div style={styles.userInfo}>
            <p>Welcome, {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Wallet Balance: ${walletBalance}</p>
          </div>
        )}
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  userInfo: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
