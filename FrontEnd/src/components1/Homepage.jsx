import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD"); // Default currency
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
; // in cents
  const location = useLocation();
  const { state } = location;
  const [hardcodedAmount,setAmout12] = useState(500000) // Convert to cents
  
  
  
  useEffect(()=>{
    setEmail(state.email);
    setAmout12(state.price); // Convert to cents
  },[state.email,state.price])

  // Replace your current handlePayClick function with this debugging version
const handlePayClick = async (email) => {
    setLoading(true);
  
    try {
      console.log("Sending request to:", "http://127.0.0.1:8000/api/create-payment-intent/");
      console.log("With payload:", {
        amount: hardcodedAmount,
        currency: currency.toLowerCase(), // Make sure currency is lowercase as required by your backend
        user_email: email,
      });
      
      const response = await fetch(
        "http://127.0.0.1:8000/api/create-payment-intent/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: hardcodedAmount,
            currency: currency.toLowerCase(), // Important: your backend checks for lowercase
            user_email: email,
          }),
        }
      );
      
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries([...response.headers]));
      
      // For debugging, check the raw response text first
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      // Try to parse it as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed JSON data:", data);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Response is not valid JSON");
      }
      
      if (data.clientSecret) {
        navigate("/stripe/payment", { state: { clientSecret: data.clientSecret } });
      } else {
        alert("Error creating payment intent: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating payment intent: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>React Stripe Payment</h1>
      <p>
        <strong>Amount:</strong> {hardcodedAmount}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email || email.trim() == "") {
            return;
          }

          handlePayClick(email);
        }}
      >
        <label htmlFor="email">Enter your email:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          name="email"
          id="email"
          type="email"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default Homepage;