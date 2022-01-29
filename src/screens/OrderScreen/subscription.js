export const onOrderUpdated = /* GraphQL */ `
  subscription OnOrderUpdated($id: ID!) {
    onOrderUpdated(id: $id) {
      id
      type
      originLatitude
      originLongitude
      destLatitude
      destLongitude
      status
      userId
      user {
        id
        username
      }
      carId
      createdAt
      updatedAt
    }
  }
`;
export const onCarUpdated = /* GraphQL */ `
  subscription OnCarUpdated($id: ID!) {
    onCarUpdated(id: $id) {
      id
      type
      latitude
      longitude
      heading
      isActive
      userId
      createdAt
      updatedAt
    }
  }
`;
