import React from 'react';
import FavouriteTableRow from './FavouriteTableRow';
import {ExerciseSet} from '../../types/data';

export default function FavouriteExerciseData({
  item,
  workoutId,
}: {
  item: any;
  workoutId: String;
}) {
  return item.map((row: ExerciseSet, index: Number) => {
    if (!row) {
      return null;
    }
    return (
      <FavouriteTableRow
        row={row}
        index={index}
        workoutId={workoutId}
        key={`${index}`}
      />
    );
  });
}
