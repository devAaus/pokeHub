import React, { useEffect, useState, useRef } from 'react';
import { typeColors } from '../utils/colors';
import Type from './Type';

const MoveCard = ({ move }) => {
   const [moveDetails, setMoveDetails] = useState(null);
   const moveName = move.name;
   const moveUrl = move.url;
   const modalRef = useRef(null); // Create a ref for the modal

   useEffect(() => {
      const fetchMoveDetails = async () => {
         try {
            const response = await fetch(moveUrl);
            const data = await response.json();
            setMoveDetails(data);
         } catch (error) {
            console.error(`Error fetching move details for ${moveName}:`, error);
         }
      };
      fetchMoveDetails();
   }, [moveUrl, moveName]);

   const getMoveTypeColor = (type) => {
      return typeColors[type] || { color: '#000', background: 'transparent' };
   };

   const colors = moveDetails ? getMoveTypeColor(moveDetails.type.name) : { color: '#000', background: 'transparent' };

   const getDescription = () => {
      const englishDescription = moveDetails?.flavor_text_entries.find(entry => entry.language.name === 'en');
      return englishDescription ? englishDescription.flavor_text : 'No description available';
   };

   return (
      <>
         <div
            key={moveDetails?.id}
            className="rounded-lg px-3 py-3 cursor-pointer text-center text-xl font-bold"
            style={{
               color: colors.color,
               backgroundColor: colors.background,
            }}
            onClick={() => modalRef.current.showModal()}
         >
            {moveName.charAt(0).toUpperCase() + moveName.slice(1)}
         </div>

         <dialog ref={modalRef} className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-2xl text-white text-center mb-2">
                  {moveName.charAt(0).toUpperCase() + moveName.slice(1)}
               </h3>
               <h1 className="text-lg font-bold text-white">
                  {moveDetails && <Type type={moveDetails?.type?.name} />}
               </h1>
               <h1 className="text-lg font-bold text-white">
                  Accuracy:{" "}
                  <span className='text-xl font-normal text-gray-300'>{moveDetails?.accuracy || 'N/A'}</span>
               </h1>
               <h1 className="text-lg font-bold text-white">
                  Power:{" "}
                  <span className='text-xl font-normal text-gray-300'>{moveDetails?.power || 'N/A'}</span>
               </h1>
               <h1 className="text-lg font-bold text-white">
                  Description: <br />
                  <span className='text-xl font-normal text-gray-300'>{getDescription()}</span>
               </h1>
               <div className="modal-action">
                  <form method="dialog">
                     <button className="btn">Close</button>
                  </form>
               </div>
            </div>
         </dialog>
      </>
   );
}

export default MoveCard;
