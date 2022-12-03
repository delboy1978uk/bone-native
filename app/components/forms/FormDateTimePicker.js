import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {Field} from "formik";

function FormDateTimePicker ({ ...props }) {
    return <Field component={RNDateTimePicker} value={new Date} {...props} />
}

export default FormDateTimePicker;
