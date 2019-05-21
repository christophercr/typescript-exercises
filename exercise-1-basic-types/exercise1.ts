// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Exercise 1 – Basic Types
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objectives: 
// • Annotate primitive types, arrays, and 'any' types
// • Identify when type checking happens
// • Afterwards we will analyze transpiler output

export function exercise1_1() {
  // ======== Exercise 1.1 ========
  // TODO:
  // • Add type annotations (as explicit as possible)
  // • Fix errors (if applicable)

  const integer = 6;
  const float = 6.66;
  const hex = 0xf00d;
  const binary = 0b1010011010;
  const octal = 0o744;
  const negZero = -0;
  const actuallyNumber = NaN;
  const largestNumber = Number.MAX_VALUE;
  const mostBiglyNumber = Infinity;

  const members: any[] = [
    integer,
    float,
    hex,
    binary,
    octal,
    negZero,
    actuallyNumber,
    largestNumber,
    mostBiglyNumber
  ];

  members[0] = '12345';

  console.log('[Exercise 1.1]', members);
}

export function exercise1_2() {
  // ======== Exercise 1.2 ========
  // TODO:
  // • Add type annotations (as explicit as possible)
  // • Fix errors (if applicable)

  const sequence = Array.from(Array(10).keys());
  const animals = ['pangolin', 'aardvark', 'echidna', 'binturong'];
  const stringsAndNumbers = [1, 'one', 2, 'two', 3, 'three'];
  const allMyArrays = [sequence, animals, stringsAndNumbers];

  console.log('[Exercise 1.2]', allMyArrays);
}

export function exercise1_3() {
  // ======== Exercise 1.3 ========
  // TODO:
  // • Add type annotations (as explicit as possible)
  // • Fix errors (if applicable)

  // We want to represent an inventoryItem as a structure where
  // the first entry is the item name and the second is the quantity

  const inventoryItem = ['fidget wibbit', 11];

  // later we destructure it
  const [name, qty] = inventoryItem;

  const msg = addInventory(name, qty);

  console.log('[Exercise 1.3]', msg);

  function addInventory(name: string, quantity: number): string {
    return `Added ${quantity} ${name}s to inventory.`;
  }
}

export function exercise1_4() {
  // ======== Exercise 1.4 ========
  // TODO:
  // • Fix the error so that the name of the TShirtType entry is logged to the console

  const enum TShirtType {
    CrewNeck = "Crew Neck", // must be initialized with a constant
    VNeck = "V Neck",
    Henley = "Henley",
    Polo = "Polo",
    SpecialPolo = Polo, // may be initialized with another entry
    ScoopNeck = "Scoop Neck"
  }

  let myTShirtType = TShirtType.CrewNeck;

  console.log("[Exercise 1.4] My T-Shirt type: ", myTShirtType);

  const nameOfShirtType: string = TShirtType[myTShirtType];

  console.log("[Exercise 1.4] Real name of T-shirt type", nameOfShirtType);
}
