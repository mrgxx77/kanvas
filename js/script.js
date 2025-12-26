const priceOutput = document.querySelector('.sum span');

const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');

let currentWidth = 0;
let currentHeight = 0;

// ціна за 1 см²
const pricePerCm = 1;

function calculatePrice() {
  let price = currentWidth * currentHeight * pricePerCm;

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      if (index === 0) price += 35;
      if (index === 1) price += 10;
      if (index === 2) price += 40;
    }
  });

  priceOutput.textContent = price;
}
const sizeButtons = document.querySelectorAll('.a');
const canvas = document.querySelector('.canvas');

const scale = 3;

sizeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); 

    const [width, height] = btn.textContent
      .toLowerCase()
      .split('x')
      .map(Number);     

    canvas.style.width = width * scale + 'px';
    canvas.style.height = height * scale + 'px';
    currentWidth = width;
    currentHeight = height;
    calculatePrice();
  });   
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', calculatePrice);
});
