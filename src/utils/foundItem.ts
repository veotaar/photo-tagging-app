interface FoundItem {
  isFound: boolean;
  name: string;
}

interface Location {
  x: number;
  y: number;
}

const distanceBetween = (a: Location, b: Location): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

export const foundItem = (
  hiddenObjectLocations: { A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number } },
  clickedLocation: Location,
  tolerance: number
): FoundItem => {
  const report: FoundItem = { isFound: false, name: '' };

  const locationA = hiddenObjectLocations.A;
  const locationB = hiddenObjectLocations.B;
  const locationC = hiddenObjectLocations.C;

  const distanceToA = distanceBetween(locationA, clickedLocation);
  const distanceToB = distanceBetween(locationB, clickedLocation);
  const distanceToC = distanceBetween(locationC, clickedLocation);

  const minimumDistance = Math.min(distanceToA, distanceToB, distanceToC);

  if (minimumDistance > tolerance) return report;

  report.isFound = true;

  if (distanceToA === minimumDistance) report.name = 'A';
  if (distanceToB === minimumDistance) report.name = 'B';
  if (distanceToC === minimumDistance) report.name = 'C';

  return report;
};
