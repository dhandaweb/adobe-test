import { SORT } from '../types/types';

export const apiURL = "https://randomuser.me/api/?results=20";
export const tableColumnInitialValues = [
    {
        label: "City",
        sortBy: SORT.UNSORTED,
        selector: 'city',
        type: "string"
    },
    {
        label: "State",
        sortBy: SORT.UNSORTED,
        selector: 'state',
        type: "string"
    },
    {
        label: "Country",
        sortBy: SORT.UNSORTED,
        selector: 'country',
        type: "string"
    },
    {
        label: "Postcode",
        sortBy: SORT.UNSORTED,
        selector: 'postcode',
        type: "string"
    },
    {
        label: "Number",
        sortBy: SORT.UNSORTED,
        selector: 'street',
        subSelector: 'number',
        type: "number"
    },
    {
        label: "Name",
        sortBy: SORT.UNSORTED,
        selector: 'street',
        subSelector: 'name',
        type: "string"
    },
    {
        label: "Latitude",
        sortBy: SORT.UNSORTED,
        selector: 'coordinates',
        subSelector: 'latitude',
        type: "number"
    },
    {
        label: "Longitude",
        sortBy: SORT.UNSORTED,
        selector: 'coordinates',
        subSelector: 'longitude',
        type: "number"
    }
];