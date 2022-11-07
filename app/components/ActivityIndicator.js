import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from "react-native";

import Animation from "./Animation";

function ActivityIndicator({ visible = false , type="default"}) {

    if (!visible) {
        return null;
    }

    const style = type === 'default' ? styles.default : styles.overlay;

    return (
        <View style={style}>
            <Animation
                source={require('../assets/animations/loader.json')}
                autoPlay={true}
                loop={true}
                style={{height: 100, width: 100, opacity: 1}}
                speed={1.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        opacity: 0.8
    },
    default: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ActivityIndicator;
