import * as yup from "yup";
import * as regex from './regex';


export const addEstablishmentSchema = {
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