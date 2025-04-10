import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCredentials } from "../Redux/slice.js";
import { FaEnvelope, FaLock, FaArrowRight, FaUserPlus } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let getData = async () => {
    const endpoint = `http://127.0.0.1:8000/api/usersProfiles/?email=${email}&password=${password}`;
    let resp = await fetch(endpoint);
    let data = await resp.json();
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    getData().then((data) => {
      console.log(data);
      if (data.name && data.email) {
        dispatch(addCredentials({ email: email, password: password }));

        if (data.serviceProvider === false) {
          navigate("/main");
        } else {
          navigate("/service");
        }
      } else {
        alert("Invalid email or password");
      }
    });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Left Side - Image/Brand */}
      <div style={{
        width: '60%',
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '30px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}>
          DorsetBNB
        </div>
        
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1.5rem',
          fontWeight: '700',
        }}>Welcome Back</h1>
        
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '500px',
          lineHeight: '1.8',
          marginBottom: '2rem',
        }}>Log in to access your account and continue your journey with us. We've missed you!</p>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          marginTop: '2rem',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
          }}></div>
        </div>

        {/* Abstract shapes */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          bottom: '-100px',
          right: '-100px',
        }}></div>
        
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          top: '10%',
          right: '20%',
        }}></div>
      </div>
      
      {/* Right Side - Login Form */}
      <div style={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5%',
      }}>
        <div style={{
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '1rem',
          }}>Login</h2>
          <p style={{
            color: '#6B7280',
            fontSize: '1rem',
          }}>Please enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{
            marginBottom: '1.5rem',
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#4B5563',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}>
              Email
            </label>
            <div style={{
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280',
              }}>
                <FaEnvelope />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #D1D5DB',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>
          
          <div style={{
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}>
              <label style={{
                color: '#4B5563',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}>
                Password
              </label>
              
            </div>
            <div style={{
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280',
              }}>
                <FaLock />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #D1D5DB',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#6366F1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s',
            marginBottom: '1.5rem',
          }}>
            Login <FaArrowRight size={14} />
          </button>
          
          <div style={{
            textAlign: 'center',
          }}>
            <button 
              type="button" 
              onClick={() => navigate("/signup")}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#6B7280',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0 auto',
              }}
            >
              <FaUserPlus size={14} /> Don't have an account? <span style={{ color: '#6366F1', fontWeight: '500' }}>Sign up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;