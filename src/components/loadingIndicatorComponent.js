import { animate, stagger } from "animejs";

class LoadingIndicator extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _animation = null;

  static observedAttributes = ["active"];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: none;
                position: fixed;
                inset: 0;
                background-color: rgba(15, 23, 42, 0.7);
                backdrop-filter: blur(8px);
                z-index: 2000;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 16px;
            }            

            :host([active]) {
                display: flex;
            }

            .dots-container {
                display: flex;
                gap: 8px;
            }

            .dot {
                width: 16px;
                height: 16px;
                background-color: var(--secondary-color);
                border-radius: 50%;
            }

            .loading-text {
                color: white;
                font-weight: 600;
                letter-spacing: 0.05em;
                font-size: 0.9rem;
            }
        `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") {
      if (this.hasAttribute("active")) {
        this._startAnimation();
      } else {
        this._stopAnimation();
      }
    }
  }

  _startAnimation() {
    const dots = this._shadowRoot.querySelectorAll(".dot");
    if (dots.length > 0) {
      this._animation = animate(dots, {
        translateY: [0, -15, 0],
        opacity: [0.5, 1, 0.5],
        delay: stagger(150),
        duration: 800,
        loop: true,
        easing: "easeInOutQuad",
      });
    }
  }

  _stopAnimation() {
    if (this._animation) {
      this._animation.pause();
      this._animation = null;
    }
  }

  connectedCallback() {
    this.render();
    if (this.hasAttribute("active")) {
      this._startAnimation();
    }
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <div class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="loading-text">MOHON TUNGGU...</div>
    `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
