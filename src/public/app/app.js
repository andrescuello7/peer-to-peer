const messages = document.getElementById("messages");
const input = document.getElementById("input");
const send = document.getElementById("send");

let list = [];

send.addEventListener("click", () => {
  if (input.value !== "") {
    list.push(
      `<div class="msg msgStart">
        <div class="msgContent msgContentStart">
          <p class="text">${input.value}</p>
        </div>
      </div>`
    );
    messages.innerHTML = list.join("\n");
    input.value = "";
  }
});
