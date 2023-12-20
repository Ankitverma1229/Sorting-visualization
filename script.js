const parentDiv = document.querySelector('.parentDiv');
const bubbleSortButton = document.getElementById('bubble-sort');
const randomizeArrayButton = document.getElementById('randomize-array');
const insertionSortButton = document.getElementById('insertion-sort');
const selectionSortButton = document.getElementById('selection-sort');
const quickSortButton = document.getElementById('quick-sort');
const mergeSortButton = document.getElementById('merge-sort');
const shellSortButton = document.getElementById('shell-sort');

let arr = [50, 40, 30, 20, 10, 60, 80, 5];

let i = 0;
arr.forEach(e => {
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('containerDiv');

    let innerDiv = document.createElement('div');
    innerDiv.style.height = (e * 6 + 'px');
    innerDiv.style.backgroundColor = '#' + ((1 << 24) * Math.random() | 1).toString(16);
    innerDiv.setAttribute('id', 'elem' + i);
    innerDiv.classList.add('innerDiv');
    containerDiv.appendChild(innerDiv);

    let labelDiv = document.createElement('div');
    labelDiv.textContent = e;
    labelDiv.classList.add('labelDiv');
    containerDiv.appendChild(labelDiv);

    parentDiv.appendChild(containerDiv);
    i++;
});

bubbleSortButton.addEventListener("click", () => sortArray(arr, bubbleSort));
insertionSortButton.addEventListener("click", () => sortArray(arr, insertionSort));
selectionSortButton.addEventListener("click", () => sortArray(arr, selectionSort));
quickSortButton.addEventListener("click", () => sortArray(arr, quickSort));
mergeSortButton.addEventListener("click", () => sortArray(arr, mergeSort));
shellSortButton.addEventListener("click", () => sortArray(arr, shellSort));
randomizeArrayButton.addEventListener("click", () => randomizeArr());

async function sortArray(arr, sortFunction) {
    await sortFunction(arr);
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            await sleep(100);
            if (arr[j] > arr[j + 1]) {
                swapNumber(arr, j);
                swapColorHeight(j);
            }
        }
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            await sleep(100);
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        updateArrayView(arr);
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            await sleep(100);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swapNumber(arr, minIndex);
        swapColorHeight(minIndex);
    }
}

async function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        await sleep(100);
        if (arr[j] < pivot) {
            i++;
            swapNumber(arr, i);
            swapColorHeight(i);
        }
    }
    swapNumber(arr, i + 1, high);
    swapColorHeight(i + 1, high);
    return i + 1;
}

async function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        await sleep(100);
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    updateArrayView(arr);
}

async function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                await sleep(100);
                arr[j] = arr[j - gap];
                swapColorHeight(j - gap, j);
            }
            arr[j] = temp;
            updateArrayView(arr);
        }
    }
}

function swapNumber(arr, j, k = j + 1) {
    let temp = arr[j];
    arr[j] = arr[k];
    arr[k] = temp;
}

function swapColorHeight(j, k = j + 1) {
    let a = 'elem' + j;
    let b = 'elem' + k;
    let e1 = document.getElementById(a);
    let e2 = document.getElementById(b);
    let bg1 = e1.style.backgroundColor;
    let bg2 = e2.style.backgroundColor;
    let h1 = e1.offsetHeight;
    let h2 = e2.offsetHeight;
    e1.style.backgroundColor = bg2;
    e2.style.backgroundColor = bg1;
    e1.style.height = h2 + "px";
    e2.style.height = h1 + "px";
}

function randomizeArr() {
    arr = shuffleArray(arr);
    updateArrayView(arr);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateArrayView(arr) {
    const elements = document.querySelectorAll('.containerDiv');
    elements.forEach((container, index) => {
        const innerDiv = container.querySelector('.innerDiv');
        const labelDiv = container.querySelector('.labelDiv');
        innerDiv.style.height = (arr[index] * 6 + 'px');
        labelDiv.textContent = arr[index];
    });
}

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

