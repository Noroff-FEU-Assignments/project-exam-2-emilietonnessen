import * as yup from "yup";
import * as regex from './regex';


export const addEstablishmentSchema = {
    name: yup.string()
        .required('Please enter the name of the establishment')
        .min(4, "Please enter more than 4 letters"),
    category: yup.string()
        .required('Please choose a category'),
    email: yup.string()
        .required('Please enter an email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone: yup.number()
        .typeError('Please enter a phone number')
        .min(10000000, "Please enter a valid phone number with 8 numbers")
        .max(99999999, "Please enter a valid phone number with 8 numbers"),
    coordinates: yup.string()
        .required('Please enter coordinates. Latitude, longitude')
        .matches(regex.coordinates, 'Please enter valid coordinates'),
    street: yup.string()
        .required('Please enter a street name')
        .min(4, "Please enter more than 4 letters"),
    city: yup.string()
        .required('Please enter a city')
        .min(2, "Please enter more than 2 letters"),
    zipCode: yup.string()
        .typeError('Please enter a zip code')
        .min(4, "Please enter a number between 1000 - 9999")
        .max(4, "Please enter a number between 1000 - 9999"),
    rating: yup.number()
        .typeError("Please enter a number")
        .min(1, "Please enter a value between 1 - 10")
        .max(10, "Please enter a value between 1 - 10"),
    stars: yup.number()
        .typeError("Please enter a number")
        .min(1, "Please enter a value between 1 - 5")
        .max(5, "Please enter a value between 1 - 5"),
    featured: yup.boolean()
        .typeError("Please choose on of the options"),
    lowestPrice: yup.number()
        .typeError("Please enter a number"),
    reviews: yup.number()
        .typeError("Please enter a number"),
    description: yup.string()
        .required('Please enter a description')
        .min(200, "Please enter more than 200 letters")
        .max(700, "Please have less than 700 letters"),
    amenities: yup.string()
        .required('Please enter different amenities')
        .min(100, "Please enter more than 100 letters")
        .max(300, "Please have less than 300 letters"),
};

export const editEstablishmentSchema = {
    establishment: 
        yup.string()
        .required('Please choose an establishment'),
    thumbnail: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    imageOne: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    imageTwo: yup.object().shape({
        url: yup.string().required("Please enter an image url"),
    }),
    name: 
        yup.string()
        .required('Please enter the name of the establishment'),
    category: 
        yup.string()
        .required('Please choose a category'),
    email:
        yup.string()
        .required('Please enter an email address')
        .matches(regex.email, 'Please enter a valid email address'),
    phone:
        yup.string()
        .required('Please enter a phone number')
        .min(8, "Please enter a valid phone number")
        .max(8, "Please enter a valid phone number"),
    coordinates:
        yup.string()
        .required('Please enter coordinates'),
    street:
        yup.string()
        .required('Please enter a street name'),
    city:
        yup.string()
        .required('Please enter a city'),
    zipCode:
        yup.string()
        .required('Please enter a zip code'),
    rating:
        yup.number()
        .required('Please enter the average user rating')
        .typeError("Please enter a number"),
    stars:
        yup.number()
        .required('Please enter the amount of stars')
        .typeError("Please enter a number"),
    featured:
        yup.boolean()
        .required('Please chose of the establishment should be featured')
        .typeError("Please enter a boolean value"),
    description:
        yup.string()
        .required('Please enter a description'),
    amenities:
        yup.string()
        .required('Please enter different amenities'),
};