const debounce = (fn, delay) => {
    let timerValid;
    return function() {
      let context = this;
      let args = arguments;
      clearTimeout(timerValid);
      timerValid = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
  
  const inputBox = document.getElementsByClassName('input_box')[0];
  
  function getSuggestions(event) {
    const value = event.target.value;
    if (value.trim().length === 0) return;
    const suggestions = document.getElementsByClassName('suggestions')[0];
    suggestions.innerHTML = "";
    let userList = users.filter(user => user.toLowerCase().startsWith(value.toLowerCase()));
  
    if (userList.length === 0) {
      suggestions.classList.remove('active');
      inputBox.classList.remove('active');
    } else {
      suggestions.classList.add('active');
      inputBox.classList.add('active');
    }
  
    const list = document.createElement('ul');
    list.role = "listbox";
    list.classList.add('list');
    list.addEventListener('click', selectItem);
  
    userList.forEach((user, index) => {
      const li = document.createElement('li');
      li.role = "option";
      li.tabIndex = index + 1;
      li.textContent = user;
  
      li.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.currentTarget.previousSibling && e.currentTarget.previousSibling.focus();
        }
      });
      
      list.appendChild(li);
    });
  
    suggestions.appendChild(list);
  }
  
  const debouncedSuggestions = debounce(getSuggestions, 400);
  inputBox.addEventListener('input', debouncedSuggestions);
  
  inputBox.addEventListener('blur', (e) => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      console.log(activeElement)
  ;
      if (activeElement && activeElement.getAttribute('role') === 'option') {
        return;
      }
      resetSuggestions();
    }, 200);
  });
  
  function selectItem(event) {
    let value = event.target.textContent;
    inputBox.value = value;
  }
  
  function resetSuggestions() {
    const suggestions = document.getElementsByClassName('suggestions')[0];
    suggestions.innerHTML = "";
    suggestions.classList.remove('active');
    inputBox.classList.remove('active');
  }
  
  const users = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cote d'Ivoire",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
  ];
  
  inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      const firstSuggestion = document.querySelector('.suggestions .list li');
      if (firstSuggestion) {
        firstSuggestion.focus();
      }
    }
  });
  
  const suggestionsContainer = document.getElementsByClassName('suggestions')[0];
  suggestionsContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });