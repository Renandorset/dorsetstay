import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaUserTag, FaIdCard, FaLock, FaSave, FaTimes } from 'react-icons/fa';

export default function UpdateAboutUs() {
  const navigate = useNavigate();
  
  const email1 = useSelector((state) => state.slice.email);
  const password1 = useSelector((state) => state.slice.password);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    id: "",
    password: "",
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const endpoint = `http://127.0.0.1:8000/api/usersProfiles/?email=${email1}&password=${password1}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email1, password1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitUpdatedData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/usersProfiles/${formData.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Update failed with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error("Error updating user data:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitUpdatedData();
      alert("Profile updated successfully!");
      navigate('/service/about');
    } catch (err) {
      alert(`Failed to update profile: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/service/about');
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px 20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      color: '#2c3e50',
      fontSize: '24px',
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px'
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#555',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease'
    },
    inputFocus: {
      borderColor: '#3498db',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px'
    },
    submitButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
      flex: '1',
      marginRight: '10px'
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
      flex: '1',
      marginLeft: '10px'
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#7f8c8d',
      padding: '20px'
    },
    errorText: {
      textAlign: 'center',
      color: '#e74c3c',
      padding: '20px',
      backgroundColor: '#fadbd8',
      borderRadius: '5px'
    },
    inputIcon: {
      position: 'relative'
    },
    icon: {
      color: '#3498db',
      marginRight: '10px'
    }
  };

  if (loading && !formData.id) {
    return <div style={styles.container}><p style={styles.loadingText}>Loading user information...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.errorText}>{error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Update Profile Information</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            <FaUser style={styles.icon} /> Name
          </label>
          <input
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="username">
            <FaUserTag style={styles.icon} /> Username
          </label>
          <input
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            type="text"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">
            <FaLock style={styles.icon} /> Password
          </label>
          <input
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="id">
            <FaIdCard style={styles.icon} /> ID
          </label>
          <input
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
            type="text"
            id="id"
            name="id"
            value={formData.id || ''}
            onChange={handleChange}
            placeholder="Enter your ID"
            required
            disabled
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            type="submit" 
            style={styles.submitButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
            disabled={loading}
          >
            <FaSave style={{ marginRight: '8px' }} />
            {loading ? 'Updating...' : 'Update Information'}
          </button>
          
          <button 
            type="button" 
            style={styles.cancelButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
            onClick={handleCancel}
          >
            <FaTimes style={{ marginRight: '8px' }} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}