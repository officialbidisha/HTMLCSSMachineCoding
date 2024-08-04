import React, { useState, useEffect, useRef } from 'react';
import Shape from './Shape';

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const getOnes = () => BOX_DATA.flat().filter(x => x === 1).length;

export default function App() {
  const [shapeState, setShapeState] = useState(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Ref to manage interval ID
  const intervalRef = useRef(null);

  const selectBox = (event) => {
    const attr = event.target.getAttribute('data-id');
    if (attr) {
      setShapeState(prev => {
        const updated = new Set(prev);
        updated.add(attr);
        return updated;
      });
    }

    // Check if the current state matches the criteria
    if (shapeState.size === getOnes() - 1) {
      setIsAllSelected(true);
    }
  };

  useEffect(() => {
    if (isAllSelected) {
      // Clear existing interval if any
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setShapeState(prevSet => {
          const array = Array.from(prevSet);
          if (array.length > 0) {
            array.splice(0, 1);
            return new Set(array);
          } else {
            clearInterval(intervalRef.current); // Clear interval if set is empty
            return prevSet;
          }
        });
      }, 400);

      return () => {
        clearInterval(intervalRef.current); // Clear interval on unmount or when dependencies change
      };
    }
  }, [isAllSelected]);

  // Optional: Check if shapeState size needs to reset isAllSelected flag
  useEffect(() => {
    if (shapeState.size === 0) {
      setIsAllSelected(false);
    }
  }, [shapeState]);

  return (
    <div onClick={selectBox}>
      {BOX_DATA.map((row, i) => (
        <div className="row" key={i}>
          {row.map((col, j) => (
            BOX_DATA[i][j] > 0 ? (
              <Shape
                key={`${i}_${j}`}
                isSelected={shapeState.has(`${i}_${j}`)}
                row={i}
                col={j}
                dataId={`${i}_${j}`}
              />
            ) : null
          ))}
        </div>
      ))}
    </div>
  );
}
