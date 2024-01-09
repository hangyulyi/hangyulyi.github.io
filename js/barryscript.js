const sendChatBtn = document.querySelector(".chat-input i");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".barry-toggler");
const chatbotClostBtn = document.querySelector(".close-btn")

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

// Create chat <li> element with passed message and className
const createChatLi = (message, className) => {
   const chatLi = document.createElement("li");
   chatLi.classList.add("chat", className);
   let chatContent = className === "outgoing" ? `<p></p>` : `<i class='bx bx-dice-2'></i><p></p>`;

   chatLi.innerHTML = chatContent;

   // set all incoming messages as pure text
   chatLi.querySelector("p").textContent = message;

   return chatLi;
}

// barry talks! :D
const generateResponse = async (incomingChatLI) => {
   // TODO: Figure out how to use the python script I have right now to get working with this js for barry
   try {
      const response = await fetch('/get_answer', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ userMessage }),
      });

      if(!response.ok) {
         throw new Error('Bad Barry network');
      }

      const responseData = await response.json();
      const answer = responseData.answer || "Sorry, I did not understand";

      // replace barry thinking to answer
      incomingChatLI.querySelector("p").textContent = answer;
      chatbox.scrollTo(0, chatbox.scrollHeight);
   } catch (error) {
      console.error('Error: ', error.message);
   }
}

const handleChat = () => {
   userMessage = chatInput.value.trim();
   if(!userMessage) return;
   chatInput.value = "";
   chatInput.style.height = `${inputInitHeight}px`;

   // Append user message to message box
   chatbox.appendChild(createChatLi(userMessage, "outgoing"));

   // make chatbox autoscroll
   chatbox.scrollTo(0, chatbox.scrollHeight);

   // give barry thinking time
   setTimeout(() => {
      const incomingChatLI = createChatLi("Barry is still in the works, sorry!", "barry");
      chatbox.appendChild(incomingChatLI);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLI);
   }, 600);

}

// adjust height of textbox depending on content
chatInput.addEventListener("input", () => {
   chatInput.style.height = `${inputInitHeight}px`;
   chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// be able to send chat with enter, shit+enter for next line
chatInput.addEventListener("keydown", (e) => {
   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
   }
});


chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotClostBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);