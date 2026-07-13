import React from 'react';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-6 pb-6 border-b border-[#EDF2F6] last:border-0 last:pb-0 last:mb-0 ${className}`.trim()}>
      {title && (
        <h3 className="text-sm font-bold text-[#1C1E2D] mb-1 uppercase tracking-wider font-sans">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-xs text-[#6C757D] mb-4 leading-relaxed font-sans">
          {description}
        </p>
      )}
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
