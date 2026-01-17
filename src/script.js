let filters = {
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
const resetbtn = document.querySelector('#reset-btn')
const downloadbtn = document.querySelector('#download-btn')

let file = null
let image = null

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

    input.addEventListener('input', (event)=>{
        filters[name].value = input.value
        applyfilters()
    } )
    
    return div;
}

function createfilters(){
    Object.keys(filters).forEach(key => {
    const filterelement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    filtercontainer.appendChild(filterelement)
})
}
createfilters()


imginput.addEventListener('change', (event)=>{
    file = event.target.files[0]
    const imgplaceholder = document.querySelector('.placeholder')
    imgplaceholder.style.display = 'none'
    imagecanvas.style.display = 'block'

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = ()=>{
        image =  img
        imagecanvas.width = img.width
        imagecanvas.height = img.height
        canvasctx.drawImage(img, 0, 0)
    }
}) 

function applyfilters(){

    canvasctx.clearRect(0, 0, imagecanvas.width, imagecanvas.height)

    canvasctx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
`.trim()
    
    canvasctx.drawImage(image, 0, 0)
}

resetbtn.addEventListener('click', ()=>{
    filters = {
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
applyfilters()

filtercontainer.innerHTML = ''
createfilters()
})

downloadbtn.addEventListener('click', ()=>{
    const link = document.createElement('a')
    link.download = "edited-image.png"
    link.href = imagecanvas.toDataURL()
    link.click()
})

const presetButtons = document.querySelectorAll('.preset-btn');

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    bw: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },
    warm: {
        brightness: 105,
        contrast: 100,
        saturation: 125,
        hueRotation: 12,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },
    cold: {
        brightness: 95,
        contrast: 115,
        saturation: 80,
        hueRotation: -12,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    cinematic: {
        brightness: 90,
        contrast: 130,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 105,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    dramatic: {
        brightness: 95,
        contrast: 150,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    }
};

presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!image) return;

        const presetName = btn.dataset.preset;
        const preset = presets[presetName];

        Object.keys(preset).forEach(key => {
            filters[key].value = preset[key];

            const slider = document.getElementById(key);
            if (slider) slider.value = preset[key];
        });

        applyfilters();
    });
});
