class Navbar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      .tabs {
        background: white;
        padding: 0 2rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        gap: 1rem;
      }

      .tab {
        padding: 1rem 1.5rem;
        border: none;
        background: none;
        font-size: 0.95rem;
        font-weight: 500;
        color: #6b7280;
        cursor: pointer;
        position: relative;
        transition: color 0.2s;
      }

      .tab:hover {
        color: var(--primary-color);
      }

      .tab.active {
        color: var(--primary-color);
      }

      .tab.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--primary-color);
        border-radius: 3px 3px 0 0;
      }

      .tab-badge {
        display: inline-block;
        background: var(--bg-color);
        color: var(--text-color);
        padding: 0.125rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        margin-left: 0.5rem;
      }

      .tab.active .tab-badge {
        background: var(--bg-color);
        color: var(--primary-color);
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
    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <nav class="tabs">
        <button class="tab active" data-filter="all">
          Semua
        </button>
        <button class="tab" data-filter="active">
          Aktif
        </button>
        <button class="tab" data-filter="archived">
          Diarsipkan
        </button>
      </nav>
    `;

    const tabs = this._shadowRoot.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        this.dispatchEvent(
          new CustomEvent("filter-change", {
            detail: { filter: tab.dataset.filter },
            bubbles: true,
            composed: true,
          })
        );
      });
    });
  }
}

customElements.define("nav-bar", Navbar);
