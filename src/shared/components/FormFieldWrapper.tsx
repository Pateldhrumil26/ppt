import React from 'react';

interface FormFieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  required = false,
  error,
  helpText,
  children,
}) => {
  // Inject aria-invalid and error border classes dynamically if children is a single React element
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type === 'input' || child.type === 'textarea' || child.type === 'select')) {
      const childProps = child.props as any;
      const existingClassName = childProps.className || '';
      const errorClass = error ? 'border-[#E11D48] focus:border-[#E11D48] focus:ring-[#E11D48]/20' : '';
      return React.cloneElement(child as React.ReactElement<any>, {
        'aria-invalid': error ? 'true' : 'false',
        className: `${existingClassName} ${errorClass}`.trim(),
      });
    }
    return child;
  });

  return (
    <div className="mb-4 flex flex-col gap-1.5 font-sans">
      <label
        className="text-[13px] font-semibold text-[#1C1E2D] flex items-center gap-1 uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-[#E11D48] font-bold">*</span>}
      </label>
      <div className="w-full flex flex-col">
        {enhancedChildren}
      </div>
      {helpText && !error && (
        <span className="text-[11px] text-[#6C757D]">
          {helpText}
        </span>
      )}
      {error && (
        <span className="text-[11px] text-[#E11D48] font-semibold">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormFieldWrapper;
