const heading = document.getElementById('heading');


heading.textContent= 'Welcome to the world of JavaScript';

// document.writeln('This is a new content written by JavaScript')

// const header2 = document.createElement('h1');

// header2.textContent = 'This is a heading created by JavaScript';

// const container = document.querySelector('.container');
// container.appendChild(header2);

// function changeHeading(element) {
//     element.textContent = 'Hello World';
// }

// const button = document.getElementById('button');
// button.addEventListener('click', () => {
//     changeHeading(heading);
// });


function changeHeading(element, text) {
    element.textContent = text;
}

const button = document.getElementById('button');
button.addEventListener('mouseenter', () => {
    changeHeading(heading, 'Hello World');
});

button.addEventListener('mouseleave', () => {
    changeHeading(heading, 'Welcome to the world of JavaScript');
});
