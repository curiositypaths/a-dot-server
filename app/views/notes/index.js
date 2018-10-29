const create = ({ note }) => {
  const { title, publicId } = note;
  const [lastNoteRevision] = note.revisions;
  const { body } = lastNoteRevision;
  return {
    error: false,
    title,
    publicId,
    body
  };
};

module.exports = {
  create
};
