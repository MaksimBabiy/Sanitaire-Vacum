window.onload = () => {
  window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let headerLogo = this.document.querySelector(".headerLogo");
    let scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      // Change 50 to whatever scroll position you want
      header.classList.add("headerBg");
      headerLogo.classList.add("headerLogoFixed");
    } else {
      header.classList.remove("headerBg");
      headerLogo.classList.remove("headerLogoFixed");
    }
  });
  let input = document.querySelector("input");
  let inputContainer = document.querySelector(".section_subscribe_form");
  let subscribeBtn = document.querySelector(".subscribeBtn");
  let emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  let error = document.createElement("em");
  let success = document.createElement("em");
  let isError = false;
  success.style.color = "green";
  success.innerHTML = "Thank you for subscribing!";
  error.style.color = "red";
  error.style.marginLeft = "15px";
  error.innerText = "email is invalid";

  subscribeBtn &&
    subscribeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (isError == false && input.value.length > 0) {
        if (inputContainer.contains(error)) {
          inputContainer.removeChild(error);
        }
        inputContainer.appendChild(success);
      }
    });
  input &&
    input.addEventListener("input", (e) => {
      subscribeBtn.disabled = isError;
      if (e.target.value !== "") {
        if (inputContainer.contains(success)) {
          inputContainer.removeChild(success);
        }
        if (e.target.value.match(emailReg)) {
          if (inputContainer.contains(error)) {
            isError = false;
            inputContainer.removeChild(error);
          }
        } else {
          if (!inputContainer.contains(error)) {
            isError = true;
            inputContainer.appendChild(error);
          }
        }
      }
    });
  let copyright = document.querySelector(".copyright");
  let footerInfo = document.querySelector(".footerInfo");

  footerInfo.innerHTML =
    "sanitaire.us.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.";
  copyright.innerHTML =
    "Copyright © 2024. Sanitaire official site. All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used in this website are for identification purposes only.";

  let arrow = document.querySelector(".arrow");
  arrow.addEventListener("click", scrollToTop);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
