import { toPng } from 'html-to-image';

export async function generateImage(elementId: string): Promise<string> {
  const node = document.getElementById(elementId);

  if (!node) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
    });
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate image:', error);
    throw error;
  }
}

export function downloadImage(dataUrl: string, filename: string = 'hatsumode-result.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
