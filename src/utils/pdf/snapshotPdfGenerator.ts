import { jsPDF } from 'jspdf';

/**
 * Generate a PDF from pre-captured slide snapshots.
 * Each snapshot is a base64 data URL (PNG/JPEG) captured via html2canvas.
 * The PDF preserves the exact visual appearance approved by the user.
 */
export async function generateSnapshotPDF(
  snapshots: Record<number, string>,
  totalSlides: number,
  setIsGenerating?: (v: boolean) => void
): Promise<void> {
  if (setIsGenerating) setIsGenerating(true);

  try {
    // 16:9 widescreen in inches (matching the existing PDF format)
    const W = 13.33;
    const H = 7.5;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [W, H],
    });

    let firstPage = true;

    for (let i = 0; i < totalSlides; i++) {
      const snapshot = snapshots[i];
      if (!snapshot) continue; // shouldn't happen if all finalized

      if (!firstPage) {
        doc.addPage([W, H], 'landscape');
      }
      firstPage = false;

      // Add the snapshot as a full-page image
      // The snapshot is at 2-3x resolution so it will look crisp
      try {
        doc.addImage(snapshot, 'PNG', 0, 0, W, H, undefined, 'FAST');
      } catch {
        // Fallback: try JPEG format
        try {
          doc.addImage(snapshot, 'JPEG', 0, 0, W, H, undefined, 'FAST');
        } catch (e2) {
          console.error(`Failed to add slide ${i + 1} to PDF:`, e2);
        }
      }
    }

    doc.save('presentation.pdf');
  } finally {
    if (setIsGenerating) setIsGenerating(false);
  }
}
