import html2canvas from "html2canvas";
export function decodeData(payload: string) {
  try {
    const text = JSON.parse(decodeURIComponent(atob(payload)));
    return text;
  } catch (err) {}
}

const canvasToImage = (
  canvas: HTMLCanvasElement
): HTMLImageElement | undefined => {
  const newEl = new Image();
  const src = canvas.toDataURL("image/png");
  newEl.src = src;
  newEl.style.width = `${canvas.width}px`;
  newEl.style.height = `${canvas.height}px`;
  return newEl;
};
const generateCanvas = (previewEl: HTMLElement): Promise<HTMLImageElement> => {
  const c = previewEl as HTMLElement;
  const rect = c.getBoundingClientRect();
  return new Promise((res, rej) =>
    html2canvas(c, {
      scale: 1,
      width: rect.width + 18,
      height: rect.height + 18,
      x: 0, //rect.left,
      y: 0, //rect.top,
      scrollX: 0,
      scrollY: 0, //-scrollTop,
    })
      .then((canvas) => {
        const image = canvasToImage(canvas);
        if (image) res(image);
        else rej();
      })
      .catch((e) => rej(e))
  );
};

const searchText = location.search;
const data = decodeData(searchText.split("data=")[1]);
const preview = document.getElementById("preview") as HTMLDivElement;

// if (preview) preview.innerHTML = data;

const range = document.createRange();
// make the parent of the first div in the document becomes the context node
range.selectNode(preview);
const documentFragment = range.createContextualFragment(data);
preview.appendChild(documentFragment);

setTimeout(async () => {
  const image = await generateCanvas(preview!);
  const base64 = image.src;
  window.parent.postMessage({ base64, type: "image" }, "*");
}, 1);
