import React from 'react';
import FavouriteTableRow from './FavouriteTableRow';
import {ExerciseSet} from '../../types/data';

export default function FavouriteExerciseData({
  item,
  token,
  workoutId,
}: {
  item: any;
  token: number;
  workoutId: String;
}) {
  if (!item) {
    return null;
  }

  return item.map((row: ExerciseSet, index: Number) => {
    return (
      <FavouriteTableRow
        row={row}
        index={index}
        token={token}
        workoutId={workoutId}
        key={`${index}`}
      />
    );
  });
}
