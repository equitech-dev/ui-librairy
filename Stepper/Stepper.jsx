import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Stepper.scss';

/**
 * StepperStep - Élément individuel du stepper
 */
const StepperStep = ({ 
  step, 
  index, 
  isActive, 
  isCompleted, 
  isError, 
  isDisabled,
  onClick,
  showNumber = true
}) => {
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick(index);
    }
  };

  const stepClasses = [
    'ui-stepper-step-circle',
    isCompleted ? 'completed' : '',
    isActive ? 'active' : '',
    isError ? 'error' : '',
    isDisabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className="ui-stepper-step">
      <button
        className={stepClasses}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={`Étape ${index + 1}: ${step.label}`}
        aria-current={isActive ? 'step' : undefined}
      >
        {showNumber && !isCompleted && !isError && (index + 1)}
      </button>
      
      <div className="ui-stepper-step-content">
        <div className="ui-stepper-step-label">{step.label}</div>
        {step.description && (
          <div className="ui-stepper-step-description">{step.description}</div>
        )}
      </div>
    </div>
  );
};

StepperStep.propTypes = {
  step: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  showNumber: PropTypes.bool
};

/**
 * Stepper - Composant pour afficher les étapes d'un processus
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.steps - Liste des étapes
 * @param {number} props.currentStep - Index de l'étape actuelle (0-based)
 * @param {string} props.variant - Variante d'affichage (horizontal, vertical)
 * @param {string} props.size - Taille du composant (default, compact, large)
 * @param {boolean} props.clickable - Permet de cliquer sur les étapes
 * @param {Function} props.onStepClick - Callback lors du clic sur une étape
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Object} props.style - Styles inline additionnels
 */
const Stepper = ({ 
  steps = [], 
  currentStep = 0,
  variant = 'horizontal',
  size = 'default',
  clickable = false,
  onStepClick,
  className = '',
  style = {}
}) => {
  const progressPercentage = useMemo(() => {
    if (steps.length <= 1) return 0;
    return Math.min((currentStep / (steps.length - 1)) * 100, 100);
  }, [currentStep, steps.length]);

  const stepperClasses = [
    'ui-stepper',
    variant !== 'horizontal' ? variant : '',
    size !== 'default' ? size : '',
    className
  ].filter(Boolean).join(' ');

  const handleStepClick = (stepIndex) => {
    if (clickable && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className={stepperClasses} style={style}>
      {/* Ligne de progression */}
      <div className="ui-stepper-line" />
      <div 
        className="ui-stepper-progress" 
        style={{ 
          width: variant === 'vertical' ? '2px' : `${progressPercentage}%`,
          height: variant === 'vertical' ? `${progressPercentage}%` : '2px'
        }} 
      />
      
      {/* Étapes */}
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isError = step.error;
        const isDisabled = step.disabled || (!clickable && !isActive && !isCompleted);

        return (
          <StepperStep
            key={`stepper-step-${index}`}
            step={step}
            index={index}
            isActive={isActive}
            isCompleted={isCompleted}
            isError={isError}
            isDisabled={isDisabled}
            onClick={handleStepClick}
            showNumber={!step.hideNumber}
          />
        );
      })}
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      error: PropTypes.bool,
      disabled: PropTypes.bool,
      hideNumber: PropTypes.bool
    })
  ).isRequired,
  currentStep: PropTypes.number,
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['default', 'compact', 'large']),
  clickable: PropTypes.bool,
  onStepClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Stepper;
