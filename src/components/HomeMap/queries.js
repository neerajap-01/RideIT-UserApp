export const listCars = /* GraphQL */ `
    query ListCars(
        $filter: ModelCarFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
