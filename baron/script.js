//      -- GENERAL CONST --
const KG_TO_LBS = 2.20462;

//      -- moment related variables --
const EMPTY_MOMENT = 485926;
let arm = [128, 128, 154, 154, 87]; // this means we are seating passengers in row 1 then if full, in row 2, then if full as the copilot position..

//      -- weight related variables --

const EMPTY_WEIGHT = 3983; // or 4030 according to XPlane baron Pilot Operating Manual
const MAX_TAKEOFF_WEIGHT = 5500; // or 2495 kg
const MAX_LANDING_WEIGHT = 5400; // or 2449 kg
const PAX_WEIGHT = 170; // assuming 170lbs per pax


document.addEventListener("DOMContentLoaded",()=>{

    document.addEventListener("input", ()=>{
        
        refreshInputValues();//we refresh values like : 1 pax selected..

        let total_weight = calculate_total_weigth();
        let calculated_weightP= document.getElementById("calculated_weight");
        calculated_weightP.innerText = `${total_weight}`;
        calculated_weightP.style.color = (total_weight <= MAX_TAKEOFF_WEIGHT)?"green":"red";

        let calculated_momentP= document.getElementById("calculated_moment");
        calculated_momentP.innerText = `${calculate_CG(pax_number)}`;
        
        
        // showing GO/NOGO decision
        
        let calculatedCG = calculate_CG (pax_number);
        let decision_box= document.getElementById("decision_box");
        if(calculatedCG <= 110 || calculatedCG >= 134){
            console.log("CG ISN'T GOOD AT ALL ! CAN'T TAKEOFF!");
            decision_box.textContent = "Wow, you shouldn't try taking off mate!"
            decision_box.style.backgroundColor = "red";
        }else{
            console.log("CG seems good. Can takeoff");
            decision_box.textContent = "Everything seems fine ! But still check the weather!"
            decision_box.style.backgroundColor = "green";
        }
    });

});

function calculate_total_weigth() {
    let pax_number = document.getElementById("pax_number");
    pax_number = pax_number.value;
    let cargo_load = document.getElementById("cargo_load");
    cargo_load = parseInt(cargo_load.value * KG_TO_LBS);

    
    let total_crew_and_passengers_weight = pax_number * PAX_WEIGHT;
    //let total_bagguage_weigth = 0;//will be changed later
    
    let Total_Weight = EMPTY_WEIGHT + total_crew_and_passengers_weight + cargo_load;
    
    return Total_Weight;
}
function calculate_CG(pax_number, include_fuel){
    let crew_and_pax_moment = 14790; // correspond to the pilot moment on this aircraft
    
    for(i = 0; i<pax_number; i++){
        crew_and_pax_moment += PAX_WEIGHT * arm[i];
    }

    // getting cargo moment..
    let cargo_load = document.getElementById("cargo_load");
    cargo_load = cargo_load.value;
    let cargo_moment = (cargo_load/2)*arm[0] + (cargo_load/2)*arm[2]; // no need to check parity as cargo load is even (because stip is 10)

    let TotalMoment = EMPTY_MOMENT + crew_and_pax_moment + cargo_moment;
    console.log(parseInt(TotalMoment)/calculate_total_weigth()+" inches..");

    if(include_fuel){
        return;//later
    }else{
        return (TotalMoment/(calculate_total_weigth(pax_number)));
    }
}



function refreshInputValues(){    
    let number_pax_selected = document.getElementById("number_pax_selected");
    number_pax_selected.textContent = ` (${document.getElementById("pax_number").value} pax selected) `;
    let cargo_load_selected = document.getElementById("cargo_load_selected");
    cargo_load_selected.textContent = ` (${document.getElementById("cargo_load").value} kg selected) `;
}