import React from 'react';
import {Formik} from "formik";
import {View} from "react-native";

function Form({initialValues, onSubmit, validationSchema, children}) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => (
                <View>
                    {children}
                </View>
            )}
        </Formik>
    );
}

export default Form;
