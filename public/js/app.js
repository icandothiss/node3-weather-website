const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", (e) => {
  const inputLocation = searchElement.value;

  messageOne.innerText = "loading...";
  messageTwo.innerText = "";

  e.preventDefault();
  fetch(`http://localhost:3000/weather?address=${inputLocation}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.innerText = data.error;
        } else {
          messageOne.innerText = data.location;
          messageTwo.innerText = data.forecast;
        }
      });
    }
  );
});
