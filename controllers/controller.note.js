const mongoose = require('mongoose');
const Note = require('../models/model.note');

const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const newNote = new Note({
      userId,
      title,
      content
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error });
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const notes = await Note.find({ userId: new mongoose.Types.ObjectId(userId) });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error al obtener las notas:', error);
    res.status(500).json({ message: 'Error al obtener las notas', error });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error });
  }
};

const checkNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id },
      { checked },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error });
  }
};

module.exports = { deleteNote, createNote, updateNote, getNotesByUser, checkNote };
