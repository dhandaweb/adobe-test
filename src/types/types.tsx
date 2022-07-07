export enum SORT {
    UNSORTED = "UNSORTED",
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}


export interface IHEADER {
    label: string,
    sortBy: SORT,
    selector: string,
    subSelector?: string,
    type: string
}
export interface ICOORDINATES {
    latitude: string,
    longitude: string
}

export interface ISTREET {
    name: string,
    number: number
}

export interface ITIMEZONE {
    decription: string,
    offset: string
}

export interface ITABLEROW {
    city: string,
    coordinates: ICOORDINATES,
    country: string
    postcode: number
    state: string
    street: ISTREET
    timezone: ITIMEZONE
} 