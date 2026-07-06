import { useState } from 'react';
import { useFormData } from '../context/FormContext';

const ImagesDocuments = () => {
  const { formData, updateImagesDocuments } = useFormData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Images and documents saved successfully!');
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'backgroundImage' | 'images' | 'charts' | 'pdfs') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'logo') {
      updateImagesDocuments({ logo: files[0] });
    } else if (type === 'backgroundImage') {
      updateImagesDocuments({ backgroundImage: files[0] });
    } else if (type === 'images') {
      updateImagesDocuments({ images: Array.from(files) });
    } else if (type === 'charts') {
      updateImagesDocuments({ charts: Array.from(files) });
    } else if (type === 'pdfs') {
      updateImagesDocuments({ pdfs: Array.from(files) });
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Images & Documents</h1>
      <p className="text-gray-600 mb-6">Upload images and documents for your presentation</p>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image (for first slide)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'backgroundImage')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.imagesDocuments.backgroundImage && (
              <p className="mt-2 text-sm text-green-600">
                Background uploaded: {formData.imagesDocuments.backgroundImage.name}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Recommended: High-resolution image (1920x1080 or higher)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'logo')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.imagesDocuments.logo && (
              <p className="mt-2 text-sm text-green-600">
                Logo uploaded: {formData.imagesDocuments.logo.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(e, 'images')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.imagesDocuments.images.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {formData.imagesDocuments.images.length} image(s) uploaded
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Charts
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={(e) => handleFileUpload(e, 'charts')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.imagesDocuments.charts.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {formData.imagesDocuments.charts.length} chart(s) uploaded
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload PDF Documents
            </label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => handleFileUpload(e, 'pdfs')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.imagesDocuments.pdfs.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {formData.imagesDocuments.pdfs.length} PDF(s) uploaded
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImagesDocuments;