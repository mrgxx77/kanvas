const priceOutput = document.querySelector('.sum span');
const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');
const canvas = document.querySelector('.canvas');

const sizeButtons = document.querySelectorAll('.a');
const inputWidth = document.querySelector('.input-width');
const inputHeight = document.querySelector('.input-height');
const calculateBtn = document.querySelector('.calculate-btn');

const scale = 3;
const priceCm = 1;

let currentWidth = 0;
let currentHeight = 0;
let price = 0;

/* стандартні розміри */
sizeButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const [w, h] = btn.textContent.split('x').map(Number);

    currentWidth = w;
    currentHeight = h;

    canvas.style.width = w * scale + 'px';
    canvas.style.height = h * scale + 'px';

    calculatePrice();
  });
});

/* кастомні розміри */
calculateBtn.addEventListener('click', () => {
  const w = Number(inputWidth.value);
  const h = Number(inputHeight.value);

  if (w < 30 || h < 30 || w > 200 || h > 150) {
    alert('Введіть коректні значення (мінімум 30 см, максимальна ширина 200 см, максмальна висота 150 см)');
    return;
  }

  currentWidth = w;
  currentHeight = h;

  canvas.style.width = w * scale + 'px';
  canvas.style.height = h * scale + 'px';

  calculatePrice();
});

checkboxes.forEach(cb => {
  cb.addEventListener('change', calculatePrice);
});

/* ціна */
function calculatePrice() {
  price = (currentWidth + currentHeight) * priceCm;

  let frame = false;
  let expensive = false;

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      if (i === 0) {
        price += 35;
        expensive = true;
      }
      if (i === 1) {
        price += 10;
        frame = true;
      }
      if (i === 2) price += 40;
    }
  });

  canvas.style.border = frame ? '5px solid #28526c' : 'none';
  canvas.style.background = expensive ? '#fbfaf4ff' : '#fff';
  priceOutput.textContent = price;
}
priceOutput.textContent = price;

document.querySelector('.set').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.count').style.display = 'block';
});
