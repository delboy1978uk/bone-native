import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {Field, useFormikContext} from "formik";
import DateTimePicker from "../DateTimePicker";
import {StyleSheet} from "react-native";
import useStyle from "../../hooks/useStyle";

function FormDateTimePicker ({...props}) {

    const { values, setFieldValue } = useFormikContext();
    const style = useStyle();

    const styles = StyleSheet.create({
        picker: {
            flex: 1,
            width: '50%',
            backgroundColor: style.backgroundColor,
            borderRadius: 25,
            flexDirection: 'row',
            padding: 15,
            marginVertical: 10,
            marginHorizontal: 10,
        }
    });

    return <Field style={styles.picker} component={DateTimePicker}  value={values[props.name]} {...props}  onChange={(event, value) => {
        setFieldValue(props.name, new Date(value));
    }} />
}

export default FormDateTimePicker;
