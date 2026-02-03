class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static observedAttributes = ["title"];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
            width: 100%;
            background-color: var(--card-bg);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 1px solid #e2e8f0;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 16px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        h1 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary-color);
            letter-spacing: -0.025em;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo-icon {
            width: 32px;
            height: 32px;
            background-color: var(--primary-color);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ``;
  }

  attributeChangedCallback(name, oldName, newName) {
    if (name === "title") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <div class="container">
            <h1>
                <div class="logo-icon">N</div>
                ${this.getAttribute("title")}
            </h1>
        </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
