const Thumbnail = ({ file }) => {
  if (!file) return null;

  // Check if the uploaded file is an image
  const isImage = file.type.startsWith("image/");

  if (!isImage) {
    return <p>File is not an image.</p>;
  }

  return (
    <img
      src={URL.createObjectURL(file)}
      alt="Thumbnail"
      className="h-32 object-contain"
    />
  );
};

export default Thumbnail;
