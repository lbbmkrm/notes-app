import notesAPI from "../api/notes-api.js";
import Swal from "sweetalert2";
import { animate } from "animejs";
import "./appBarComponent.js";
import "./navbarComponent.js";
import "./noteListComponent.js";
import "./noteFormComponent.js";
import "./loadingIndicatorComponent.js";

class NotesApp extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = [];
  _query = "";
  _currentFilter = "all";

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _openModal(modalId) {
    const modal = this._shadowRoot.getElementById(modalId);
    const modalContent = modal.querySelector(".modal-content");

    modal.style.display = "flex";

    animate(modal, {
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutSine",
    });

    animate(modalContent, {
      scale: [0.9, 1],
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: "easeOutCubic",
    });
  }

  _closeModal(modalId) {
    const modal = this._shadowRoot.getElementById(modalId);
    const modalContent = modal.querySelector(".modal-content");

    animate(modalContent, {
      scale: [1, 0.9],
      opacity: [1, 0],
      translateY: [0, 20],
      duration: 300,
      easing: "easeInCubic",
    });

    animate(modal, {
      opacity: [1, 0],
      duration: 300,
      easing: "easeInSine",
    }).then(() => {
      modal.style.display = "none";
    });
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
        min-height: 100vh;
      }

      main {
        max-width: 1400px;
        margin: 0 auto;
      }

      .section-title {
        margin: 2rem;
        color: var(--text-main);
        font-size: 1.5rem;
        font-weight: 700;
      }

      .modal {
        display: none;
        position: fixed;
        inset: 0;
        background-color: rgba(15, 23, 42, 0.6);
        z-index: 1000;
        backdrop-filter: blur(8px);
        align-items: center;
        justify-content: center;
        opacity: 0;
      }

      .modal-content {
        background: var(--card-bg);
        max-width: 550px;
        width: 100%;
        padding: 32px;
        border-radius: 20px;
        position: relative;
      }

      .close-modal {
        position: absolute;
        top: 12px;
        right: 12px;
        border: none;
        background: #f1f5f9;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
      }

      .fab {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  async connectedCallback() {
    this.render();
    await this._loadNotes();

    this.addEventListener("search", (event) => {
      this._query = event.detail.query;
      this._updateNoteLists();
    });
    this.addEventListener("filter-change", (event) => {
      this._currentFilter = event.detail.filter;
      this._updateNoteLists();
    });
    this.addEventListener("viewNote", (event) => {
      const note = event.detail;

      this._shadowRoot.getElementById("view-title").innerText = note.title;
      this._shadowRoot.getElementById("view-body").innerText = note.body;
      this._shadowRoot.getElementById("view-date").innerText = new Date(
        note.createdAt
      ).toLocaleDateString();

      this._openModal("view-modal");
    });

    this.addEventListener("addNote", async (event) => {
      const { title, body } = event.detail;
      try {
        this._showLoading(true);
        await notesAPI.createNote({ title, body });
        await this._loadNotes();
        Swal.fire({
          title: "Success",
          text: "Catatan berhasil ditambahkan",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Gagal menambahkan catatan",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      } finally {
        this._closeModal("form-modal");
        this._showLoading(false);
      }
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
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: note.archived
            ? "Catatan berhasil diunarsipkan"
            : "Catatan berhasil diarsipkan",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Catatan gagal diarsipkan",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this._showLoading(false);
      }
    });

    this.addEventListener("deleteNote", async (event) => {
      const result = await Swal.fire({
        title: "Apakah anda yakin ",
        text: "Catatan akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const noteId = event.detail;
        try {
          this._showLoading(true);
          await notesAPI.deleteNote(noteId);
          await this._loadNotes();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Catatan berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Catatan gagal dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        } finally {
          this._showLoading(false);
        }
      }
    });

    this.addEventListener("toggle-form", () => {
      this._openModal("form-modal");
    });

    this._shadowRoot.getElementById("fab-add").addEventListener("click", () => {
      this._openModal("form-modal");
    });

    this._shadowRoot.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        this._closeModal(modal.id);
      });
    });

    this._shadowRoot.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this._closeModal(modal.id);
        }
      });
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
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Gagal memuat catatan",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      this._showLoading(false);
    }
  }

  _updateNoteLists() {
    const activeNoteList = this._shadowRoot.querySelector("#active-notes");
    const archivedNoteList = this._shadowRoot.querySelector("#archived-notes");
    const activeSection = this._shadowRoot.querySelector("#active-section");
    const archivedSection = this._shadowRoot.querySelector("#archived-section");

    const query = this._query.toLowerCase();
    const filteredNotes = this._notes.filter((note) => {
      const titleMatch = note.title.toLowerCase().includes(query);
      const bodyMatch = note.body.toLowerCase().includes(query);
      return titleMatch || bodyMatch;
    });

    if (activeNoteList) {
      activeNoteList.setNotes = filteredNotes.filter((note) => !note.archived);
    }
    if (archivedNoteList) {
      archivedNoteList.setNotes = filteredNotes.filter((note) => note.archived);
    }

    if (activeSection && archivedSection) {
      if (this._currentFilter === "all") {
        activeSection.style.display = "block";
        archivedSection.style.display = "block";
      } else if (this._currentFilter === "active") {
        activeSection.style.display = "block";
        archivedSection.style.display = "none";
      } else if (this._currentFilter === "archived") {
        activeSection.style.display = "none";
        archivedSection.style.display = "block";
      }
    }
  }

  _showLoading(active) {
    const loader = this._shadowRoot.querySelector("loading-indicator");
    if (active) loader.setAttribute("active", "");
    else loader.removeAttribute("active");
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <loading-indicator></loading-indicator>
      <app-bar></app-bar>
      <nav-bar></nav-bar>

      <main>
        <section id="active-section">
          <h2 class="section-title">Catatan Aktif</h2>
          <note-list id="active-notes"></note-list>
        </section>

        <section id="archived-section">
          <h2 class="section-title">Arsip</h2>
          <note-list id="archived-notes"></note-list>
        </section>

        <div class="modal" id="view-modal">
          <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h2 id="view-title"></h2>
            <p id="view-body"></p>
            <div id="view-date"></div>
          </div>
        </div>

        <div class="modal" id="form-modal">
          <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h2>Buat Catatan Baru</h2>
            <note-form></note-form>
          </div>
        </div>
      </main>

      <button class="fab" id="fab-add">&plus;</button>
    `;
  }
}

customElements.define("notes-app", NotesApp);
