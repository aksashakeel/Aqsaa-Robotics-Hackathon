import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call backend API here
    console.log('Signup:', email, password, fullName);
  };

  return (
    <Layout title="Signup" description="Create an account">
      <div className="container margin-vert--lg" style={{ maxWidth: '400px' }}>
        <h1>Create Account</h1>
        <div className="card shadow--md">
          <div className="card__body">
            <form onSubmit={handleSubmit}>
            <div className="margin-bottom--md">
                <label className="display-block">Full Name</label>
                <input 
                  type="text" 
                  className="button button--block button--outline button--secondary" 
                  style={{textAlign: 'left', cursor: 'text', color: 'var(--ifm-font-color-base)'}}
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
              </div>
              <div className="margin-bottom--md">
                <label className="display-block">Email</label>
                <input 
                  type="email" 
                  className="button button--block button--outline button--secondary" 
                  style={{textAlign: 'left', cursor: 'text', color: 'var(--ifm-font-color-base)'}}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="margin-bottom--md">
                <label className="display-block">Password</label>
                <input 
                  type="password" 
                  className="button button--block button--outline button--secondary" 
                  style={{textAlign: 'left', cursor: 'text', color: 'var(--ifm-font-color-base)'}}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="button button--primary button--block">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
