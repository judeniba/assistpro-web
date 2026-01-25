"use client";

import { useServices } from "@/lib/hooks";
import { formatCurrency } from "@/lib/utils/helpers";

/**
 * Example component demonstrating backend integration
 * This fetches services from the API and displays them with pricing
 */
export default function ServicesExample() {
  const { data, loading, error } = useServices();

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div className="spinner">Loading services from backend...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "#ff6b6b" }}>
        <p>Error loading services: {error}</p>
      </div>
    );
  }

  if (!data?.data) {
    return null;
  }

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="container">
        <div style={{ 
          marginBottom: "20px", 
          padding: "12px 20px", 
          background: "rgba(46, 213, 115, 0.1)",
          border: "1px solid rgba(46, 213, 115, 0.3)",
          borderRadius: "12px"
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "rgba(46, 213, 115, 1)" }}>
            ✓ Connected to backend API - Fetched {data.data.length} services dynamically
          </p>
        </div>

        <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>
          <span className="goldHover">Backend Integration Demo</span>
        </h3>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "14px" 
        }}>
          {data.data.map((service) => (
            <div
              key={service.id}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: "16px", marginBottom: "8px" }}>
                {service.title}
              </div>
              <div style={{ 
                fontSize: "13px", 
                color: "rgba(255, 255, 255, 0.66)", 
                marginBottom: "12px",
                lineHeight: "1.5" 
              }}>
                {service.description}
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "rgba(255, 255, 255, 0.55)",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}>
                {service.hourlyRate && (
                  <div>Hourly: <span className="goldHover">{formatCurrency(service.hourlyRate)}</span></div>
                )}
                {service.dailyRate && (
                  <div>Daily: <span className="goldHover">{formatCurrency(service.dailyRate)}</span></div>
                )}
                {service.weeklyRate && (
                  <div>Weekly: <span className="goldHover">{formatCurrency(service.weeklyRate)}</span></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
