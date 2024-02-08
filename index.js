window.onload = () => {
  window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let headerLogo = this.document.querySelector(".headerLogo");
    let scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
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

  class LiteYTEmbed extends HTMLElement {
    connectedCallback() {
      this.videoId = this.getAttribute("videoid");

      let playBtnEl = this.querySelector(".lty-playbtn");
      // A label for the button takes priority over a [playlabel] attribute on the custom-element
      this.playLabel =
        (playBtnEl && playBtnEl.textContent.trim()) ||
        this.getAttribute("playlabel") ||
        "Play";

      if (!this.style.backgroundImage) {
        this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
      }

      if (!playBtnEl) {
        playBtnEl = document.createElement("button");
        playBtnEl.type = "button";
        playBtnEl.classList.add("lty-playbtn");
        this.append(playBtnEl);
      }
      if (!playBtnEl.textContent) {
        const playBtnLabelEl = document.createElement("span");
        playBtnLabelEl.className = "lyt-visually-hidden";
        playBtnLabelEl.textContent = this.playLabel;
        playBtnEl.append(playBtnLabelEl);
      }
      playBtnEl.removeAttribute("href");

      this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
        once: true,
      });

      this.addEventListener("click", this.addIframe);
      this.needsYTApiForAutoplay =
        navigator.vendor.includes("Apple") ||
        navigator.userAgent.includes("Mobi");
    }

    static addPrefetch(kind, url, as) {
      const linkEl = document.createElement("link");
      linkEl.rel = kind;
      linkEl.href = url;
      if (as) {
        linkEl.as = as;
      }
      document.head.append(linkEl);
    }

    static warmConnections() {
      if (LiteYTEmbed.preconnected) return;

      LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
      LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
      LiteYTEmbed.addPrefetch(
        "preconnect",
        "https://googleads.g.doubleclick.net"
      );
      LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

      LiteYTEmbed.preconnected = true;
    }

    fetchYTPlayerApi() {
      if (window.YT || (window.YT && window.YT.Player)) return;

      this.ytApiPromise = new Promise((res, rej) => {
        var el = document.createElement("script");
        el.src = "https://www.youtube.com/iframe_api";
        el.async = true;
        el.onload = (_) => {
          YT.ready(res);
        };
        el.onerror = rej;
        this.append(el);
      });
    }

    async addYTPlayerIframe(params) {
      this.fetchYTPlayerApi();
      await this.ytApiPromise;

      const videoPlaceholderEl = document.createElement("div");
      this.append(videoPlaceholderEl);

      const paramsObj = Object.fromEntries(params.entries());

      new YT.Player(videoPlaceholderEl, {
        width: "100%",
        videoId: this.videoId,
        playerVars: paramsObj,
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    }

    async addIframe() {
      if (this.classList.contains("lyt-activated")) return;
      this.classList.add("lyt-activated");

      const params = new URLSearchParams(this.getAttribute("params") || []);
      params.append("autoplay", "1");
      params.append("playsinline", "1");

      if (this.needsYTApiForAutoplay) {
        return this.addYTPlayerIframe(params);
      }

      const iframeEl = document.createElement("iframe");
      iframeEl.width = 1000;
      iframeEl.height = 1000;
      iframeEl.title = this.playLabel;
      iframeEl.allow =
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframeEl.allowFullscreen = true;
      iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
        this.videoId
      )}?${params.toString()}`;
      this.append(iframeEl);
      iframeEl.focus();
    }
  }

  customElements.define("lite-youtube", LiteYTEmbed);
};
