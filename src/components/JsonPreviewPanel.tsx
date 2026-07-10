import React, { useState, useEffect, useRef } from 'react';
import { useFormData } from '../context/FormContext';
import { Code, X, Save, Copy, Download, Upload, CheckCircle } from 'lucide-react';

interface JsonPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
  onApply?: () => void;
}

const JsonPreviewPanel: React.FC<JsonPreviewPanelProps> = ({ isOpen, onClose, onDownloadPDF, isGeneratingPDF, onApply }) => {
  const { data, setData } = useFormData();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Serialize data to string, converting File objects to placeholder strings
  const serializeData = (dataToSerialize: any) => {
    return JSON.stringify(dataToSerialize, (_key, value) => {
      if (value instanceof File) return `[File: ${value.name}]`;
      return value;
    }, 2);
  };

  // Update text when panel opens or data changes (if valid JSON)
  useEffect(() => {
    if (isOpen) {
      setJsonText(serializeData(data));
      setError(null);
    }
  }, [isOpen, data]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      
      // Recursively restore File objects from original data based on placeholder
      const restoreFiles = (parsedObj: any, origObj: any) => {
        for (const key in parsedObj) {
          if (typeof parsedObj[key] === 'object' && parsedObj[key] !== null && origObj?.[key]) {
            restoreFiles(parsedObj[key], origObj[key]);
          } else if (typeof parsedObj[key] === 'string' && parsedObj[key].startsWith('[File: ')) {
            parsedObj[key] = origObj?.[key] instanceof File ? origObj[key] : null;
          }
        }
      };
      
      // Recursively merge source object into target object to prevent missing keys
      const deepMerge = (target: any, source: any): any => {
        if (typeof source !== 'object' || source === null) {
          return source;
        }
        if (Array.isArray(source)) {
          return source.map((item, index) => {
            if (target && target[index] !== undefined) {
              return deepMerge(target[index], item);
            }
            return item;
          });
        }
        const merged = { ...target };
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceVal = source[key];
            const targetVal = target?.[key];
            if (typeof sourceVal === 'object' && sourceVal !== null && typeof targetVal === 'object' && targetVal !== null) {
              merged[key] = deepMerge(targetVal, sourceVal);
            } else {
              merged[key] = sourceVal;
            }
          }
        }
        return merged;
      };

      restoreFiles(parsed, data);
      setData(deepMerge(data, parsed));
      setError(null);
      
      // Show success indicator briefly
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Call the onApply callback if provided (for redirecting to PPT view)
      if (onApply) {
        setTimeout(() => onApply(), 500);
      }
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    alert('JSON copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        // Verify it parses
        JSON.parse(text);
        setJsonText(text);
        setError(null);
      } catch (e: any) {
        setError(`Failed to parse uploaded file: ${e.message}`);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = ''; // reset
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{
        width: '600px', maxWidth: '100vw', background: '#fff',
        display: 'flex', flexDirection: 'column', height: '100%',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>Project JSON</h2>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Live data mapped to slides</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={24} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 12, background: '#fff', alignItems: 'center' }}>
          <button onClick={handleCopy} style={toolbarBtnStyle}>
            <Copy size={16} /> Copy JSON
          </button>
          <button onClick={handleDownload} style={toolbarBtnStyle}>
            <Download size={16} /> Download JSON
          </button>
          <button onClick={() => fileInputRef.current?.click()} style={toolbarBtnStyle}>
            <Upload size={16} /> Upload JSON
          </button>
          <input type="file" accept=".json" ref={fileInputRef} onChange={handleUpload} style={{ display: 'none' }} />
          
          <div style={{ flex: 1 }} />
          
          <button 
            onClick={onDownloadPDF} 
            disabled={isGeneratingPDF}
            style={{ ...toolbarBtnStyle, background: '#14532d', color: '#fff', borderColor: '#166534', opacity: isGeneratingPDF ? 0.7 : 1 }}
          >
            <Download size={16} /> {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Editor */}
        <div style={{ flex: 1, padding: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {error && (
            <div style={{ padding: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #f87171', borderRadius: 6, marginBottom: 16, fontSize: 13, fontWeight: 500 }}>
              {error}
            </div>
          )}
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError(null);
            }}
            style={{
              flex: 1, width: '100%', padding: '16px',
              fontFamily: '"Fira Code", monospace, "Courier New"', fontSize: 13,
              lineHeight: 1.5, color: '#334155', background: '#f8fafc',
              border: '1px solid #cbd5e1', borderRadius: 8,
              resize: 'none', outline: 'none'
            }}
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: showSuccess ? '#10b981' : '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, transition: 'color 0.3s' }}>
            {showSuccess ? <><CheckCircle size={16} /> Successfully applied!</> : 'Note: File fields cannot be edited via JSON.'}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleApply} style={{ padding: '10px 20px', background: '#4f46e5', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
              <Save size={18} /> Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const toolbarBtnStyle = {
  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
  background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6,
  color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

export default JsonPreviewPanel;
