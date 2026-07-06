import { useState } from 'react';
import { useFormData } from '../context/FormContext';
import { Download } from 'lucide-react';

const DownloadPPT = () => {
  const { data } = useFormData();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePPT = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamic import of pptxgenjs
      const PptxGenJS = (await import('pptxgenjs')).default;
      const pptx = new PptxGenJS();

      // Slide 1: Cover Page with background, logo, title, address, and 10 category icons
      const slide1 = pptx.addSlide();
      
      // Add background image if uploaded, otherwise use theme color
      const backgroundImage = data.slide1.backgroundImage;
      if (backgroundImage) {
        const backgroundImageData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(backgroundImage);
        });
        slide1.background = { data: backgroundImageData };
      } else {
        slide1.background = { color: data.slide1.themeColor.replace('#', '') };
      }
      
      // Add theme color overlay
      slide1.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 10,
        h: 7.5,
        fill: { color: data.slide1.themeColor.replace('#', ''), transparency: 30 },
        line: { type: 'none' }
      });

      // Slide number badge
      slide1.addText(data.slide1.slideNumber || '01', {
        x: 0.5,
        y: 0.5,
        w: 1,
        h: 0.6,
        fontSize: 20,
        bold: true,
        color: data.slide1.fontColor.replace('#', ''),
        fill: { color: data.slide1.themeColor.replace('#', '') },
        align: 'center',
        valign: 'middle',
      });

      // Title
      slide1.addText(data.slide1.title || 'MADHAV HIGHSTREET', {
        x: 0.5,
        y: 1.3,
        w: 6.5,
        h: 1.2,
        fontSize: 44,
        bold: true,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // Subtitle
      slide1.addText(data.slide1.subtitle || 'THE NEXT PREMIUM RETAIL DESTINATION', {
        x: 0.5,
        y: 2.5,
        w: 6.5,
        h: 0.8,
        fontSize: 20,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // Address
      slide1.addText(data.slide1.address || 'SINDHU BHAVAN ROAD, BODAKDEV, AHMEDABAD', {
        x: 0.5,
        y: 3.3,
        w: 6.5,
        h: 0.6,
        fontSize: 14,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // Divider line
      slide1.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 4,
        w: 2,
        h: 0.05,
        fill: { color: data.slide1.fontColor.replace('#', '') },
        line: { type: 'none' }
      });

      // Presented by section
      slide1.addText('Presented by', {
        x: 0.5,
        y: 4.3,
        w: 6.5,
        h: 0.4,
        fontSize: 12,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // Company name
      slide1.addText(data.slide1.companyName || 'AESTHETIC ARC', {
        x: 0.5,
        y: 4.7,
        w: 6.5,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      slide1.addText(data.slide1.companyTagline || 'PROPERTY LEASING COMPANY', {
        x: 0.5,
        y: 5.2,
        w: 6.5,
        h: 0.4,
        fontSize: 12,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // Categories section header
      slide1.addText('CATEGORIES', {
        x: 0.5,
        y: 5.8,
        w: 6.5,
        h: 0.4,
        fontSize: 14,
        bold: true,
        color: data.slide1.fontColor.replace('#', ''),
        fontFace: 'Arial',
      });

      // 10 Category icons in a grid (2 rows x 5 columns)
      const categories = [
        { name: 'Fashion', icon: '👔' },
        { name: 'Retail', icon: '🛍️' },
        { name: 'Lifestyle', icon: '🍃' },
        { name: 'F&B', icon: '🍴' },
        { name: 'Electronics', icon: '💻' },
        { name: 'Hypermarket', icon: '🛒' },
        { name: 'Corporate', icon: '🏢' },
        { name: 'Health', icon: '❤️' },
        { name: 'Multiplex', icon: '🎫' },
        { name: 'Game Zone', icon: '🎮' },
      ];

      // First row (5 categories)
      categories.slice(0, 5).forEach((cat, index) => {
        const xPos = 0.5 + (index * 1.2);
        slide1.addShape(pptx.ShapeType.rect, {
          x: xPos,
          y: 6.3,
          w: 1.1,
          h: 0.8,
          fill: { color: data.slide1.fontColor.replace('#', ''), transparency: 90 },
          line: { color: data.slide1.fontColor.replace('#', ''), width: 1, dashType: 'solid' }
        });
        slide1.addText(cat.icon, {
          x: xPos,
          y: 6.3,
          w: 1.1,
          h: 0.5,
          fontSize: 20,
          align: 'center',
          valign: 'middle',
        });
        slide1.addText(cat.name, {
          x: xPos,
          y: 6.75,
          w: 1.1,
          h: 0.35,
          fontSize: 9,
          color: data.slide1.fontColor.replace('#', ''),
          align: 'center',
          valign: 'top',
          bold: true,
          fontFace: 'Arial',
        });
      });

      // Second row (5 categories)
      categories.slice(5, 10).forEach((cat, index) => {
        const xPos = 0.5 + (index * 1.2);
        slide1.addShape(pptx.ShapeType.rect, {
          x: xPos,
          y: 7.2,
          w: 1.1,
          h: 0.8,
          fill: { color: data.slide1.fontColor.replace('#', ''), transparency: 90 },
          line: { color: data.slide1.fontColor.replace('#', ''), width: 1, dashType: 'solid' }
        });
        slide1.addText(cat.icon, {
          x: xPos,
          y: 7.2,
          w: 1.1,
          h: 0.5,
          fontSize: 20,
          align: 'center',
          valign: 'middle',
        });
        slide1.addText(cat.name, {
          x: xPos,
          y: 7.65,
          w: 1.1,
          h: 0.35,
          fontSize: 9,
          color: data.slide1.fontColor.replace('#', ''),
          align: 'center',
          valign: 'top',
          bold: true,
          fontFace: 'Arial',
        });
      });

      // Slide 2: City At A Glance
      const slide2 = pptx.addSlide();
      slide2.addText('City At A Glance', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: '3d1a6e',
      });
      slide2.addText(data.slide2.cityName || 'AHMEDABAD', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 0.6,
        fontSize: 24,
        bold: true,
        color: '3d1a6e',
      });
      slide2.addText('AT A GLANCE', {
        x: 0.5,
        y: 2.1,
        w: 9,
        h: 0.5,
        fontSize: 20,
        bold: true,
        color: 'f97316',
      });
      slide2.addText([
        { text: 'Population: ', options: { bold: true } },
        { text: data.slide2.population || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.8,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide2.addText([
        { text: 'GDP: ', options: { bold: true } },
        { text: data.slide2.gdp || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.2,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide2.addText([
        { text: 'GDP Growth: ', options: { bold: true } },
        { text: data.slide2.gdpGrowth || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.6,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide2.addText([
        { text: "World's 1st: ", options: { bold: true } },
        { text: data.slide2.worldFirst || 'Not provided' },
      ], {
        x: 0.5,
        y: 4.0,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });

      // Slide 3: Premium Location
      const slide3 = pptx.addSlide();
      slide3.addText('Premium Location', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: '3d1a6e',
      });
      slide3.addText(data.slide3.locationTitle || 'PREMIUM LOCATION\nTHAT CONNECTS EVERYTHING', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 1,
        fontSize: 20,
        bold: true,
        color: '3d1a6e',
      });
      slide3.addText([
        { text: 'Address: ', options: { bold: true } },
        { text: data.slide3.address || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.6,
        w: 9,
        h: 0.5,
        fontSize: 14,
      });
      slide3.addText([
        { text: 'Point 1: ', options: { bold: true } },
        { text: data.slide3.point1Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.2,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide3.addText([
        { text: 'Point 2: ', options: { bold: true } },
        { text: data.slide3.point2Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.6,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide3.addText([
        { text: 'Point 3: ', options: { bold: true } },
        { text: data.slide3.point3Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 4.0,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });

      // Slide 4: Project Showcase
      const slide4 = pptx.addSlide();
      slide4.addText('Project Showcase', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: '3d1a6e',
      });
      slide4.addText('PROJECT FEATURES', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 0.5,
        fontSize: 18,
        bold: true,
        color: 'f97316',
      });
      slide4.addText([
        { text: 'Feature 1: ', options: { bold: true } },
        { text: data.slide4.feature1Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.2,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide4.addText([
        { text: 'Feature 2: ', options: { bold: true } },
        { text: data.slide4.feature2Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.6,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide4.addText([
        { text: 'Feature 3: ', options: { bold: true } },
        { text: data.slide4.feature3Title || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.0,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide4.addText([
        { text: 'Possession: ', options: { bold: true } },
        { text: data.slide4.possessionDate || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.4,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });

      // Slide 5: Construction Progress
      const slide5 = pptx.addSlide();
      slide5.addText('Construction Progress', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: '3d1a6e',
      });
      slide5.addText('CURRENT STATUS', {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: 'f97316',
      });
      slide5.addText([
        { text: 'Foundation: ', options: { bold: true } },
        { text: data.slide5.progress1Status || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.2,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide5.addText([
        { text: 'Structure: ', options: { bold: true } },
        { text: data.slide5.progress2Status || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.6,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide5.addText([
        { text: 'Finishing: ', options: { bold: true } },
        { text: data.slide5.progress3Status || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.0,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide5.addText([
        { text: 'Possession: ', options: { bold: true } },
        { text: data.slide5.progress4Status || 'Not provided' },
      ], {
        x: 0.5,
        y: 3.4,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });

      // Slide 6: Additional Information
      const slide6 = pptx.addSlide();
      slide6.addText('Additional Information', {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 28,
        bold: true,
        color: '3d1a6e',
      });
      slide6.addText([
        { text: 'Metro Network: ', options: { bold: true } },
        { text: data.slide2.metroKm || 'Not provided' },
      ], {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide6.addText([
        { text: 'BRTS Network: ', options: { bold: true } },
        { text: data.slide2.brtsKm || 'Not provided' },
      ], {
        x: 0.5,
        y: 1.9,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide6.addText([
        { text: 'Daily Flights: ', options: { bold: true } },
        { text: data.slide2.dailyFlights || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.3,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });
      slide6.addText([
        { text: 'Retail Rank: ', options: { bold: true } },
        { text: data.slide2.retailRank || 'Not provided' },
      ], {
        x: 0.5,
        y: 2.7,
        w: 9,
        h: 0.4,
        fontSize: 14,
      });

      // Slide 7: Thank You
      const slide7 = pptx.addSlide();
      slide7.background = { color: '1f2937' }; // gray-800
      slide7.addText('Thank You!', {
        x: 1,
        y: 3,
        w: 8,
        h: 1.5,
        fontSize: 48,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
      });
      slide7.addText('Contact Information', {
        x: 1,
        y: 4.5,
        w: 8,
        h: 0.5,
        fontSize: 20,
        color: 'FFFFFF',
        align: 'center',
      });

      // Save the presentation
      await pptx.writeFile({ fileName: 'presentation.pptx' });
      
      alert('Presentation downloaded successfully!');
    } catch (error) {
      console.error('Error generating PPT:', error);
      alert('Failed to generate presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Download PPT</h1>
      <p className="text-gray-600 mb-6">Generate and download your presentation</p>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-12">
          <Download className="mx-auto mb-4 text-primary-600" size={64} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Download?
          </h2>
          <p className="text-gray-600 mb-8">
            Click the button below to generate and download your PowerPoint presentation.
            The presentation will include all 7 slides with your information.
          </p>
          <button
            onClick={generatePPT}
            disabled={isGenerating}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {isGenerating ? 'Generating...' : 'Download Presentation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPPT;