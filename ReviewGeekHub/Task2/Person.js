class Person {

  constructor(age = 0, sex = 'male', name = '', weight = 0, height = 0) {
    this._name = name;
    this._age = age;
    this._sex = Person.checkSex(sex);
    this._weight = weight;
    this._height = height;
    this.createDNI();
  }

  isAdult() {
    return (this._age >= 18) ? 1 : 0
  }

  calculateIMC() {
    if (this._height === 0) throw new Error('set height');
    const imc = this._weight / Math.pow(this._height, 2);
    if (imc < 20) {
      return -1
    } else if (imc >= 20 && imc <= 25) {
      return 0
    } else {
      return 1
    }
  }

  toString() {
    return 'name: ' + this._name + ', age: ' + this._age + ', sex: ' + this._sex + ', weight: ' + this._weight + ', height: ' + this._height + ', DNI: ' + this._DNI
  }

  createDNI() {
    this._DNI = Math.floor(Math.random() * (100000000 - 10000000)) + 10000000
  }

  static checkSex(sex) {
    return (sex === 'male' || sex === 'female') ? sex : 'male'
  }

  set age(age) {
    this._age = age
  }

  set name(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set sex(sex) {
    this._sex = Person.checkSex(sex);
  }

  set weight(weight) {
    this._weight = weight
  }

  set height(height) {
    this._height = height
  }
}


class Test {

  constructor() {
    Test.createPerson();
  }

  static createPerson() {
    const personData = {
      name: 'Kate',
      age: 18,
      sex: 'female',
      weight: 47,
      height: 1.63
    }
    const firstPerson = new Person(personData.age, personData.sex, personData.name, personData.weight, personData.height),
      secondPerson = new Person(personData.age, personData.sex),
      thirdPerson = new Person();
    secondPerson.weight = 80;
    secondPerson.height = 1.70;
    secondPerson.name = 'Valeria';
    thirdPerson.name = 'Dima';
    thirdPerson.age = 12;
    thirdPerson.sex = 'qqqqqq';
    thirdPerson.weight = 78;
    thirdPerson.height = 1.83;

    Test.checkWeight([firstPerson, secondPerson, thirdPerson]);
    Test.checkAge([firstPerson, secondPerson, thirdPerson]);
    Test.info([firstPerson, secondPerson, thirdPerson]);
  }

  static checkWeight(items) {
    items.map(item => {
      const imc = item.calculateIMC();
      if (imc === -1) {
        console.log(item.name + ' is underweight.')
      } else if (imc === 0) {
        console.log(item.name + ' has an ideal weight.')
      } else {
        console.log(item.name + ' is overweight.')
      }
    })
  }

  static checkAge(items) {
    items.map(item => {
      const age = item.isAdult();
      if (age === 1) {
        console.log(item.name + ' is an adult.')
      } else {
        console.log(item.name + ' is a child.')
      }
    })
  }

  static info(items) {
    items.map(item => {
        console.log(item.toString())
    })
  }

}

new Test();

