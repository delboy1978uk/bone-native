import React, {useState} from 'react';
import {StyleSheet} from "react-native";

function TestZone(props) {
    return (
        <View style={styles.container}>
            <Text>Ahoy!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TestZone;
