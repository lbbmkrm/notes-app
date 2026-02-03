class NoteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;
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
        max-width: 640px;
        margin: 2rem auto;
    }

    form {
        background-color: var(--card-bg);
        padding: 24px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        border: 1px solid #e2e8f0;
    }

    .form-group {
        margin-bottom: 16px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--text-main);
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        background: #fff;
        color: var(--text-main);
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-family: inherit;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
        color: #9aa2af;
    }

    .form-group input:hover,
    .form-group textarea:hover {
        border-color: #d1d5db;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
    }

    .form-group textarea {
        min-height: 140px;
        resize: vertical;
    }

    .error {
        color: var(--error-color);
        font-size: 0.85rem;
        margin-top: 5px;
        font-weight: 500;
    }

    button {
        width: 100%;
        padding: 12px;
        background-color: var(--primary-color);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--shadow);
        transition: background-color 0.2s, transform 0.1s;
    }

    button:hover {
        background-color: var(--primary-hover);
    }

    button:active {
        transform: scale(0.99);
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
    <form id="noteForm">
        <div class="form-group">
          <label for="title">Judul</label>
          <input type="text" id="title" name="title" required minlength="3">
          <div id="titleError" class="error"></div>
        </div>
        <div class="form-group">
          <label for="body">Isi Catatan</label>
          <textarea id="body" name="body" required minlength="10" rows="5"></textarea>
          <div id="bodyError" class="error"></div>
        </div>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    this._setupValidation();
    this._setupSubmitHandler();
  }

  _setupValidation() {
    const titleInput = this._shadowRoot.querySelector("#title");
    const bodyInput = this._shadowRoot.querySelector("#body");

    const validateInput = (input, error, fieldName) => {
      const errorDisplay = this._shadowRoot.querySelector(error);
      if (input.validity.valueMissing) {
        errorDisplay.innerText = `${fieldName} tidak boleh kosong`;
      } else if (input.validity.tooShort) {
        errorDisplay.innerText = `${fieldName} minimal ${input.minLength} karakter`;
      } else {
        errorDisplay.innerText = "";
      }
    };

    titleInput.addEventListener("input", (event) => {
      validateInput(titleInput, "#titleError", "Judul");
    });
    titleInput.addEventListener("blur", (event) => {
      validateInput(titleInput, "#titleError", "Judul");
    });

    bodyInput.addEventListener("input", (event) => {
      validateInput(bodyInput, "#bodyError", "Isi catatan");
    });
    bodyInput.addEventListener("blur", (event) => {
      validateInput(bodyInput, "#bodyError", "Isi catatan");
    });
  }
  _setupSubmitHandler() {
    const form = this._shadowRoot.querySelector("#noteForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const newNote = {
        id: `${new Date().getTime()}-${Math.random().toString(36).slice(2, 9)}`,
        title: formData.get("title"),
        body: formData.get("body"),
        createdAt: new Date().toISOString(),
        archived: false,
      };
      this.dispatchEvent(
        new CustomEvent("addNote", {
          detail: newNote,
          bubbles: true,
          composed: true,
        }),
      );
      form.reset();
    });
  }
}
customElements.define("note-form", NoteForm);
