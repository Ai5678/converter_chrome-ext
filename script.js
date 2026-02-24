lucide.createIcons();
//1. get the category from the buttons
//2. select units as per category
//3. calculate conversion and display result
//4. improve UI
//5. responsive design

//define units for each category
const temperatureUnits = {
    //No consistent ratio. Handle with hard-coded value in calculateConversion()
    "°C": 0,
    "°F": 0,
}
const lengthUnits = {
    "m": 1,
    "km": 1000,
    "cm": 0.01,
    "mm": 0.001,
    "mi": 1609.34,
    "ft": 0.3048,
    "in": 0.0254,
}

const weightUnits = {
    "g": 1,
    "kg": 1000,
    "mg": 0.001,
    "lb": 453.592,
    "oz": 28.3495,
}
const speedUnits = {
    "m/s": 1,
    "km/h": 0.277778,
    mph: 0.44704,
}

const buttons = document.querySelectorAll(".icon-btn");
let category = "";
const select1 = document.querySelector("#unit1 select");
const select2 = document.getElementById("unit2").querySelector("select");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const switchBtn = document.querySelector(".switch-btn button");

const categoryMap = {
    "temperature": temperatureUnits,
    "length": lengthUnits,
    "weight": weightUnits,
    "speed": speedUnits,
}

//step 1. get the category from the button when clicked
buttons.forEach(button => {
    button.addEventListener("click", () => setCategory(button));
});
function setCategory (button){
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to clicked button
    button.classList.add("active");

    category = button.dataset.type; 
    setUnitOptions(category); //call step2 function
}

//step 2. select units as per category
function setUnitOptions(category) {
    const units = Object.keys(categoryMap[category] || {});
    
    // Clear existing options
    select1.innerHTML = '';
    select2.innerHTML = '';
    
    // Add new options to both dropdowns
    units.forEach(unit => {
        select1.innerHTML += `
        <option value="${unit}">
            ${unit}
        </option>`;
        select2.innerHTML += `
        <option value="${unit}">
        ${unit}
        </option>`;
    });

    input1.addEventListener("input", calculateConversion);
    select1.addEventListener("change", calculateConversion);
    select2.addEventListener("change", calculateConversion);
    switchBtn.addEventListener("click", switchUnits);

    calculateConversion(); //to update labels + does conversion

}
//step 3. calculate conversion
//3.1 input >> base unit >> target unit
//3.2 formula: (input * from unit) / to unit
function calculateConversion(){
    const fromUnit = categoryMap[category][select1.value];
    const toUnit = categoryMap[category][select2.value];

    document.querySelector("#unit1 .unit-label").textContent = select1.value;
    document.querySelector("#unit2 .unit-label").textContent = select2.value;

    if (category === "temperature"){
        //C to F
        if (select1.value === "°C" && select2.value === "°F"){
            input2.value = ((input1.value * 1.8) + 32).toFixed(2);} 
            //F to C
            else if (select1.value === "°F" && select2.value === "°C"){ input2.value = ((input1.value - 32) / 1.8).toFixed(2);}
            //same unit
            else{ input2.value = input1.value;}
    } else {
        input2.value = ((input1.value * fromUnit) / toUnit).toFixed(2);
    }
}

function switchUnits(){
    //swap selected units
    const tempUnit = select1.value;
    select1.value = select2.value;
    select2.value = tempUnit;
    calculateConversion();
    console.log(select1.value, select2.value);
}

// Initialize with temperature on page load (matches hardcoded HTML)
setCategory(document.querySelector('[data-type="temperature"]'));