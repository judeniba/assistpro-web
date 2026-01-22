"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    date: "",
    duration: "",
    additionalNotes: "",
    acceptedTerms: false,
    acceptedServiceAgreement: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const serviceTypes = [
    "Personal Assistant",
    "Driver (Client Vehicle)",
    "Chaperone (Male)",
    "Hostess (Female)",
    "Artist",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the terms and conditions";
    }

    if (!formData.acceptedServiceAgreement) {
      newErrors.acceptedServiceAgreement = "You must accept the service agreement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to an API
      console.log("Booking submitted:", formData);
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          date: "",
          duration: "",
          additionalNotes: "",
          acceptedTerms: false,
          acceptedServiceAgreement: false,
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "var(--fg)",
    fontSize: "15px",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--fg)",
  };

  const errorStyle = {
    color: "#ff6b6b",
    fontSize: "13px",
    marginTop: "6px",
  };

  if (submitted) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "60px 20px",
        background: "rgba(215, 169, 58, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(215, 169, 58, 0.42)"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <h3 className="goldHover" style={{ fontSize: "28px", marginBottom: "12px" }}>
          Booking Submitted!
        </h3>
        <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
          Thank you for your booking. We'll contact you within 24 hours to confirm your service.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="name" style={labelStyle}>
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Enter your full name"
        />
        {errors.name && <div style={errorStyle}>{errors.name}</div>}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="email" style={labelStyle}>
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          placeholder="your.email@example.com"
        />
        {errors.email && <div style={errorStyle}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="phone" style={labelStyle}>
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="serviceType" style={labelStyle}>
          Service Type *
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select a service</option>
          {serviceTypes.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.serviceType && <div style={errorStyle}>{errors.serviceType}</div>}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="date" style={labelStyle}>
          Service Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.date && <div style={errorStyle}>{errors.date}</div>}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label htmlFor="duration" style={labelStyle}>
          Duration (hours) *
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g., 4"
          min="1"
        />
        {errors.duration && <div style={errorStyle}>{errors.duration}</div>}
      </div>

      <div style={{ marginBottom: "32px" }}>
        <label htmlFor="additionalNotes" style={labelStyle}>
          Additional Notes
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
          placeholder="Any special requirements or notes..."
        />
      </div>

      <div className="hrGold" style={{ margin: "40px 0" }} />

      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }}
          />
          <span style={{ fontSize: "14px", lineHeight: "1.6" }}>
            I have read and agree to the{" "}
            <Link 
              href="/terms-and-conditions" 
              target="_blank"
              className="goldHover"
              style={{ textDecoration: "underline", fontWeight: "600" }}
            >
              Terms and Conditions
            </Link>
            *
          </span>
        </label>
        {errors.acceptedTerms && <div style={errorStyle}>{errors.acceptedTerms}</div>}
      </div>

      <div style={{ marginBottom: "32px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="acceptedServiceAgreement"
            checked={formData.acceptedServiceAgreement}
            onChange={handleChange}
            style={{ marginTop: "4px", width: "18px", height: "18px", cursor: "pointer" }}
          />
          <span style={{ fontSize: "14px", lineHeight: "1.6" }}>
            I have read and agree to the{" "}
            <Link 
              href="/service-agreement" 
              target="_blank"
              className="goldHover"
              style={{ textDecoration: "underline", fontWeight: "600" }}
            >
              Service Agreement
            </Link>
            *
          </span>
        </label>
        {errors.acceptedServiceAgreement && <div style={errorStyle}>{errors.acceptedServiceAgreement}</div>}
      </div>

      <button
        type="submit"
        className="btn btnPrimary"
        style={{ 
          width: "100%", 
          padding: "18px", 
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Submit Booking Request
      </button>

      <p style={{ 
        marginTop: "20px", 
        fontSize: "13px", 
        color: "var(--muted2)", 
        textAlign: "center" 
      }}>
        * Required fields
      </p>
    </form>
  );
}
