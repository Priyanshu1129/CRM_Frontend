import { isEqual } from 'lodash';

const sortArray = (arr) => arr.slice().sort();

const areValuesEqual = (val1, val2) => {
    if (Array.isArray(val1) && Array.isArray(val2)) {
        return isEqual(sortArray(val1), sortArray(val2));
    }
    return isEqual(val1, val2);
};

export const getChangedValues = (initialValues, currentValues) => {
    return Object.keys(currentValues).reduce((acc, key) => {
        if (!areValuesEqual(initialValues.current[key], currentValues[key])) {
            acc[key] = currentValues[key];
        }
        return acc;
    }, {});
};
