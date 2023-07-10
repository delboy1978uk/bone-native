import React from 'react';
import {useFormikContext} from "formik";
import {StyleSheet, View} from "react-native";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import useStyle from "../../hooks/useStyle";

function FormField({name, width,  ...otherProps}) {
    const {setFieldTouched, handleChange, errors, values, touched} = useFormikContext();

    return (
        <View>
            <TextInput
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                value={values[name]}
                width={width}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </View>
    );
}

export default FormField;
