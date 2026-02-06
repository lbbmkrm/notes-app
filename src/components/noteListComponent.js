import { animate, stagger } from "animejs";
import "./noteItemComponent.js";

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = [];

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  set setNotes(notes) {
    this._notes = notes;
    this.render();
  }

  #createNoteItem(note) {
    const noteItem = document.createElement("note-item");
    noteItem.setAttribute("id", note.id);
    noteItem.setNote = note;
    return noteItem;
  }

  updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
            width: 100%;
            margin-top: 2rem;
        }

        .empty-message {
            text-align: center;
            color: var(--text-soft);
            font-size: 1rem;
        }

        .note-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            padding: 0 24px 40px 24px;
            align-items: stretch;
        }

        @media screen and (max-width: 640px) {
            .note-list {
                grid-template-columns: 1fr;
                gap: 16px;
                padding: 0 16px 32px 16px;
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
    this.updateStyle();
    this._emptyContent();
    this._shadowRoot.innerHTML = `
            ${this._style.outerHTML}
            <div class="note-list"></div>
        `;

    const container = this._shadowRoot.querySelector(".note-list");
    if (this._notes.length === 0) {
      container.innerHTML = `<p class="empty-message">Tidak ada catatan</p>`;
    } else {
      const noteElements = this._notes.map((note) => {
        return this.#createNoteItem(note);
      });
      container.append(...noteElements);

      animate(container.querySelectorAll("note-item"), {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        delay: stagger(100),
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  }
}

customElements.define("note-list", NoteList);
