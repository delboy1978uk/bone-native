import React from 'react';
import {View} from "react-native";
import {useFormikContext} from "formik";

import ErrorMessage from './ErrorMessage'
import ImageInputList from '../ImageInputList'

function FormImagePicker({ name }) {
    const {setFieldValue, touched, values, errors} = useFormikContext();
    const imageUris = values[name]
    const handleAdd = (uri) => {
        setFieldValue(name, [...imageUris, uri])
    };
    const handleRemove = (uri) => {
        setFieldValue(name, imageUris.filter(imageUri => imageUri !== uri))
    };

    return (
        <View>
            <ImageInputList
                imageUris={imageUris}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </View>
    );
}

export default FormImagePicker;
