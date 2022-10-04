import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from '../components/CategoryPickerItem'
import {
    Form,
    FormField,
    FormImagePicker,
    FormPicker,
    SubmitButton
} from '../components/forms'
import Screen from '../components/Screen'
import Text from '../components/Text'
import listingsApi from "../api/listings";
import useApi from '../hooks/useApi'
import UploadScreen from '../screens/UploadScreen'
import useLocation from '../hooks/useLocation'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label('Title'),
    price: Yup.number().required().min(0.01).max(10000).test(
        "maxDigitsAfterDecimal",
        "2 digits after decimal or less",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    ).label('Price'),
    category: Yup.object().required().label('Category'),
    description: Yup.string().required().min(10).label('Description'),
    images: Yup.array().required().min(1, 'Please select at least one image')
});

const categories = [
    { label: "Books", value: 1, backgroundColor: 'pink', icon: 'book-open-page-variant'  },
    { label: "Cameras", value: 2, backgroundColor: 'turquoise', icon: 'camera'  },
    { label: "Cars", value: 3, backgroundColor: 'dodgerblue', icon: 'car'  },
    { label: "Clothing", value: 4, backgroundColor: 'darkblue',  icon: 'shoe-heel'},
    { label: "Electrical", value: 5, backgroundColor: 'red', icon: 'laptop'  },
    { label: "Furniture", value: 6, backgroundColor: 'tomato', icon: 'lamp' },
    { label: "Games", value: 7, backgroundColor: 'darkturquoise', icon: 'cards'  },
    { label: "Movies", value: 8, backgroundColor: 'purple', icon: 'movie-open-outline'  },
    { label: "Music", value: 9, backgroundColor: 'orange', icon: 'headphones'  },
    { label: "Sports", value: 10, backgroundColor: 'green', icon: 'basketball'  },
    { label: "Tools", value: 11, backgroundColor: 'lightblue', icon: 'wrench'  },
    { label: "Other", value: 12, backgroundColor: 'green', icon: 'apps'  },
];


function ListingEditScreen(props) {
    const location = useLocation();
    const [progressVisible, setProgressVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (listing, { resetForm }) => {
        setProgress(0);
        setProgressVisible(true);
        const result =  await listingsApi.postListings(
            {...listing, location},
            progress => setProgress(progress)
        );

        if (!result.ok) {
            setProgressVisible(false);
            alert('Could not save the listing.');
            return;
        }

        resetForm();
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen onDone={() => setProgressVisible(false)} progress={progress} visible={progressVisible}/>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 140}
            >
                <Form
                    initialValues={{
                        title: '',
                        price: '',
                        category: '',
                        description: '',
                        images: []
                }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormImagePicker
                        name={'images'}
                    />
                    <FormField
                        name="title"
                        placeholder="Title"
                        maxLength={150}
                    />
                    <FormField
                        name="price"
                        placeholder="Price"
                        keyboardType="decimal-pad"
                        maxLength={8}
                        width={120}
                    />
                    <FormPicker
                        items={categories}
                        name="category"
                        numColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        placeholder="Category"
                        width={300}
                    />
                    <FormField
                        name="description"
                        maxLength={255}
                        multiline
                        numberOfLines={3}
                        placeholder="Description"
                    />
                    <SubmitButton color="primary" title="Add Listing" />
                </Form>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default ListingEditScreen;
