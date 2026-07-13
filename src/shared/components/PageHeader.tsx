import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, extra, actions }) => {
  return (
    <div
      className="flex justify-between items-center px-6 py-4 border-b border-[#E2E8F0] bg-white mb-5 transition-all duration-200"
    >
      <div>
        <h1
          className="text-[20px] font-bold text-[#1C1E2D] m-0 font-sans"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-[13px] text-[#6C757D] mt-1 m-0 font-sans"
          >
            {subtitle}
          </p>
        )}
      </div>
      {(actions || extra) && (
        <div className="flex gap-3">
          {actions || extra}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
