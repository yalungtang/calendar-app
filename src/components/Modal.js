const Modal = ({ headerLabel, children, onClose }) => {
  return (
    <div className="absolute z-20 flex justify-center h-screen items-center bg-gray-200 antialiased w-full bg-opacity-60">
      <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
          <p className="font-semibold text-gray-800">{headerLabel}</p>
          <button onClick={onClose} className="bg-none border-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
