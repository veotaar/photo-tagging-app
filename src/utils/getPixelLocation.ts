const getPixelLocation = (
  imgRef: HTMLImageElement,
  pageX: number,
  pageY: number
): { pixelX: number; pixelY: number; cursorX: number; cursorY: number } => {
  const bounds = imgRef.getBoundingClientRect();
  const left = bounds?.left as number;
  const top = bounds?.top as number;
  const x = pageX - left - window.scrollX;
  const y = pageY - top - window.scrollY;

  const clientWidth = imgRef.clientWidth as number;
  const clientHeight = imgRef.clientHeight as number;
  const naturalWidth = imgRef.naturalWidth as number;
  const naturalHeight = imgRef.naturalHeight as number;

  const pixelX = Number(((x / clientWidth) * naturalWidth).toFixed(2));
  const pixelY = Number(((y / clientHeight) * naturalHeight).toFixed(2));
  const cursorX = x;
  const cursorY = y;

  return {
    pixelX,
    pixelY,
    cursorX,
    cursorY,
  };
};

export default getPixelLocation;
