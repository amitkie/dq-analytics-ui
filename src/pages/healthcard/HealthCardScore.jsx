import React from 'react'
import "./HealthCardScore.scss"

const HealthCardScore = ({ brands, valueKey}) => {
    
  return (
    <>
        <div style={{ position: 'relative', width: '100%', height: '100px' }}>
      {/* Base line representing the 0-100 range */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '0',
          right: '0',
          height: '6px',
          borderRadius: '6px',
          backgroundColor: '#e0e0e0',
        }}
      />

      {/* Display each brand's value as a marker on the line */}
      {brands.map((brand, index) => (
        <div
          key={index}
          className="text-range-container"
          style={{
            left: `${brand[valueKey] ?? 0}%`,
          }}
        >
          {/* Marker for the brand */}
          <div className="indicator-circle"
            
          />
          {/* Brand label and value */}
    
          <div className="textIndicator" title={brand[valueKey] ?? 0}>
            <span className="brand-names">{brand.brand_name}</span> 
            <span className="brand-values">({brand[valueKey] ?? '0'})</span> 
          </div>
        </div>
      ))}
    </div>
        
    </>
  )
}

export default HealthCardScore