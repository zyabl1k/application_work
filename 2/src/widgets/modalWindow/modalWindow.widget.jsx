export default function ModalWindowWidget({ isActive, onClose, children }) {
  if (!isActive) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-md"
    >
      <div className="flex w-[600px] flex-col">
        <button onClick={onClose} className="place-self-end">
          X
        </button>
        <div className="dark:bg-root-greyDark rounded bg-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
