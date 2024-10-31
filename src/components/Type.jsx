import React from 'react';
import { typeColors } from '../utils/colors';

const Type = ({ type }) => {
   const colors = typeColors[type] || { color: '#000', background: 'transparent' };

   return (
      <button
         className="font-medium rounded-lg text-lg px-3 py-2 me-2 mb-2"
         style={{
            color: colors.color,
            backgroundColor: colors.background,
         }}
      >
         {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
   );
}

export default Type;
