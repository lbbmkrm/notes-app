class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: false,
  };

  static observedAttributes = ["id"];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  set setNote(note) {
    this._note = note;
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .note-card {
      height: 240px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
        background: var(--card-bg);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        box-shadow: var(--shadow);
        transition: all 0.3s;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .note-card:hover {
        transform: translateY(-4px);
        border-color: #e5e7eb;
      }

      .note-card:hover .note-actions {
        opacity: 1;
      }

      .note-header {
        margin-bottom: 0.75rem;
      }

      .note-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-main);
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      .note-status {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .status-active {
        background: color-mix(in srgb, var(--primary-color) 15%, white);
        color: var(--primary-color);
      }

      .status-archived {
        background: color-mix(in srgb, var(--secondary-color) 15%, white);
        color: var(--secondary-color);
      }

      .note-body {
        color: var(--text-soft);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .note-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid #eef2f0;
      }

      .note-date {
        font-size: 0.8rem;
        color: var(--text-soft);
      }

      .note-actions {
        display: flex;
        gap: 0.5rem;
        opacity: 0;
        transition: opacity 0.2s;
      }
      @media (max-width: 768px), (hover: none) {
        .note-actions {
          opacity: 1;
        }
      }

      .action-btn {
        background: none;
        border: 1px solid transparent;
        padding: 0.25rem 0.75rem;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .action-btn.archive {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }

      .action-btn.archive:hover {
        background: var(--primary-color);
        color: white;
      }

      .action-btn.delete {
        color: var(--secondary-color);
        border-color: var(--secondary-color);
      }

      .action-btn.delete:hover {
        background: var(--secondary-hover);
        color: white;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "id") {
      this._note.id = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    this._shadowRoot
      .querySelector(".note-card")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("viewNote", {
            detail: this._note,
            bubbles: true,
            composed: true,
          })
        );
      });

    this._shadowRoot
      .querySelector(".action-btn.archive")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("archiveNote", {
            detail: this._note.id,
            bubbles: true,
            composed: true,
          })
        );
      });

    this._shadowRoot
      .querySelector(".action-btn.delete")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("deleteNote", {
            detail: this._note.id,
            bubbles: true,
            composed: true,
          })
        );
      });
  }

  render() {
    this.updateStyle();
    this._emptyContent();

    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <div class="note-card">
        <div class="note-header">
          <h3 class="note-title">${this._note.title}</h3>
          <span class="note-status ${
            this._note.archived ? "status-archived" : "status-active"
          }">
            ${this._note.archived ? "Arsip" : "Aktif"}
          </span>
        </div>

        <p class="note-body">${this._note.body}</p>

        <div class="note-footer">
          <span class="note-date">
            ${new Date(this._note.createdAt).toLocaleDateString()}
          </span>

          <div class="note-actions">
            <button class="action-btn archive">
              ${this._note.archived ? "Aktifkan" : "Arsipkan"}
            </button>
            <button class="action-btn delete">
              Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
