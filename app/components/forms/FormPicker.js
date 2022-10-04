import React from 'react';
import {View} from "react-native";

import Picker from '../Picker'
import PickerItemComponent from '../PickerItemComponent'
import ErrorMessage from "./ErrorMessage";
import {useFormikContext} from "formik";

function FormPicker({items, name, PickerItemComponent, placeholder, width, numColumns, ...otherProps}) {
    const {setFieldValue, touched, values, errors} = useFormikContext();

    return (
        <View>
            <Picker
                items={items}
                numColumns={numColumns}
                onSelectItem={(value) => {
                    setFieldValue(name, value);
                }}
                PickerItemComponent={PickerItemComponent}
                placeholder={placeholder}
                selectedItem={values[name]} {...otherProps}
                width={width}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </View>
    );
}

export default FormPicker;
