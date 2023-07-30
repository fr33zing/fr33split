export enum BillLineKind {
  Junk = "Junk",
  Item = "Item",
  Tax = "Tax",
  Tip = "Tip",
  Subtotal = "Subtotal",
  Total = "Total",
}

export interface BillLine {
  kind: BillLineKind;
  text: string;
  quantity?: number;
  value?: number;
}

const patterns = {
  item: /(?<quantity>\d*)\s+(?<name>[^$]+?)\s+(?<price>\d+\s*[.,]\s*\d\d)/,
};

function parseQuantity(quantity: string): number {
  return parseInt(quantity.replace("x", ""));
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(",", ".").replace(" ", ""));
}

export function processLine(line: string): BillLine {
  line = line.trim();

  const junk = () => ({ kind: BillLineKind.Junk, text: line });
  let match;

  if ((match = line.match(patterns.item))) {
    if (!match.groups) return junk();
    return {
      kind: BillLineKind.Item,
      text: match.groups.name,
      quantity: parseQuantity(match.groups.quantity),
      value: parsePrice(match.groups.price),
    };
  }

  return junk();
}
