let array = [];
let speed = 50;
let isSorting = false;

const algorithmSelect = document.getElementById('algorithm');
const speedSlider = document.getElementById('speed');
const newArrayButton = document.getElementById('newArray');
const startButton = document.getElementById('start');
const arrayContainer = document.getElementById('array-container');

speedSlider.addEventListener('input', (e) => {
    speed = 101 - e.target.value;
});

newArrayButton.addEventListener('click', generateArray);
startButton.addEventListener('click', () => {
    if (isSorting) return;
    isSorting = true;
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'mergeSort':
            mergeSort(0, array.length - 1);
            break;
        case 'quickSort':
            quickSort(0, array.length - 1);
            break;
        default:
            isSorting = false;
    }
});

function generateArray() {
    if (isSorting) return;
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('red');
            bars[j + 1].classList.add('red');
            await sleep(speed);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }
            bars[j].classList.remove('red');
            bars[j + 1].classList.remove('red');
        }
        bars[array.length - i - 1].classList.add('green');
    }
    isSorting = false;
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].classList.add('red');
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('yellow');
            await sleep(speed);
            if (array[j] < array[minIndex]) {
                if (minIndex !== i) bars[minIndex].classList.remove('red');
                minIndex = j;
                bars[minIndex].classList.add('red');
            }
            bars[j].classList.remove('yellow');
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[minIndex].style.height = `${array[minIndex] * 3}px`;
        bars[minIndex].classList.remove('red');
        bars[i].classList.add('green');
    }
    isSorting = false;
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].classList.add('red');
        await sleep(speed);
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j].classList.add('red');
            await sleep(speed);
            bars[j].classList.remove('red');
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].classList.remove('red');
        bars[i].classList.add('green');
    }
    isSorting = false;
}

async function mergeSort(left, right) {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSort(left, middle);
    await mergeSort(middle + 1, right);
    await merge(left, middle, right);
}

async function merge(left, middle, right) {
    const bars = document.getElementsByClassName('array-bar');
    let n1 = middle - left + 1;
    let n2 = right - middle;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[middle + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        bars[k].classList.add('red');
        await sleep(speed);
        if (L[i] <= R[j]) {
            array[k] = L[i];
            bars[k].style.height = `${array[k] * 3}px`;
            i++;
        } else {
            array[k] = R[j];
            bars[k].style.height = `${array[k] * 3}px`;
            j++;
        }
        bars[k].classList.remove('red');
        k++;
    }

    while (i < n1) {
        bars[k].classList.add('red');
        await sleep(speed);
        array[k] = L[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].classList.remove('red');
        i++;
        k++;
    }

    while (j < n2) {
        bars[k].classList.add('red');
        await sleep(speed);
        array[k] = R[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].classList.remove('red');
        j++;
        k++;
    }
    if (right - left + 1 === array.length) isSorting = false;
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    if (high - low + 1 === array.length) isSorting = false;
}

async function partition(low, high) {
    const bars = document.getElementsByClassName('array-bar');
    let pivot = array[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        bars[j].classList.add('yellow');
        await sleep(speed);
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;
        }
        bars[j].classList.remove('yellow');
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[high].style.height = `${array[high] * 3}px`;
    return (i + 1);
}

generateArray();
