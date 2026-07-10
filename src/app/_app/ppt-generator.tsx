import React, { useState } from 'react';
import { Download, Loader2, Plus, Trash2, ArrowUp, ArrowDown, Settings2, Image, Layers, Sparkles } from 'lucide-react';
import PageHeader from '../../shared/components/PageHeader';
import Card from '../../shared/components/Card';
import FormSection from '../../shared/components/FormSection';
import FormFieldWrapper from '../../shared/components/FormFieldWrapper';

interface SlideOutline {
  id: string;
  number: number;
  heading: string;
  content: string;
  category: string;
}

const TEMPLATES = [
  { id: 'arc-purple', name: 'Aesthetic Arc Purple', primary: '#7D3C70', secondary: '#FFF2E9', desc: 'Official brand theme' },
  { id: 'corp-dark', name: 'Corporate Midnight', primary: '#1C1E2D', secondary: '#FAFBFD', desc: 'Minimal dark sleek layout' },
  { id: 'emerald', name: 'Ecosystem Mint', primary: '#14532D', secondary: '#F0FDF4', desc: 'Green sustainable presentation' },
  { id: 'amber', name: 'Vibrant Orange', primary: '#FF8435', secondary: '#FFF2E9', desc: 'Warm accent deck' },
];

export const PptGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('arc-purple');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [fontSizeScale, setFontSizeScale] = useState(60); // premium slider control
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Slide outline state
  const [slides, setSlides] = useState<SlideOutline[]>([
    { id: '1', number: 1, heading: 'Madhav Highstreet Cover', content: 'The next premium retail destination on Sindhu Bhavan Road.', category: 'Cover' },
    { id: '2', number: 2, heading: 'City Context & Demographics', content: 'Ahmedabad: World first heritage city with daily flights and metro network.', category: 'City Context' },
    { id: '3', number: 3, heading: 'Premium Location Benefits', content: 'Minutes from SG Highway with easy SP Ring Road connectivity.', category: 'Location' },
    { id: '4', number: 4, heading: 'Project Specifications', content: 'Ground floor layout, road accessibility, and parking parameters.', category: 'Specs' },
  ]);

  const [activeSlideId, setActiveSlideId] = useState<string>('1');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];

  // Form field update
  const handleUpdateActiveSlide = (key: keyof SlideOutline, value: string) => {
    // Clear validation error on change
    if (formErrors[key]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }

    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlideId ? { ...s, [key]: value } : s))
    );
  };

  // Reorder slides helper
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= slides.length) return;

    const result = [...slides];
    const [removed] = result.splice(index, 1);
    result.splice(nextIndex, 0, removed);

    // Re-index numbers
    const updated = result.map((item, idx) => ({
      ...item,
      number: idx + 1,
    }));

    setSlides(updated);
  };

  // Add new slide
  const handleAddSlide = () => {
    const newId = String(Date.now());
    const newSlide: SlideOutline = {
      id: newId,
      number: slides.length + 1,
      heading: 'New Custom Slide',
      content: 'Bullet point 1\nBullet point 2',
      category: 'Custom',
    };
    setSlides([...slides, newSlide]);
    setActiveSlideId(newId);
  };

  // Delete slide
  const handleDeleteSlide = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (slides.length <= 1) return;
    const filtered = slides.filter((s) => s.id !== id);
    const updated = filtered.map((item, idx) => ({
      ...item,
      number: idx + 1,
    }));
    setSlides(updated);
    if (activeSlideId === id) {
      setActiveSlideId(updated[0].id);
    }
  };

  // Export handling
  const handleExport = () => {
    // Validate current form
    const errors: Record<string, string> = {};
    if (!activeSlide.heading.trim()) {
      errors.heading = 'Slide Heading cannot be empty';
    }
    if (!activeSlide.content.trim()) {
      errors.content = 'Slide Body content is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsGenerating(true);
    // Simulate generation latency
    setTimeout(() => {
      setIsGenerating(false);
      alert('PPTX presentation exported successfully!');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans pb-12">
      <PageHeader
        title="PPT Generator"
        subtitle="Create, customize, and export corporate presentations in seconds."
        actions={
          <button
            onClick={handleExport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7D3C70] hover:bg-[#652D5A] disabled:bg-[#7D3C70]/60 text-white font-semibold rounded-xl text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Generating slides...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export PPTX
              </>
            )}
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card>
            <FormSection
              title="Presentation Theme"
              description="Choose a design template matching your brand style."
            >
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col gap-1.5 ${
                        isSelected
                          ? 'border-[#7D3C70] bg-[#FFF2E9]'
                          : 'border-[#EDF2F6] hover:border-[#7D3C70]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-black/10"
                          style={{ backgroundColor: tmpl.primary }}
                        />
                        <span className="text-xs font-bold text-[#1C1E2D]">{tmpl.name}</span>
                      </div>
                      <span className="text-[10px] text-[#6C757D]">{tmpl.desc}</span>
                    </div>
                  );
                })}
              </div>
            </FormSection>

            <FormSection
              title="Slide Format Settings"
              description="Configure presentation dimensions and layout scales."
            >
              <div className="grid grid-cols-2 gap-4">
                <FormFieldWrapper label="Aspect Ratio">
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-[#FAFBFD] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-[#1C1E2D] font-medium outline-none focus:border-[#7D3C70]"
                  >
                    <option value="16:9">Widescreen 16:9</option>
                    <option value="4:3">Standard 4:3</option>
                  </select>
                </FormFieldWrapper>

                <FormFieldWrapper label="Typo Scaling">
                  <div className="flex items-center gap-3 h-9">
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={fontSizeScale}
                      onChange={(e) => setFontSizeScale(Number(e.target.value))}
                      className="w-full accent-[#FF8435] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#7D3C70] min-w-[30px] text-right">
                      {fontSizeScale}%
                    </span>
                  </div>
                </FormFieldWrapper>
              </div>
            </FormSection>
          </Card>

          <Card>
            <FormSection
              title="Slide Content Editor"
              description={`Customize content for active Slide ${activeSlide.number}.`}
            >
              <FormFieldWrapper label="Slide Heading" required error={formErrors.heading}>
                <input
                  type="text"
                  value={activeSlide.heading}
                  onChange={(e) => handleUpdateActiveSlide('heading', e.target.value)}
                  placeholder="Enter slide title..."
                  className="w-full bg-[#FAFBFD] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1E2D] outline-none transition-all focus:border-[#7D3C70] placeholder:text-[#6C757D]/50"
                />
              </FormFieldWrapper>

              <FormFieldWrapper label="Category Tag">
                <input
                  type="text"
                  value={activeSlide.category}
                  onChange={(e) => handleUpdateActiveSlide('category', e.target.value)}
                  placeholder="e.g. Overview, Summary..."
                  className="w-full bg-[#FAFBFD] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1E2D] outline-none transition-all focus:border-[#7D3C70]"
                />
              </FormFieldWrapper>

              <FormFieldWrapper label="Slide Body Content" required error={formErrors.content}>
                <textarea
                  rows={4}
                  value={activeSlide.content}
                  onChange={(e) => handleUpdateActiveSlide('content', e.target.value)}
                  placeholder="Enter slide details, bullet points..."
                  className="w-full bg-[#FAFBFD] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1E2D] outline-none transition-all focus:border-[#7D3C70] resize-none leading-relaxed placeholder:text-[#6C757D]/50"
                />
              </FormFieldWrapper>
            </FormSection>
          </Card>
        </div>

        {/* RIGHT COLUMN: 7 cols */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h3 className="text-sm font-bold text-[#324D7B] uppercase tracking-wider">Slide Outlines</h3>
              <p className="text-xs text-[#6C757D]">Manage page layout order and templates.</p>
            </div>
            <button
              onClick={handleAddSlide}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FFF2E9] text-[#7D3C70] hover:bg-[#7D3C70] hover:text-white rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 border border-[#FF8435]/20"
            >
              <Plus className="w-3.5 h-3.5" /> Add Slide
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {slides.map((item, index) => {
              const isActive = item.id === activeSlideId;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSlideId(item.id)}
                  className={`group rounded-2xl border bg-[#FAFBFD] p-5 cursor-pointer transition-all duration-200 flex gap-4 ${
                    isActive
                      ? 'border-[#7D3C70] ring-1 ring-[#7D3C70]/30 shadow-md translate-x-1'
                      : 'border-[#EDF2F6] hover:border-[#7D3C70]/30 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex flex-col items-center justify-between py-1 bg-slate-100 rounded-lg px-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveSlide(index, 'up'); }}
                      disabled={index === 0}
                      className="p-1 hover:text-[#FF8435] disabled:text-slate-300 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#324D7B]">#{item.number}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveSlide(index, 'down'); }}
                      disabled={index === slides.length - 1}
                      className="p-1 hover:text-[#FF8435] disabled:text-slate-300 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-[#7D3C70] bg-[#FFF2E9] px-2 py-1 rounded-md uppercase tracking-wider border border-[#FF8435]/10">
                        {item.category || 'Slide'}
                      </span>
                      {slides.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteSlide(item.id, e)}
                          className="text-[#6C757D] hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-[#1C1E2D] group-hover:text-[#7D3C70] transition-colors truncate">
                      {item.heading}
                    </h4>
                    <p className="mt-1 text-xs text-[#6C757D] leading-relaxed line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PptGenerator;
