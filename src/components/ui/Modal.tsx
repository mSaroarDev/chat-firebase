import { RxCross2 } from "react-icons/rx";

const Modal = ({
  isOpen = false,
  onClose = () => {},
  size = "md",
  modalHeader = 'Modal Title',
  showFooter = false,
  footerItems,
  children
}) => {

const getSizeClass = () => {
  switch(size) {
    case 'w-sm':
      return 'w-sm';
    case 'md':
      return 'w-md';
    case 'lg':
      return 'w-lg';
    case 'xl':
      return 'w-xl';
    default:
      return 'w-md';
  }
};

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div onClick={(e)=> e.stopPropagation()} className={`${getSizeClass()} w-full bg-white rounded-xl shadow-lg`}>
            <div className="w-full flex items-center justify-between px-2 py-3 border-b border-slate-200">
              <h4 className="ml-2 font-medium text-base tracking-wide">{modalHeader}</h4>
              <button onClick={onClose} className="bg-red-500/10 text-red-500 rounded-md p-1 cursor-pointer">
                <RxCross2 size={16} />
              </button>
            </div>

            <div className="p-5">
              {children}
            </div>

            {showFooter && (
              <div className="w-full flex items-center justify-end px-2 py-3 border-t border-slate-200">
                {footerItems}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
};

export default Modal;