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
                height: 100%;
            }

            .note-item {
                background-color: var(--card-bg);
                border-radius: var(--border-radius);
                padding: 20px;
                box-shadow: var(--shadow);
                transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
                height: 100%;
                display: grid;
                grid-template-rows: auto 1fr auto;
                border: 1px solid #e5e7eb;
                cursor: pointer;
                position: relative;
            }

            .note-item.archived {
                background-color: #f8fafc;
                opacity: 0.8;
                border-style: dashed;
            }

            .note-item:hover {
                transform: translateY(-12px);
                box-shadow: 0 12px 20px -5px rgb(0 0 0 / 0.15);
                border-color: #d1d5db;
            }

            .note-item h1 {
                margin: 0 0 10px 0;
                font-size: 1.15rem;
                font-weight: 700;
                color: var(--text-main);
                line-height: 1.35;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }

            .badge-archived {
                font-size: 0.7rem;
                background-color: #94a3b8;
                color: white;
                padding: 2px 8px;
                border-radius: 6px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.025em;
            }

            .note-item p {
                margin: 0 0 16px 0;
                color: var(--text-soft);
                font-size: 0.95rem;
                white-space: pre-wrap;
                height: 40px;
                overflow: hidden;
            }

            .note-item .date {
                font-size: 0.85rem;
                color: var(--text-soft);
                font-style: normal;
                background: #f1f5f9;
                padding: 6px 10px;
                border-radius: 999px;
                border: 1px solid #e2e8f0;
                width: fit-content;
            }

            .note-footer {
                margin-top: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .note-footer .action {
                display: flex;
                gap: 8px;
            }

            .btn-archive {
                background: none;
                border: 1px solid var(--primary-color);
                color: var(--primary-color);
                border-radius: 6px;
                padding: 4px 12px;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-archive:hover {
                background-color: var(--primary-color);
                color: white;
            }

            .btn-delete {
                background: none;
                border: 1px solid red;
                color: red;
                border-radius: 6px;
                padding: 4px 12px;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-delete:hover {
                background-color: red;
                color: white;
            }

            .note-item.archived .btn-archive {
                border-color: var(--text-soft);
                color: var(--text-soft);
            }

            .note-item.archived .btn-archive:hover {
                background-color: var(--text-soft);
                color: white;
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ``;
  }

  attributeChangedCallback(name, oldName, newName) {
    if (name === "id") {
      this._note.id = newName;
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    this._shadowRoot
      .querySelector(".note-item")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("viewNote", {
            detail: this._note,
            bubbles: true,
            composed: true,
          }),
        );
      });

    this._shadowRoot
      .querySelector(".btn-archive")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("archiveNote", {
            detail: this._note.id,
            bubbles: true,
            composed: true,
          }),
        );
      });

    this._shadowRoot
      .querySelector(".btn-delete")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(
          new CustomEvent("deleteNote", {
            detail: this._note.id,
            bubbles: true,
            composed: true,
          }),
        );
      });
  }

  render() {
    this.updateStyle();
    this._emptyContent();
    this._shadowRoot.innerHTML += `
            ${this._style.outerHTML}
            <div class="note-item ${this._note.archived ? "archived" : ""}">
                <h1>
                    <span>${this._note.title}</span>
                    ${this._note.archived ? '<span class="badge-archived">Arsip</span>' : ""}
                </h1>
                <p>${this._note.body}</p>
                <div class="note-footer">
                    <div class="date">${new Date(this._note.createdAt).toLocaleDateString()}</div>
                    <div class="action">
                        <button class="btn-archive">
                            ${this._note.archived ? "Buka Arsip" : "Arsipkan"}
                        </button>
                        <button class="btn-delete">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
