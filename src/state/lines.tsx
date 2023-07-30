import { createStore } from "solid-js/store";
import { createSignal, batch } from "solid-js";
import { createWorker } from "tesseract.js";

import { BillLine, processLine } from "~/lib/items";

const [lines, setLines] = createStore<BillLine[]>([]);
export { lines };
export const [selectedLineIndex, setSelectedLineIndex] = createSignal<
  number | null
>(null);
export const selectedLine = () => {
  const index = selectedLineIndex();
  if (index === null) return undefined;
  return lines.at(index);
};

export function setLinesFromReceiptImage(path: string) {
  batch(async () => {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const result = await worker.recognize(path);
    await worker.terminate();

    setLines(result.data.lines.map((line) => processLine(line.text)));
    setSelectedLineIndex(0);
  });
}
