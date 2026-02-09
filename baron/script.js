const PAX_WEIGHT = 170;//assuming 170lbs per pax
const EMPTY_MOMENT = 485926;

arm = [128, 128, 154, 154, 87]; // this means we are seating passengers in row 1 then if full, in row 2, then if full as the copilot position..
let crew_and_pax_moment = 14790;//correspond to the pilot moment on this aircraft

// -- weight related variables --
const EMPTY_WEIGHT = 3983;

document.addEventListener("DOMContentLoaded",()=>{

    document.addEventListener("input", ()=>{
        
        let pax_number = document.getElementById("pax_number");
        pax_number = pax_number.value;

        
        let calculated_weightP= document.getElementById("calculated_weight");
        calculated_weightP.innerText = `${calculate_total_weigth(pax_number)}`;

        let calculated_momentP= document.getElementById("calculated_moment");
        calculated_momentP.innerText = `${calculate_CG(pax_number)}`;
let calculatedCG = calculate_CG (pax_number);
        if(calculatedCG <= 110 || calculatedCG >= 134){
            console.log("CG ISN'T GOOD AT ALL ! CAN'T TAKEOFF!");
        }
    });

});

function calculate_total_weigth(pax_number) {
    
    let total_crew_and_passengers_weight = pax_number * PAX_WEIGHT;
    //let total_bagguage_weigth = 0;//will be changed later
    
    let Total_Weight = EMPTY_WEIGHT + total_crew_and_passengers_weight;
    
    return Total_Weight;
}
function calculate_CG(pax_number, include_fuel){
    let crew_and_pax_moment = 14790;//reset
    
    for(i = 0; i<pax_number; i++){
        crew_and_pax_moment += PAX_WEIGHT * arm[i];
    }
    let TotalMoment = EMPTY_MOMENT+crew_and_pax_moment;
    console.log(parseInt(TotalMoment)/calculate_total_weigth(pax_number)+" inches..");

    if(include_fuel){
        return;//later
    }else{
        return (TotalMoment/(calculate_total_weigth(pax_number)));
    }
}