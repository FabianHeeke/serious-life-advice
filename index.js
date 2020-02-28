const FORM_OBJECT = {
  1: {
    "information": "name",
    "text": "What's your first name?",
    "input": ""
  },
  2: {
    "information": "city",
    "text": "Which city do you want to visit the most?",
    "input": ""
  },
  3: {
    "information": "hobby",
    "text": "What's your favorite hobby?",
    "input": ''
  },
  4: {
    "information":"",
    "text": "Are these correct?",
    "input": ""
  },
  5: {
    "information":"",
    "text": "Then go do it!",
    "input": ""
  }
}

let currentStep = 1
addEventListeners()
initForm()

function initForm() {
  // general actions
  setIconBackgrounds()
  document.getElementById("input").style.display = "block"
  document.getElementById("input").value = FORM_OBJECT[currentStep].input
  document.getElementById("label").innerText = FORM_OBJECT[currentStep].text

  // step-specific-actions
  if (currentStep == 2) {
    headerText = FORM_OBJECT[1].input.length > 0 ? `Hi, ${FORM_OBJECT[1].input}!` : "Hi!"
    document.getElementById("header").innerText = headerText
  } else if (currentStep === 4) {
    document.getElementById("user-input-city").innerText = FORM_OBJECT[2].input
    document.getElementById("user-input-hobby").innerText = FORM_OBJECT[3].input
    document.getElementById("input").style.display = "none"
    document.getElementById("confirmation").style.display = "block"
  } else if (currentStep === 5) {
    document.getElementById("icon-step-4").style.backgroundColor = "steelblue"
    document.getElementById("icon-step-4").style.color = "white"
    document.getElementById("input").style.display = "none"
    document.getElementById("header").style.display = "none"
  }
  if (currentStep !== 4) {
    document.getElementById("confirmation").style.display = "none"
  } 
}

function setIconBackgrounds() {
  for(const stepNumber of Object.keys(FORM_OBJECT)) {
    if (stepNumber <= 4 && stepNumber > 0) {
      if (FORM_OBJECT[stepNumber].input.length > 0) {
        document.getElementById(`icon-step-${stepNumber}`).style.backgroundColor = "steelblue"
        document.getElementById(`icon-step-${stepNumber}`).style.color = "white"
      } else {
        document.getElementById(`icon-step-${stepNumber}`).style.backgroundColor = "white"
        document.getElementById(`icon-step-${stepNumber}`).style.color = "steelblue"
      }
    } 
  }
}

function addEventListeners() {
  keyCodes = {
    'enter': 13,
  }

  document.addEventListener("keyup", event => {
    if (event.keyCode === keyCodes.enter) {
      nextStep()
    }
  })
}

function nextStep() {
  if (currentStep < Object.keys(FORM_OBJECT).length ) {
    currentStep += 1
    initForm()

    if (currentStep === 5) {
      onButtonConfirm()
    }
  }
}

function previousStep() {
  if (currentStep - 1 > 0 ) {
    currentStep -= 1
    initForm()
  }
}

function onInput(value) {
  FORM_OBJECT[currentStep].input = value;
}

function onIconClick(clickedDiv){
  currentStep = parseInt(clickedDiv.innerHTML)
  initForm()
}

function onButtonConfirm() {
  currentStep = 5
  initForm()

  const googleBaseUrl = "https://google.com"
  const googleSearchParam = `search?q=${FORM_OBJECT[3].input}+in+${FORM_OBJECT[2].input}`
  const searchUrl = `${googleBaseUrl}/${googleSearchParam}`
  window.open(searchUrl, '_blank');
}

function onButtonNo(){
  currentStep = 1
  initForm()
}