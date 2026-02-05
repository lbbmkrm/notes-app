class LoadingIndicator extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            :host{
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
            justify-content: center;
            align-items: center;
            }            

            :host([active]){
            display: flex;
            }

            .loading-indicator{
                width: 50px;
                height: 50px;
                border: 5px solid var(--secondary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin{
                from{
                    transform: rotate(0deg);
                }
                to{
                    transform: rotate(360deg);
                }
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ``;
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.innerHTML += `
    ${this._style.outerHTML}
    <div class="loading-indicator"></div>
    `;
  }
}
customElements.define("loading-indicator", LoadingIndicator);
