// ⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇⏇
//    Exercise 5 – Classes
// ⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈⏈

// Objectives:
// • Create classes with typed properties and methods
// • Add access modifiers to class members

export function exercise5_1() {

  // ======== Exercise 5.1 ========
  // TODO:
  // • Add explicit parameter types to constructor
  // • Add typed parameters for storing values

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  const jane = new Person('Jane', 31);

  console.log('[Exercise 5.1]', `The new person's name is ${jane.name}.`);
}

export function exercise5_2() {
  // ======== Exercise 5.2 ========
  // TODO:
  // • Explicitly make the title and salary properties publicly available
  // • Reduce class to the minimum lines of code while maintaining functionality

  class Employee {
    title: string;
    salary: number;

    constructor(title: string, salary: number) {
      this.title = title;
      this.salary = salary;
    }
  }

  const employee = new Employee('Engineer', 100000);

  console.log('[Exercise 5.2]', `The new employee's title is ${employee.title} and they earn $ ${employee.salary}.`);
}

export function exercise5_3() {
  // ======== Exercise 5.3 ========
  // TODO:
  // • Add complete typings
  // • Make the Snake class inherit from Animal
  // • Make the Pony class inherit from Animal
  // • Make it so that the 'name' member cannot be publicly accessed
  // • The class Animal should not be instantiable.

  class Animal {
    constructor(name) {
    }

    move(meters) {
      console.log(`[Exercise 5.3] ${this.name} moved ${meters}m.`);
    }
  }

  class Snake {
    move(meters) {
      console.log('[Exercise 5.3] Slithering...');
      // should call parent's `move` method, with a default slither of 5 meters
    }
  }

  class Pony {
    move(meters) {
      console.log('[Exercise 5.3] Galloping...');
      // should call parent's `move` method, with a default gallop of 60 meters
    }
  }

  // The class Animal should not be instantiable.
  // Delete or comment out the 2 lines below the desired error is achieved.
  const andrew = new Animal("Andrew the Animal");
  andrew.move(5);

  const sammy = new Snake("Sammy the Snake");
  sammy.move();
  console.log('[Exercise 5.3] sammy.name',sammy.name); // Should return error

  const pokey = new Pony("Pokey the Pony");
  pokey.move(34);
  console.log('[Exercise 5.3] pokey.name', pokey.name); // Should return error
}

export function exercise5_4() {
  // ======== Exercise 5.4 ========
  // TODO:
  // • Make it so that only the Desk and Chair classes can see the manufacturer member

  class Furniture {
    constructor(manufacturer: string = 'IKEA') {
    }
  }

  class Desk extends Furniture {
    kind() {
      console.log('[Exercise 5.4]', `This is a desk made by ${this.manufacturer}`);
    }
  }

  class Chair extends Furniture {
    kind() {
      console.log('[Exercise 5.4]', `This is a chair made by ${this.manufacturer}`);
    }
  }

  const desk = new Desk();
  desk.kind();
  desk.manufacturer; // Should return error

  const chair = new Chair();
  chair.kind();
  chair.manufacturer; // Should return error
}

export function exercise5_5() {
  // ======== Exercise 5.5 ========
  // TODO:
  // • Eliminate the error without changing references to `Student.school`

  class Student {
    public school: string = 'Harry Herpson High School';

    constructor(private name: string) {
    };

    introduction() {
      console.log('[Exercise 5.5]', `Hi, my name is ${this.name} and I attend ${Student.school}`);
    }
  }

  const student = new Student('Morty');
  console.log('[Exercise 5.5] Student.school', Student.school);
  student.introduction();
}
