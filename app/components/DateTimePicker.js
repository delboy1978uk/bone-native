import React from 'react';
import {StyleSheet, View} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

function DateTimePicker({ ...props } ) {

    return (
        <RNDateTimePicker {...props} />
    );
}

export default DateTimePicker;
