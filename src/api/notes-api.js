const serverURL = "https://notes-api.dicoding.dev/v2";

const notesAPI = {
  getAllNotes: async () => {
    try {
      const response = await fetch(`${serverURL}/notes`, { method: "GET" });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  getArchivedNotes: async () => {
    try {
      const response = await fetch(`${serverURL}/notes/archived`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  getNote: async (id) => {
    try {
      const response = await fetch(`${serverURL}/notes/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  createNote: async (note) => {
    try {
      const response = await fetch(`${serverURL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  archiveNote: async (id) => {
    try {
      const response = await fetch(`${serverURL}/notes/${id}/archive`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  unarchiveNote: async (id) => {
    try {
      const response = await fetch(`${serverURL}/notes/${id}/unarchive`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  deleteNote: async (id) => {
    try {
      const response = await fetch(`${serverURL}/notes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || response.statusText);
        error.statusCode = response.status;
        throw error;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default notesAPI;
