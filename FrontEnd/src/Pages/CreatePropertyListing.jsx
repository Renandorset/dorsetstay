import React, { useState,useEffect } from 'react';
import './CreateListing.css';
import { useSelector } from 'react-redux';
import MapComponent from '../Components/MapComponent';
import DateRangePicker from '../Components/DateRangePicker';


export default function CreatePropertyListing() {
const email = useSelector((state) => state.slice.email);

const [email1,setEmail]=useState(email);
  const [formData, setFormData] = useState({
    name: email1,
    description: '',
    location: '',
    contact: '',
    timing: '',
    charges: '',
    url:'',
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const method = async () => {
    let res=await fetch("http://127.0.0.1:8000/api/propertylistings/",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let data=await res.json();

    console.log(data);
    return data;

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Listing Created:', formData);

    method().then((data) => {
      console.log(data);
      if (data.id) {
        alert(' Listing Created Successfully!');
      } else {
        alert('Failed to create listing. Please try again.');
      }
       // Reset form
    setFormData({
      name: '',
      description: '',
      location: '',
      contact: '',
      timing: '',
      charges: '',
      url:'',
      availability: true,
    });


    })


   
  };

  return (
    <div className="create-listing-container" >
      <h2>Create Property Listing</h2>
      <form className="create-listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the details of your property"
            rows="4"
            required
          ></textarea>
        </div>
       
      <MapComponent setFormData={setFormData}/>

        <div className="form-group">
          <label htmlFor="contact">Contact Information</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your contact details"
            required
          />
        </div>
  
        <DateRangePicker setFormData={setFormData}/>
        <div className="form-group">
          <label htmlFor="charges">Charges</label>
          <input
            type="text"
            id="charges"
            name="charges"
            value={formData.charges}
            onChange={handleChange}
            placeholder="Enter charges of accommodation"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter the url of accommodation"
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Listing</button>
      </form>
    </div>
  );
}