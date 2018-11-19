export const sampleBbox = () => ({
  getSouthWest: () => ({
    lng: () => 1,
    lat: () => 2
  }),
  getNorthEast: () => ({
    lng: (() => 3),
    lat: (() => 4)
  })
});
