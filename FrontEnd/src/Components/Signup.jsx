import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Signup() {
  let sd = "http://127.0.0.1:8000/api/usersProfiles/";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    serviceProvider: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const method = async () => {
    let res = await fetch(sd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let data = await res.json();

    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    method().then((data) => {
      console.log(data);
      if (data.id) {
        alert("Signup Successful!");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        alert("Failed to create account. Please try again.");
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
        }}>Join Us Today</h1>
        
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '500px',
          lineHeight: '1.8',
          marginBottom: '2rem',
        }}>Create an account and start your journey with us. Discover new possibilities and connect with our community.</p>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          marginTop: '2rem',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
          }}></div>
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
      
      {/* Right Side - Signup Form */}
      <div style={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5%',
        overflow: 'auto',
      }}>
        <div style={{
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '0.5rem',
          }}>Sign Up</h2>
          <p style={{
            color: '#6B7280',
            fontSize: '1rem',
          }}>Please fill in your details to create your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{
            marginBottom: '1.25rem',
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#4B5563',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}>
              Full Name
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
                <FaUser />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
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
            marginBottom: '1.25rem',
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#4B5563',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}>
              Username
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
                <FaUserTag />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
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
            marginBottom: '1.25rem',
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
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
            marginBottom: '1.25rem',
          }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#4B5563',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}>
              Password
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
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <input
              type="checkbox"
              id="serviceProvider"
              name="serviceProvider"
              checked={formData.serviceProvider}
              onChange={(e) =>
                setFormData({ ...formData, serviceProvider: e.target.checked })
              }
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#6366F1',
                cursor: 'pointer',
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <FaHome style={{ color: '#6B7280' }} />
              <label 
                htmlFor="serviceProvider"
                style={{
                  color: '#4B5563',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Register as a Host
              </label>
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
            Sign Up <FaUserPlus size={14} />
          </button>
          
          <div style={{
            textAlign: 'center',
          }}>
            <button 
              type="button" 
              onClick={() => navigate("/login")}
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
              <FaSignInAlt size={14} /> Already have an account? <span style={{ color: '#6366F1', fontWeight: '500' }}>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;