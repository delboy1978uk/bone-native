import React from 'react';

import Button from "../Button";
import {useFormikContext} from "formik";

function SubmitButton({title, ...otherProps}) {
    const {handleSubmit} = useFormikContext();

    return (
        <Button color="primary" title={title} onPress={handleSubmit} {...otherProps} />
    );
}

export default SubmitButton;
