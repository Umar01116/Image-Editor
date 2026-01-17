const filters = {
    brightness:{
        value: 100,
        min: 0,
        max: 200,
        unit:'%'
    },
    contrast:{
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    exposure:{
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    saturation:{
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    },
    hueRotation:{
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg'
    },
    blur:{
        value: 0,
        min: 0,
        max: 20,
        unit: 'px'
    },
    grayscale:{
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    },
    sepia:{
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    },
    opacity:{
        value: 100,
        min: 0,
        max: 100,
        unit: '%'
    },
    invert:{
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    }
}

const filtercontainer = document.querySelector('.filter')
const imagecanvas = document.querySelector('#image-canvas')
const imginput = document.querySelector('#image-input')
const canvasctx = imagecanvas.getContext('2d')

function createFilterElement(name, unit = '%', value, min, max){
    const div = document.createElement('div');
    div.classList.add('filter');

    const input = document.createElement('input');
    input.type = 'range';
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;

    const p = document.createElement('p');
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);
    
    return div;
}

Object.keys(filters).forEach(key => {
    const filterelement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    filtercontainer.appendChild(filterelement)
})

imginput.addEventListener('change', (event)=>{
    const file = event.target.files[0]
    const imgplaceholder = document.querySelector('.placeholder')
    imgplaceholder.style.display = 'none'

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = ()=>{
        imagecanvas.width = img.width
        imagecanvas.height = img.height
        canvasctx.drawImage(img, 0, 0)
    }
})