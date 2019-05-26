// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Exercise 4 – Types
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objectives:
// • Understand how TypeScript performs code flow analysis
// • Create and apply union and intersection types
// • Use basic type guards (narrowing types w/ typeof, instanceof, etc.)

export function exercise4_1() {

  // ======== Exercise 4.1 ========
  // TypeScript is intelligent about the possible types of a variable,
  // depending on the code path.
  // TODO: compare the inferred types when the 'strict' option in tsconfig.json is enabled and disabled
  // • Simply inspect the possible types by hovering over `text` to see
  //   how the inferred type changes if assumptions can be safely made
  //   about the possible types within the given code path.

  function trimmedLength1(text: string | null | undefined) {
    text; // text: string | null | undefined

    if (typeof text === 'string') {
      text; // text: string

      return text.trim().length;
    }

    text; // text: null | undefined
  }

  function trimmedLength2(text: string | null | undefined) {
    text; // text: string | null | undefined

    if (typeof text === 'string') {
      text; // text: string

      return text.trim().length;
    } else if (text == null) {
      text; // text: null | undefined (remember == coerces undefined)

      return;
    }

    text; // text: never
  }

  function trimmedLength3(text: string | null | undefined) {
    if (text) {
      return text.trim().length;
    }

    text; // text: string | null | undefined (because '' == false)
  }

  function trimmedLength4(text: string | null | undefined) {
    if (!text) {
      text;
      return;
    }

    return text.trim().length; // text: string
  }

  function trimmedLength5(text: any) {
    text; // text: any

    if (typeof text === 'string') {
      return text.trim().length; // text: string
    }

    text; // text: any (note how TS does not subtract types from `any`)
  }

  console.log('[Exercise 4.1]', `${trimmedLength1("   hi     ")}`);
}

export function exercise4_2() {
  // ======== Exercise 4.2 ========
  // TODO: type guards (typeof)
  // • Use a type guard to fill out the body of the `padLeft` function.

  function padLeft(value: string, padding: number | string): string {
    // if padding is a number, return `${Array(padding + 1).join(' ')}${value}`
    // if padding is a string, return padding + value
    if (typeof padding === "number") {
      return `${Array(padding + 1).join(' ')}${value}`;
    } else {
      return padding + value
    }
  }

  console.log('[Exercise 4.2]', `
    ${padLeft('🐕', 0)}
    ${padLeft('🐕', '🐩')}
    ${padLeft('🐕', '🐩🐩')}
    ${padLeft('🐕', '🐩🐩🐩')}
    ${padLeft('🐕', '🐩🐩🐩🐩')}
  `);
}

export function exercise4_3() {
  // ======== Exercise 4.3 ========
  // TODO: generic functions, type guards
  // • Add type annotations (`any` excluded)
  // • Inspect inferred type of `element` in different code branches
  // • Finally turn `flatten` into a generic function

  const numbers: (number | number[])[] = [1, 2, 3, [44, 55], 6, [77, 88], 9, 10];

  function flatten(array: (number | number[])[]): number[] {
    const flattened: number[] = [];

    for (const element of array) {
      if (Array.isArray(element)) {
        element; // any[]
        flattened.push(...element);
      } else {
        element; // any
        flattened.push(element);
      }
    }

    return flattened;
  }

  function genericFlatten<T>(array: (T | T[])[]): T[] {
    const flattened: T[] = [];

    for (const element of array) {
      if (Array.isArray(element)) {
        element; // any[]
        flattened.push(...element);
      } else {
        element; // any
        flattened.push(element);
      }
    }

    return flattened;
  }

  const flattenedNumbers = flatten(numbers);
  console.log('[Exercise 4.3]', flattenedNumbers);

  const genericFlattenedNumbers = genericFlatten(numbers);
  console.log('[Exercise 4.3]', genericFlattenedNumbers);
}

export function exercise4_4() {
  // ======== Exercise 4.4 ========
  //
  // TODO: type intersection, type alias, type guards (instanceof, custom)
  // • Birds and Fish both lay eggs. Only Birds fly. Only Fish swim. Define
  //   two new types: `BirdLike` and `FishLike` based on these traits.
  // • Create a type alias for `Bird OR Fish` called `Animal`
  // • Use a type guard in `interrogateAnimal` to allow the fishes to swim the and birds to fly.
  // • Add any missing type annotations, being as explicit as possible.

  interface EggLayer {
    layEggs(): void;
  }

  interface Flyer {
    fly(height: number): void;
  }

  interface Swimmer {
    swim(depth: number): void;
  }

  // add type alias(es) here
  type BirdLike = Flyer & EggLayer;
  type FishLike = Swimmer & EggLayer;
  type Animal = Bird | Fish;

  class Bird implements BirdLike {
    constructor(public species: string) {
    }

    layEggs(): void {
      console.log('[Exercise 4.4] Laying bird eggs.');
    }

    fly(height: number): void {
      console.log(`[Exercise 4.4] Flying to a height of ${height} meters.`);
    }
  }

  class Fish implements FishLike {
    constructor(public species: string) {
    }

    layEggs(): void {
      console.log('[Exercise 4.4] Laying fish eggs.');
    }

    swim(depth: number): void {
      console.log(`[Exercise 4.4] Swimming to depth of ${depth} meters.`);
    }
  }

  function getRandomAnimal(): Animal {
    const animals: Animal[] = [
      new Bird('puffin'),
      new Bird('kittiwake'),
      new Fish('sea robin'),
      new Fish('leafy seadragon'),
    ];

    return animals[Math.floor(Math.random() * animals.length)];
  }

  function interrogateAnimal(animal = getRandomAnimal()) {
    if (animal instanceof Fish) {
      animal.swim(10); // call only if it is a fish
    } else if (animal instanceof Bird) {
      animal.fly(10); // call only if it is a bird
    }

    return animal.species;
  }

  console.log('[Exercise 4.4]', `We've got a ${interrogateAnimal()} on our hands!`);
}

export function exercise4_5() {
  // ======== Exercise 4.5 ========
  //
  // TODO:
  // • This exercise is just to illustrate the resulting type of a union.
  // • Inspect what properties of 'game' that are available inside the 'displayGame()' function

  interface BoardGame {
    name: string;
    description: string;
    minimalAge: number;
    players: string;
    duration: string;
  }

  interface VideoGame {
    name: string
    description: string;
    minimalAge: number;
    players: string;
    online: boolean;
  }

  function displayGame(game: VideoGame | BoardGame) {
    console.log(`[Exercise 4.5] Game name: ${game.name}`);
  }
}

export function exercise4_6() {
  // ======== Exercise 4.6 ========
  //
  // TODO: type query keyof
  // • Change the 'displayGameProperty()' function to prevent calling it with an invalid property name

  interface Game {
    name: string;
    players: number;
  }

  function displayGameProperty(game: Game, propertyName: keyof Game): void {
    console.log('[Exercise 4.6]', game[propertyName]);
  }

  const game: Game = {name: "Chess", players: 2};

  displayGameProperty(game, "name");
  // displayGameProperty(game, "creator"); // should give a compilation error because Game has no 'creator' property!
}

export function exercise4_7() {
  // ======== Exercise 4.7 ========
  //
  // TODO:
  // • This exercise is just to illustrate the utility of Mapped types
  // • Check which properties can be added with the resulting types ButtonGeneric and ButtonGenericInvisible

  interface Button {
    buttonColor?: "primary" | "accent" | "warn" | "success" | "alert" | "white";
    icon?: string;
    label?: string;
    labelActivated?: string;
    labelSwitchFunction?: () => boolean;
    isEnabled?: boolean;
    iconActivated?: string;
    iconSwitchFunction?: () => boolean;
    className?: string;
  }

  interface InvisibleButton extends Button {
    isVisible?: boolean;
  }

  type UnusedLabelProps = "labelActivated" | "labelSwitchFunction";

  type UnusedIconProps = "iconActivated" | "iconSwitchFunction";

  type ButtonGeneric =
    Required<Pick<Button, Exclude<keyof Button, UnusedLabelProps | UnusedIconProps>>>
    & Pick<Button, UnusedIconProps>;

  type ButtonGenericInvisible =
    Required<Pick<InvisibleButton, Exclude<keyof InvisibleButton, UnusedLabelProps | UnusedIconProps>>>
    & Partial<Pick<InvisibleButton, UnusedIconProps>>;

  const genericBtn: ButtonGeneric = {
    buttonColor: "white",
    className: "some-class",
    icon: "some icon",
    iconActivated: "another icon",
    iconSwitchFunction: () => false,
    isEnabled: true,
    label: "this is a generic button"
  };

  const invisibleGenericBtn: ButtonGenericInvisible = {
    buttonColor: "white",
    className: "some-class",
    icon: "some icon",
    iconActivated: "another icon",
    iconSwitchFunction: () => false,
    isEnabled: true,
    label: "this is a generic button",
    isVisible: true
  };
}

export function exercise4_8() {
  // ======== Exercise 4.8 ========
  //
  // Here 'itemLocation' is defined as having type any and it's assigned the value of 10, but we use it unsafely.
  //
  // TODO: unknown vs any
  // • Change the type of 'itemLocation' for one that is not too flexible but still allows us compile the code
  // (although runtime errors might still happen)

  let itemLocation: unknown = 10;

  // type guard for Explicit Structural Check
  function isItemWithCoordinates(item: any): item is { coordinates: { x: any; y: any; z: any } } {
    return !!item && typeof item === "object" && "coordinates" in item && "x" in item.coordinates && "y" in item.coordinates && "z" in item.coordinates
  }

  if (isItemWithCoordinates(itemLocation)) {
    itemLocation.coordinates.x;
    itemLocation.coordinates.y;
    itemLocation.coordinates.z;
  }

  // type assertion
  type ItemWithCoordinates = { coordinates: { x: any; y: any; z: any } };
  (itemLocation as ItemWithCoordinates).coordinates.x;
  (itemLocation as ItemWithCoordinates).coordinates.y;
  (itemLocation as ItemWithCoordinates).coordinates.z;

  const printLocation = (loc: string) => {
    console.log(loc.toLowerCase());
  };

  printLocation(itemLocation as string);

  (itemLocation as Function)();

  type ConstructorFunction = () => void;

  const iPhoneLoc = new (itemLocation as ConstructorFunction)();
}
