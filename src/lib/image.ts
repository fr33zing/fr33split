export interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimensions(src: string): Promise<ImageDimensions> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = src;
  });
}
