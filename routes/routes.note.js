const express = require('express');
const { createNote, getNotesByUser, updateNote, deleteNote, checkNote } = require('../controllers/controller.note');

const router = express.Router();

router.route('/').post(createNote).get(getNotesByUser);
router.route('/:id').put(updateNote).delete(deleteNote);
router.route('/check/:id').put(checkNote);

module.exports = router;

