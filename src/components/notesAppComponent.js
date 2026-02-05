import notesAPI from "../api/notes-api.js";
import "./appBarComponent.js";
import "./noteListComponent.js";
import "./noteFormComponent.js";
import "./loadingIndicatorComponent.js";

class NotesApp extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = [];
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
            min-height: 100vh;
        }

        main {
            padding: 32px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .section-title {
            margin: 2rem 0 1.25rem 0;
            text-align: center;
            color: var(--text-main);
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.015em;
            position: relative;
        }

        .section-title::after {
            content: "";
            display: block;
            width: 64px;
            height: 3px;
            background: var(--primary-color);
            border-radius: 999px;
            margin: 8px auto 0;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(15, 23, 42, 0.6);
            z-index: 1000;
            backdrop-filter: blur(8px);
            padding: 20px;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            width: 100%;
            max-width: 550px;
            max-height: 85vh;
            background-color: var(--card-bg);
            padding: 40px 32px 32px 32px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border: 1px solid #e2e8f0;
            overflow-y: auto;
            animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes modalScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .modal-content h2 {
            margin: 0 0 16px 0;
            font-size: 1.5rem;
            color: var(--primary-color);
            line-height: 1.4;
        }

        .modal-content p {
            color: var(--text-soft);
            line-height: 1.7;
            font-size: 1.05rem;
            margin-bottom: 24px;
            white-space: pre-wrap;
        }

        .modal-content .date {
            display: inline-block;
            background: #f1f5f9;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 0.85rem;
            color: var(--text-soft);
            font-weight: 500;
        }

        .close-modal {
            position: absolute;
            top: 16px;
            right: 16px;
            background-color: #f1f5f9;
            color: var(--text-soft);
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .close-modal:hover {
            background-color: #e2e8f0;
            color: var(--error-color);
            transform: rotate(90deg);
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = ``;
  }

  async connectedCallback() {
    this.render();
    this._loadNotes();

    this.addEventListener("addNote", async (event) => {
      const { title, body } = event.detail;
      try {
        this._showLoading(true);
        await notesAPI.createNote({
          title,
          body,
        });
        await this._loadNotes();
      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        this._showLoading(false);
      }
    });

    this.addEventListener("viewNote", (event) => {
      const note = event.detail;
      const modal = this._shadowRoot.getElementById("modal");
      modal.style.display = "flex";
      this._shadowRoot.getElementById("modal-title").innerText = note.title;
      this._shadowRoot.getElementById("modal-body").innerText = note.body;
      this._shadowRoot.getElementById("modal-date").innerText = new Date(
        note.createdAt,
      ).toLocaleDateString();

      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      };
    });

    this._shadowRoot
      .getElementById("close-modal")
      .addEventListener("click", () => {
        this._shadowRoot.getElementById("modal").style.display = "none";
      });

    this.addEventListener("archiveNote", async (event) => {
      const noteId = event.detail;
      const note = this._notes.find((note) => note.id === noteId);

      try {
        this._showLoading(true);
        if (note.archived) {
          await notesAPI.unarchiveNote(noteId);
        } else {
          await notesAPI.archiveNote(noteId);
        }
        await this._loadNotes();
      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        this._showLoading(false);
      }
    });

    this.addEventListener("deleteNote", async (event) => {
      const noteId = event.detail;
      try {
        this._showLoading(true);
        await notesAPI.deleteNote(noteId);
        await this._loadNotes();
      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        this._showLoading(false);
      }
    });
  }

  async _loadNotes() {
    try {
      this._showLoading(true);
      const activeNotes = await notesAPI.getAllNotes();
      const archivedNotes = await notesAPI.getArchivedNotes();

      this._notes = [...activeNotes, ...archivedNotes];
      this._updateNoteLists();
    } catch (error) {
      console.error(error);
    } finally {
      this._showLoading(false);
    }
  }
  _updateNoteLists() {
    const activeNoteList = this._shadowRoot.querySelector("#active-notes");
    const archivedNoteList = this._shadowRoot.querySelector("#archived-notes");

    if (activeNoteList) {
      activeNoteList.setNotes = this._notes.filter((note) => !note.archived);
    }
    if (archivedNoteList) {
      archivedNoteList.setNotes = this._notes.filter((note) => note.archived);
    }
  }
  _showLoading(isActive) {
    const loader = this._shadowRoot.querySelector("loading-indicator");
    if (loader) {
      if (isActive) {
        loader.setAttribute("active", "");
      } else {
        loader.removeAttribute("active");
      }
    }
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.innerHTML += `
    ${this._style.outerHTML}
    <loading-indicator></loading-indicator>
        <app-bar title="Notes App"></app-bar>
        <main>
            <note-form></note-form>
            
            <h2 class="section-title">Daftar Catatan</h2>
            <note-list id="active-notes"></note-list>

            <h2 class="section-title">Arsip</h2>
            <note-list id="archived-notes"></note-list>

            <div class="modal" id="modal">
                <div class="modal-content">
                    <button class="close-modal" id="close-modal">&times;</button>
                    <h2 id="modal-title"></h2>
                    <p id="modal-body"></p>
                    <div class="date" id="modal-date"></div>
                </div>
            </div>
        </main>
    `;
    this._updateNoteLists();
  }
}

customElements.define("notes-app", NotesApp);
