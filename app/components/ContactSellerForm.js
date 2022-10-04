import React from "react";
import {Keyboard} from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import {Form, FormField, SubmitButton} from "./forms";
import messagesApi from "../api/messages";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(2).label('Message seller')
});

function ContactSellerForm({listing}) {
    const handleSubmit = async ({message}, { resetForm }) => {
        Keyboard.dismiss();
        const result = await messagesApi.send(message, listing.id);

        if (!result.ok) {
            console.log('Error', result);
            return Alert.alert('Error', 'Could not send message to seller.');
        }

        resetForm();

        Notifications.scheduleNotificationAsync({
            content: {
                title: "SELL that SHIT 😎",
                body: message,
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    return (<Form
        initialValues={{
            message: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
    >
        <FormField
            name="message"
            maxLength={255}
            placeholder="Message"
        />
        <SubmitButton color="primary" title="Contact Seller" />
    </Form>)
}

export default ContactSellerForm;
