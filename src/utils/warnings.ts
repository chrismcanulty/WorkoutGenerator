interface ObjectType {
  [key: string]: string;
}

const warnings: ObjectType = {
  '0': 'Please select at least one muscle group',
  '1': 'Please indicate what equipment you have available',
  '2': 'Please enter a valid number of exercises',
  '3': 'Please enter at least three characters',
  '4': 'Please enter less than 20 characters',
};

export default warnings;
