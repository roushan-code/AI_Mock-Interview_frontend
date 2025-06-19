import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({isOpen, onClose, title, children}) => {
  return (
    <div className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform bg-[#282828] w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r Oborder-l-gray-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header  */}
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="flex items-center text-base font-semibold text-white">
          {title}
        </h5>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-[#ddf0fe] bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

        <div className="text-sm text-[#ede8ff] mx-3 mb-6">{children}</div>
      </div>
      )
}

      export default Drawer