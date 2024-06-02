document.querySelector(".svg.btn").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  calculateAge();
});

function calculateAge() {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value) - 1; // JavaScript months are 0-11
  const year = parseInt(yearInput.value);

  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");

  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  let isValid = true;

  if (!day || day < 1 || day > 31 || isNaN(day)) {
    dayError.textContent = "Enter a valid day (1-31)";
    isValid = false;
  }

  if (!month || month < 0 || month > 11 || isNaN(month)) {
    monthError.textContent = "Enter a valid month (1-12)";
    isValid = false;
  }

  if (!year || year < 1900 || isNaN(year)) {
    yearError.textContent = "Enter a valid year (>= 1900)";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const birthDate = new Date(year, month, day);
  const today = new Date();

  if (birthDate > today) {
    alert("Birth date cannot be in the future.");
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById("yearSpan").textContent = ageYears;
  document.getElementById("monthSpan").textContent = ageMonths;
  document.getElementById("daySpan").textContent = ageDays;

  // Calculate days until next birthday
  const nextBirthday = new Date(today.getFullYear(), month, day);
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday - today) / (1000 * 60 * 60 * 24)
  );

  document.getElementById("daysUntilBirthday").textContent = daysUntilBirthday;
}
