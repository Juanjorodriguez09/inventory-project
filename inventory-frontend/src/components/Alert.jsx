export default function Alert({ feedback, onClose }) {
  if (!feedback) return null;

  const isError = feedback.type === "error";

  return (
    <div
      className={`alert ${isError ? "alert-error" : "alert-success"}`}
      role="alert"
    >
      <span>{feedback.text}</span>
      <button className="alert-close" onClick={onClose} type="button">
        ×
      </button>
    </div>
  );
}