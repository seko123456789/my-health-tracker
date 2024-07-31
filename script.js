document.getElementById('calculator-form').addEventListener('submit', (event) => {
   event.preventDefault();

   let age = parseFloat(document.getElementById('age').value);
   let weight = parseFloat(document.getElementById('weight').value);
   let height = parseFloat(document.getElementById('height').value);
   let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
   let activityLevel = parseFloat(document.getElementById('activity-level').value);
   let bmr_result = document.getElementById('bmr_value');
   let tdee_result = document.getElementById('tdee_value');
   let activity_table = document.getElementById("activity-level-table").getElementsByTagName("tbody")[0];

   let bmr = null;
   let tdee = null;

   // Validate inputs
   if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel) || !["male", "female"].includes(gender) || activityLevel <= 0) {
       bmr_result.textContent = "Please ensure all fields are correctly filled.";
       tdee_result.textContent = "";
       return;
   }

   // Calculate BMR
   if (gender === "male") {
       bmr = 10 * weight + 6.25 * height - 5 * age + 5;
   } else if (gender === "female") {
       bmr = 10 * weight + 6.25 * height - 5 * age - 161;
   }

   // Calculate TDEE
   if (bmr !== null && activityLevel > 0) {
       tdee = bmr * activityLevel;
   }

   // Update the results
   if (bmr !== null) {
       bmr_result.textContent = `BMR: ${bmr.toFixed(0)} calories/day`
   } else {
       bmr_result.textContent = "Invalid BMR calculation.";
   }

//    if (tdee !== null) {
//        tdee_result.textContent = `TDEE: ${tdee.toFixed(0)} calories/day`
//    } else {
//        tdee_result.textContent = "Invalid TDEE calculation.";
//    }


   // Update the activity level table
   const activity_list = [
      { level: "Sedentary (little or no exercise)", multiplier: 1.2 },
      { level: "Lightly active (light exercise/sports 1-3 days/week)", multiplier: 1.375 },
      { level: "Moderately active (moderate exercise/sports 3-5 days/week)", multiplier: 1.55 },
      { level: "Very active (hard exercise/sports 6-7 days a week)", multiplier: 1.725 },
      { level: "Extra active (very hard exercise/physical job)", multiplier: 1.9 }
   ]

   activity_table.innerHTML = "";

   activity_list.forEach((item) => {
      const the_row = activity_table.insertRow();
      let cell_1 = the_row.insertCell(0) // first cell
      let cell_2 = the_row.insertCell(1) // second cell

      cell_1.textContent = item.level
      cell_2.textContent = (bmr * item.multiplier).toFixed(0);

      cell_2.style.paddingLeft = "10px";
   })



});
