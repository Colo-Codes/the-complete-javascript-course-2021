'use strict';

// Primitive types

let age = 40;
let oldAge = age;
age = 41;
console.log(age);
console.log(oldAge); // The copy of a primitive variable remains unchanged when the original variable is changed (immutability)

// Reference types

const me = {
    name: 'Damian',
    age: 40
};
const friend = me;
friend.age = 35; // The original object changes when a copy of it changes (mutability).
console.log('Friend:', friend);
console.log('Me:', me);

// friend = {}; // We can't assign a new object to 'friend', because 'friend' was defined as a 'const', but we can change its properties and methods, because they live in the Heap and not in the Call Stack.

// Copying objects

const anotherFriend = Object.assign({}, me); // This creates a real copy of the 'me' object that lives in a new memory address on the Heap. But, this method only creates a copy of the first level of the object, so, if the object has another object inside, it will be referenced to the original sub-object. This creates a "shallow copy" of the object.
console.log("anotherFriend:", anotherFriend);
anotherFriend.age = 45;
console.log("anotherFriend:", anotherFriend);
