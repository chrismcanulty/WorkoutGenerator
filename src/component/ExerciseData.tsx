import React from 'react';
import TableRow from './TableRow';
import {ExerciseSet} from '../../types/data';

export default function ExerciseData({
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
      <TableRow
        row={row}
        index={index}
        workoutId={workoutId}
        key={`${index}`}
      />
    );
  });
}
