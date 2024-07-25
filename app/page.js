// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Student Wallet App</h1>
      <p>Your one-stop solution for managing student funds.</p>
      <div style={styles.links}>
        <Link href="/login" style={styles.link}>Login</Link>
        <Link href="/signup" style={styles.link}>Sign Up</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  links: {
    marginTop: '20px',
  },
  link: {
    marginRight: '15px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};
