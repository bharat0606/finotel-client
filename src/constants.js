export const DATE_WITH_MONTH = "Do MMMM YYYY"
export const DATE_YMD = "YYYY-MM-DD"
export const BEDS = [1,2,3,4]

export const AMENITIES = [
    {value: '1', label: 'Free Wifi', icon:'fa fa-solid fa-wifi'},
    {value: '2', label: 'Air Conditioning', icon:'fa fa-tint'},
    {value: '3', label: 'Power backup', icon:'fa fa-solid fa-power-off'},
    {value: '4', label: 'Doctor On Call', icon:'fa fa-solid fa-user-md'},
]

export const DEFAULT_SELECTED_AMENITIES = ['1','2','3','4']

export const FIXED_FAIR = 10;
export const CABS_FAIR_DATA = [
    {id: 1,source: "Mansarovar", destionation: "Mahesh Nagar", distance: 10, fairPerKm: FIXED_FAIR },
    {id: 2,source: "Mansarovar", destionation: "Vaishali", distance: 30, fairPerKm: FIXED_FAIR},
    {id: 3,source: "Mansarovar", destionation: "Bagru", distance: 50, fairPerKm: FIXED_FAIR},
    {id: 4,source: "Sodala", destionation: "Bagru", distance: 100, fairPerKm: FIXED_FAIR},
    {id: 5,source: "Sodala", destionation: "Vaishali", distance: 100, fairPerKm: FIXED_FAIR},
    {id: 6,source: "Sodala", destionation: "Mahesh Nagar", distance: 20, fairPerKm: FIXED_FAIR},
]

export const DISTANCE_DISCOUNT = 25;


export const PICK_UP_LOCATIONS = ['Mansarovar','Sodala'];
export const DROP_LOCATIONS = ['Mahesh Nagar','Vaishali','Bagru'];
