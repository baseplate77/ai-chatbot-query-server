(function () {
  function init() {
    let s = "{{showToolTip}}";

    setTimeout(function () {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("id", "webbotify-chatbot-id");
      // iframe.src = "https://www.webbotify.com/chats/{{ chatbotId }}";
      iframe.src = "http://localhost:3000/chats/{{ chatbotId }}";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.zIndex = "1000";
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.bottom = window.innerWidth < 640 ? "0" : "80px";
      iframe.style.right = window.innerWidth < 640 ? "0" : "16px";
      iframe.style.width = window.innerWidth < 640 ? "100%" : "468px";
      iframe.style.height = window.innerWidth < 640 ? "100%" : "85vh";
      iframe.style.borderRadius = window.innerWidth < 640 ? "0" : "0.75rem";
      iframe.style.boxShadow =
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
      iframe.style.zIndex = "9999999";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const toggleButton = document.createElement("button");
      toggleButton.setAttribute("id", "webbotify-chat-icon");
      toggleButton.style.overflow = "hidden";
      toggleButton.innerHTML =
        '<img src={{ botIcon }} style="width: 30px; height: 30px;" />';
      toggleButton.style.padding = "0";
      toggleButton.style.backgroundColor = "{{ primaryColor }}";
      toggleButton.style.color = "white";
      toggleButton.style.borderRadius = "9999px";
      toggleButton.style.position = "fixed";
      toggleButton.style.display = "flex";
      toggleButton.style.justifyContent = "center";
      toggleButton.style.alignItems = "center";
      toggleButton.style.bottom = "16px";
      toggleButton.style.right = "16px";
      toggleButton.style.width = "60px";
      toggleButton.style.height = "60px";
      toggleButton.style.zIndex = "9999998";
      toggleButton.style.border = "none";
      toggleButton.style.cursor = "pointer";
      toggleButton.style.boxShadow =
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
      toggleButton.onclick = () => {
        if (iframe.style.display === "none") {
          iframe.contentWindow!.postMessage({ openChat: true }, "*");
          iframe.style.display = "block";
          tooltip.style.display = "none";
          toggleButton.innerHTML =
            '<img src="https://firebasestorage.googleapis.com/v0/b/ai-chatbot-f2048.appspot.com/o/x.svg?alt=media&token=7695194f-d6e5-4577-a5df-e0466a3c0071" style="width: 30px; height: 30px; filter: {{ brightness }}" />';
          toggleButton.style.width = "60px";
          toggleButton.style.height = "60px";
        } else {
          iframe.contentWindow!.postMessage({ closeChat: true }, "*");
          iframe.style.display = "none";
          tooltip.style.display = "block";
          toggleButton.innerHTML = `<img src="{{botIcon}}" style="width: 30px; height: 30px;  " />`;
          toggleButton.style.width = "60px";
          toggleButton.style.height = "60px";
        }
      };
      const tooltip = document.createElement("div");
      if (s === "" || s === "true") {
        tooltip.innerHTML = `  
  <div id="webbotify-chat-tooltip" class="webbotiy-tooltip-wrapper">
  <style>
  .webbotiy-tooltip-wrapper .relative {
    position: relative;
  }
  .webbotiy-tooltip-wrapper .max-w-sm {
    max-width: 384px;
  }
  .webbotiy-tooltip-wrapper .bg-slate-50 {      
    background-color: rgb(248 250 252);
  }
  .webbotiy-tooltip-wrapper .bg-brand {
    background-color: #fff;
    color: #000,
  }
  .webbotiy-tooltip-wrapper .shadow-xl {      
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1) !important;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1) !important;
    -moz-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1) !important;
  }
  .webbotiy-tooltip-wrapper .ring-gray-100 {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(242 244 247 / var(--tw-ring-opacity));
  }
  .webbotiy-tooltip-wrapper .ring-1 {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }
  .webbotiy-tooltip-wrapper .rounded-xl {
    border-radius: 10px;
  }
  .webbotiy-tooltip-wrapper .p-4 {
    padding: 16px;
  }
  .webbotiy-tooltip-wrapper .text-base {
    font-size: 16px;
    line-height: 24px;
  }
  .webbotiy-tooltip-wrapper .font-medium {
    font-weight: 500;
  }
  .webbotiy-tooltip-wrapper .text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
  .webbotiy-tooltip-wrapper .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .webbotiy-tooltip-wrapper .whitespace-pre-wrap {
    white-space: pre-wrap;
  }    
  .webbotiy-tooltip-wrapper .absolute {
    position: absolute;
  }
  .webbotiy-tooltip-wrapper .fixed {
    position: fixed;
  }
  .webbotiy-tooltip-wrapper .w-4 {
    width: 16px;
  }
  .webbotiy-tooltip-wrapper .h-4 {
    height: 16px;
  }
  .webbotiy-tooltip-wrapper .rotate-45 {
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 45deg;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  .webbotiy-tooltip-wrapper .neg-bottom {
    bottom: -6px;
  }       
  .webbotiy-tooltip-wrapper {
    position: fixed;
    bottom: 90px;
    right: 20px;
    display: block;
    z-index: 9999998;
  }
  .webbotiy-tooltip-wrapper #tooltip-close-btn {
    cursor: pointer;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 4px;
    right: 4px;
    color: white;
  }
  .text-black {
    color:black;
  }
  </style>
  <div class="relative max-w-sm bg-brand shadow-xl ring-gray-100 ring-1 rounded-xl">
  <div id="tooltip-close-btn">               
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#000" viewBox="0 0 256 256">
      <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z">
      </path>
    </svg>
  </div>
  <div class="p-4">
    <p class="text-base text-black font-medium  line-clamp-3 whitespace-pre-wrap" style="
    color: black;
  font-size: 1rem/;
  line-height: 1.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin: 0;
  " >{{ welcomeMsg }}</p>
  </div>
  
  <div class="absolute w-4 h-4 rotate-45 bg-brand neg-bottom" style="right: 16px;"></div>
  </div>
  </div>
  `;
      }
      if (window.innerWidth >= 640 || true) {
        document.body.appendChild(toggleButton);
        document.body.appendChild(tooltip);
      }

      const closeBtn = document.getElementById("tooltip-close-btn");
      if (closeBtn) {
        closeBtn.onclick = () => {
          tooltip.style.display = "none";
        };
      }

      // Update iframe height on window resize
      window.addEventListener("resize", () => {
        iframe.style.bottom = window.innerWidth < 640 ? "0" : "5rem";
        iframe.style.right = window.innerWidth < 640 ? "0" : "1rem";
        iframe.style.width = window.innerWidth < 640 ? "100%" : "448px";
        iframe.style.height = window.innerWidth < 640 ? "100%" : "85vh";
        iframe.style.borderRadius = window.innerWidth < 640 ? "0" : "0.75rem";
      });

      function handleMessage(event: MessageEvent<any>) {
        if (event.origin !== "https://www.webbotify.com") {
          return;
        }
        if (!event.data.closeBot) return;

        let IframeIsOpen = iframe.style.display === "none";

        if (IframeIsOpen) {
          iframe.style.display = "block";
          tooltip.style.display = "none";
          toggleButton.innerHTML =
            '<img src="https://firebasestorage.googleapis.com/v0/b/ai-chatbot-f2048.appspot.com/o/x.svg?alt=media&token=7695194f-d6e5-4577-a5df-e0466a3c0071" style="width: 30px; height: 30px; filter: {{ brightness }}" />';
          toggleButton.style.width = "60px";
          toggleButton.style.height = "60px";
        } else {
          iframe.style.display = "none";
          tooltip.style.display = "block";
          toggleButton.innerHTML =
            '<img src="{{botIcon}}" style="width: 30px; height: 30px;" />';
          toggleButton.style.width = "60px";
          toggleButton.style.height = "60px";
        }
      }

      window.addEventListener("message", handleMessage, false);
    }, 2000);
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();