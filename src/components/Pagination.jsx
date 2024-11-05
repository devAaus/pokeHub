import React from 'react'

const Pagination = ({ handlePrev, handleNext, prevDisabled, nextDisabled, total }) => {
   return (
      <div className=" fixed -translate-x-2/4 flex gap-2 z-10 shadow-[0_4px_8px_rgba(0,0,0,0.1)] px-4 py-2 rounded-lg left-2/4 bottom-1">
         <button
            className="join-item btn"
            onClick={handlePrev}
            disabled={prevDisabled}
         >
            « Previous
         </button>
         <span className="join-item btn">
            {total}
         </span>
         <button
            className="join-item btn"
            onClick={handleNext}
            disabled={nextDisabled}
         >
            » Next
         </button>
      </div>
   )
}

export default Pagination