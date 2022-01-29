import React, { useState } from "react";
import { View } from "react-native";
import RouteMap from "../../components/RouteMap/routemap";
import RideSelection from "../../components/RideSelection/rideSelection";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createOrder } from "../../graphql/mutations";

const SearchResult = props => {
    const typeState = useState(null);

    const route = useRoute();
    const navigation = useNavigation();

    const { originPlace, destinationPlace } = route.params;

    const onSubmit = async () => {
        const [type] = typeState;
        if (!type) {
            return;
        }

        // submit to server
        try {
            const userInfo = await Auth.currentAuthenticatedUser()
            const date = new Date();
            const input = {
                createdAt: date.toISOString(),
                type,
                originLatitude: originPlace.details.geometry.location.lat,
                originLongitude: originPlace.details.geometry.location.lng,

                destLatitude: destinationPlace.details.geometry.location.lat,
                destLongitude: destinationPlace.details.geometry.location.lng,

                userId: userInfo.attributes.sub,
                carId: "1",
                status: "NEW",
            }

            const response = await API.graphql(
                graphqlOperation(
                    createOrder, {
                        input: input
                    },
                )
            )

            navigation.navigate("OrderPage", { id: response.data.createOrder.id })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[{ flex: 2 }]}>
                <RouteMap origin={originPlace} destination={destinationPlace} />
            </View>
            <View>
                <RideSelection typeState={typeState} onSubmit={onSubmit} />
            </View>
        </View>
    );
};

export default SearchResult;
