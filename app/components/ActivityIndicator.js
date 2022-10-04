import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from "react-native";
import AnimatedLottieView from "lottie-react-native";

function ActivityIndicator({ visible = false , type="default"}) {

    // temp ios fix begin
    // @see https://github.com/lottie-react-native/lottie-react-native/issues/832
    const lottieRef = useRef(null);
    useEffect(() => {
        lottieRef.current?.reset();
        setTimeout(() => {
            lottieRef.current?.play();
        }, 100)

    }, []);
    // fix end

    if (!visible) {
        return null;
    }

    const style = type === 'default' ? styles.default : styles.overlay;

    return (
        <View style={style}>
            <AnimatedLottieView
                source={require('../assets/animations/loader.json')}
                autoPlay
                loop
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
