const otpContainer = document.getElementsByClassName("otp-container")[0];
const OTP_DIGITS_LENGTH = 6;
let otpInput = [];
function renderOTP(numberOfDigits = OTP_DIGITS_LENGTH) {
  const form = document.createElement("form");
  form.classList.add("form-container");
  form.addEventListener("input", handleInput);
  form.addEventListener("submit", handleSubmit);
  for (let i = 0; i < OTP_DIGITS_LENGTH; i++) {
    let input = document.createElement("input");
    input.setAttribute("data-id", i);
    input.classList.add("input");
    form.appendChild(input);
  }
  let submitBtn = document.createElement("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";
  submitBtn.classList.add("submit");
  form.appendChild(submitBtn);
  otpContainer.appendChild(form);
}

function handleInput(event) {
  // Check if the input is a number
  // if so then process otherwise throw error
  // highlight by adding a dynamic class
  checkSubmitBtnValidity();
  const dataId = event.target.getAttribute("data-id");
  const value = event.target.value;
  if (value.trim().length < 1) {
    otpInput[dataId] = "";
    event.target.classList.add("error");
  } else if (!isNaN(parseInt(value)) && parseInt(value) < 10) {
    otpInput[dataId] = value;
    if (event.target.classList.contains("error")) {
      event.target.classList.remove("error");
    }
  } else {
    otpInput[dataId] = "";
    event.target.classList.add("error");
  }
  checkSubmitBtnValidity();
}

function handleSubmit(event) {
  event.preventDefault();
  let otpInputValue = parseInt(otpInput.join(""));
  alert(`Your otp ${otpInputValue}`);
  otpInput = [];
  const inputSets = document.querySelectorAll("input");
  /**
   * Resetting the values to null
   */
  for (let i of inputSets) {
    i.value = "";
  }
}

function checkSubmitBtnValidity() {
  const otpInputValue = otpInput.filter((element) => element !== "");
  if (otpInputValue.length == OTP_DIGITS_LENGTH) {
    let submitBtn = document.getElementsByClassName("submit")[0];
    submitBtn.disabled = false;
  }
}

renderOTP(OTP_DIGITS_LENGTH);
