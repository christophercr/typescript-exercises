// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Exercise 3 – Functions
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objectives:
// • Convert existing JavaScript functions to TypeScript
// • Understand functions as types
// • Convert specifically-typed functions to more
//   flexible generic functions

export function exercise3_1() {
  // ======== Exercise 3.1 ========
  // TODO: optional params
  // • Add explicit parameter types and return types to the `deposit` function
  // • Make the function's `message` parameter *optional*

  const bankAccount = {
    money: 0,
    deposit(value: number, message?: string) {
      this.money += value;
      if (message) {
        console.log(message);
      }
    }
  };

  bankAccount.deposit(20);
  bankAccount.deposit(10, 'Deposit received');

  console.log('[Exercise 3.1]', `Account value: $${bankAccount.money}`);
}

export function exercise3_2() {
  // ======== Exercise 3.2 ========
  // For a given word, we compute its Scrabble score.
  // TODO: tuples
  // • Add type annotations wherever possible

  function computeScore(word) {
    const letters = word.toUpperCase().split('');
    return letters.reduce((accum, curr) => accum += getPointsFor(curr), 0);
  }

  function getPointsFor(letter): number {
    const lettersAndPoints: [string, number][] = [
      ['AEOIULNRST', 1],
      ['DG', 2],
      ['BCMP', 3],
      ['FHVWY', 4],
      ['K', 5],
      ['JX', 8],
      ['QZ', 10],
    ];

    return lettersAndPoints.reduce((computedScore: number, pointsTuple: [string, number]) => {
      const [letters, score] = pointsTuple;
      if (letters.split('').find((ll) => ll === letter)) {
        return computedScore += score;
      }
      return computedScore;
    }, 0);
  }

  console.log('[Exercise 3.2]', `zoo is worth ${computeScore('zoo')} points.`);
}

export function exercise3_3() {
  // ======== Exercise 3.3 ========
  // TODO: default params
  // • Add explicit parameter types and return types
  // • Add a default greeting: "hello"

  function greet(greeting: string = 'hello') {
    return greeting.toUpperCase();
  }

  const defaultGreeting = greet();
  const portugueseGreeting = greet('Oi como vai!');

  console.log('[Exercise 3.3]', defaultGreeting, portugueseGreeting);
}

export function exercise3_4() {
  // ======== Exercise 3.4 ========
  // TODO: void
  // • Add parameter type annotation
  // • Even though this function doesn't return, add an explicit return type

  function layEggs(quantity: number, color: string): void {
    console.log(`[Exercise 3.4] You just laid ${quantity} ${color} eggs. Good job!`);
  }

  layEggs(10, "blue");
}

export function exercise3_5() {
  // ======== Exercise 3.5 ========
  // Here we've initialized two variables with function types.
  // Later we assign them to functions.
  // TODO: match functions with the correct types
  // • Fix the errors

  let multiply: (val1: number, val2: number) => number;
  let capitalize: (val: string) => string;

  capitalize = function (value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  };

  multiply = function (x: number, y: number): number {
    return x * y;
  };

  console.log('[Exercise 3.5]', capitalize(`nifty ${multiply(5, 10)}`));
}

export function exercise3_6() {
  // ======== Exercise 3.6 ========
  // Currently, our function `pushToCollection` accepts *any* item and adds it,
  // (indiscriminantly) to *any* kind of array.
  //
  // A couple problems with this:
  //
  //     1. The `any` type causes us to lose ALL typing information on our params.
  //     2. This looseness has come back to back to bite us during runtime. (Just look at `incrementByTwo`!)
  //
  // TODO: generic functions
  // • Implement `pushToCollection` as a generic function. (This should create
  //   compile-time errors in places where incorrect values are being added to
  //   a given collection. Fix these values to the correct types.)
  // • Once made generic, `pushToCollection` should be *generic* enough to operate
  //   on items and collections of any type while continuing to enforce that they match.

  const numberCollection: number[] = [];
  const stringCollection: string[] = [];

  function pushToCollection<T>(item: T, collection: T[]): T[] {
    collection.push(item);
    return collection;
  }

  // Add some stuff to the collections
  pushToCollection('false', stringCollection);
  pushToCollection('hi', stringCollection);
  pushToCollection('[]', stringCollection);

  pushToCollection(1, numberCollection);
  pushToCollection(2, numberCollection);
  pushToCollection(3, numberCollection);

  const incrementedByTwo = numberCollection.map((num) => num + 2);

  console.log('[Exercise 3.6]', `[${incrementedByTwo}] should deeply equal [3,4,5]`);
}

export function exercise3_7() {
  // ======== Exercise 3.7 ========
  // TODO: generic constraint
  // • Fix the 'displayRecipe()' function so that we ensure that property 'chef' is there when we call the function

  abstract class Recipe {
    constructor(public name: string, public ingredients: string[]) {
    }
  }

  class ItalianRecipe extends Recipe {
  }

  class FrenchRecipe extends Recipe {
    constructor(name: string, ingredients: string[], public chef: string) {
      super(name, ingredients);
    }
  }

  class BrittanyRecipe extends FrenchRecipe {
  }

  function displayRecipe<T extends FrenchRecipe>(recipe: T): void {
    console.log(`[Exercise 3.7] This is a french recipe conceived by the following chef: ${recipe.chef}`); // the 'chef' property should always be there when displayRecipe() is called
  }

  const brittanyRecipe = new BrittanyRecipe("Crèpe Bretonne", ["Eggs", "Flour", "Salt", "..."], "Bertrand Denis");
  const italianRecipe = new ItalianRecipe("Spaghetti Bolognese", ["Pasta", "Tomatoes", "Garlic", "Onions", "..."]);

  // displayRecipe(italianRecipe); // property 'chef' is missing
  displayRecipe(brittanyRecipe); // OK
}
