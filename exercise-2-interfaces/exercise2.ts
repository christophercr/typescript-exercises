// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//   Exercise 2 – Interfaces
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objectives:
// • Demonstrate structural typing (duck typing)
// • Create an interface and implement it on a class
// • Differentiate type aliases from interfaces

export function exercise2_1() {
  // ======== Exercise 2.1 ========
  // TODO:
  // • Replace the type of 'item' param with an interface
  // • Make variantId optional

  function addToCart(item: { id: number, title: string, variantId: number }) {
    console.log('[Exercise 2.1]', `Adding "${item.title}" to cart.`);
  }

  addToCart({id: 1, title: 'Concrete shoes'});
}

export function exercise2_2() {
  // ======== Exercise 2.2 ========
  // TODO:
  // • Create an interface `Coords` that has numeric `latitude` and `longitude` properties.
  // • Extend the existing interface `City` (without modifying it inline) by adding a
  //   `coords` property of type `Coords`.
  // • Fix errors (if applicable)

  // -- do not edit this interface
  // (pretend this is coming from external `foo.d.ts` lib)
  interface City {
    name: string;
  }
  // --------------------------

  const montreal = {
    coords: {
      latitude: 42.332,
      longitude: -73.324,
    },
    name: 'Montréal',
  };

  const tampa = {
    coords: {
      latitude: '27.9478',
      longitude: '-82.4584',
    },
    name: 'Tampa',
  };

  function getCityInfo(city: City) {
    const coords = `(${city.coords.latitude.toFixed(3)}, ${city.coords.longitude.toFixed(3)})`;
    return `${city.name.toUpperCase()} is located at ${coords}.`;
  }

  console.log('[Exercise 2.2]', `${getCityInfo(montreal)} \n\n ${getCityInfo(tampa)}`);
}

export function exercise2_3() {
  // ======== Exercise 2.3 ========
  // TODO: The purpose of this exercise is simply to illustrate a use of `readonly`

  interface UserSchema {
    readonly id: number;
    name: string;
  }

  class User implements UserSchema {
    constructor(public name: string, readonly id: number) {
    }
  }

  const user = new User('Dog', 1);

  console.log('[Exercise 2.3] user.id', user.id); // readable

  user.name = 'Harold'; // writable
  user.id = 5; // not writable

  console.log(`[Exercise 2.3] User:`, user)
}
