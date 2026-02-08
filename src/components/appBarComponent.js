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
    .header {
      background: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-bar {
      flex: 1;
      max-width: 500px;
      position: relative;
      min-width: 0;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 1.25rem;
    }

    .search-bar input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 0.95rem;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    .search-bar input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    /* Media query untuk tablet */
    @media (max-width: 768px) {
      .header {
        padding: 1rem 1.5rem;
        gap: 1rem;
      }

      .logo {
        font-size: 1.25rem;
      }

      .btn-primary {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
    }

    /* Media query untuk mobile */
    @media (max-width: 640px) {
      .header {
        flex-wrap: wrap;
        padding: 1rem;
        gap: 0.75rem;
      }

      .logo {
        font-size: 1.125rem;
        flex-shrink: 0;
      }

      .search-bar {
        order: 3;
        flex: 1 1 100%;
        max-width: 100%;
        width: 100%;
      }

      .search-bar input {
        padding: 0.625rem 1rem 0.625rem 2.5rem;
        font-size: 0.875rem;
        width: 100%;
      }

      .btn-primary {
        padding: 0.625rem 1rem;
        font-size: 0.875rem;
      }

      .btn-primary span:last-child {
        display: none;
      }
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
        <header class="header">
          <div class="logo">
            <span>MyNotes</span>
          </div>

          <div class="search-bar">
            <span class="search-icon">&#128269;</span>
            <input type="text" id="search-input" placeholder="Cari catatan..." />
          </div>

          <button class="btn-primary" id="btn-add">
            <span>&plus;</span>
            <span>Catatan Baru</span>
          </button>
        </header>
    `;

    const searchInput = this._shadowRoot.querySelector("#search-input");
    searchInput.addEventListener("input", (e) => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: { query: e.target.value },
          bubbles: true,
          composed: true,
        })
      );
    });

    const btnAdd = this._shadowRoot.querySelector("#btn-add");
    btnAdd.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-form", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("app-bar", AppBar);
