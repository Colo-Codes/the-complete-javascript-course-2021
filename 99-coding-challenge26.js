/*
Asynchronous JavaScript

Coding Challenge #3

Your tasks:

PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array �
5. Add the 'parallel' class to all the images (it has some CSS styles)

Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function

GOOD LUCK

 */

'use strict';

// Part 1

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imagesDiv = document.querySelector('.images');
    const image = document.createElement('img');
    image.setAttribute('src', imgPath);

    image.addEventListener('load', () => {
      imagesDiv.append(image);
      resolve(imagesDiv.lastElementChild);
    });
    image.addEventListener('error', () => reject(new Error('(!) Error on image load')));
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    let image = await createImage('./assets/img/async-challenge/img-1.jpg');
    console.log('1: After first await createImage');

    await wait(2);
    console.log('2: After first await wait(2)');
    image.style.display = 'none';

    image = await createImage('./assets/img/async-challenge/img-2.jpg');
    console.log('3: After second await createImage');

    await wait(2);
    console.log('4: After second await wait(2)');
    image.style.display = 'none';

  } catch (err) {
    console.error(err);
  }
  document.querySelector('.images').innerHTML = '<p style="font-size: 5rem; text-align: center;">The End</p>';
}

loadNPause();

// Part 2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs); // This returns the Promises, no the actual 'resolutions'

    // const imgsSettled = await Promise.race(imgs);
    // const imgsSettled = await Promise.any(imgs);
    // const imgsSettled = await Promise.all(imgs);
    const imgsSettled = await Promise.allSettled(imgs);
    // console.log(imgsSettled); // This returns the 'resolutions'

    imgsSettled.forEach(img => console.log(img.value)); // Getting the 'value' property because 'allSettled' outputs an array of objects.
    imgsSettled.forEach(img => img.value.classList.add('parallel'));

  } catch (err) {
    console.error(`Catching error: ${err}`); // Works with Promise.all, Promise.race, Promise.any if an image is not found
  }
}

loadAll([
  './assets/img/async-challenge/img-1.jpg',
  './assets/img/async-challenge/img-2.jpg',
  './assets/img/async-challenge/img-3.jpg'
]);

/* ->
(3) [Promise, Promise, Promise]
  0: Promise {<pending>}
  1: Promise {<pending>}
  2: Promise {<pending>}
*/