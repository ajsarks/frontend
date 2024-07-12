import React from "react";
import { Link } from "react-router-dom";

const styles = {
  btnPrimary: {
    backgroundColor: 'var(--primary)',
    color: '#242424',
    border: '1px solid var(--primary)',
    borderRadius: '50px', // Oval shape
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff', // Thicker white border for outline button
    transition: 'all 0.3s ease-out',
    borderRadius: '50px', // Oval shape
  },
  animatedButton: {
    transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
  },
  activeButton: {
    transform: 'scale(0.9)', // Increase the scale effect for more noticeable animation
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', // Increase box shadow for more noticeable effect
  }
};

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  padding,
  fontSize,
  to,
  color,
  outlineColor,
  textColor,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  const handleMouseLeave = () => setIsActive(false);

  const checkButtonStyle = buttonStyle === 'btn--outline' ? styles.btnOutline : styles.btnPrimary;

  return (
    <Link to={to} className="btn-mobile">
      <button
        onClick={onClick}
        type={type}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          ...checkButtonStyle,
          ...styles.animatedButton,
          ...(isActive ? styles.activeButton : {}),
          padding: padding || '10px 30px', // Default padding for oval shape
          fontSize: fontSize || '20px', // Default font size if not specified
          marginRight: '1vw', // Inline style to add gap between buttons
          backgroundColor: color || checkButtonStyle.backgroundColor, // Use provided color or default
          borderColor: outlineColor || '#fff', // Use provided outline color or default
          color: textColor || checkButtonStyle.color, // Use provided text color or default
        }}
      >
        {children}
      </button>
    </Link>
  );
};
