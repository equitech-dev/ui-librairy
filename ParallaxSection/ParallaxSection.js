"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useRef } from 'react';
const ParallaxSection = ({
  children,
  speed = 0.5,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      sectionRef.current.style.transform = `translateY(${rate}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  const customClasses = className || '';
  return /*#__PURE__*/React.createElement("section", _extends({
    ref: sectionRef,
    className: `ui-parallaxSection ${customClasses}`.trim(),
    style: style,
    "aria-label": ariaLabel
  }, props), children);
};
export default ParallaxSection;