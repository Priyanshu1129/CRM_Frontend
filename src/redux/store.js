import { configureStore } from '@reduxjs/toolkit';
import {
    clientReducer,
    classificationReducer,
    incorporationTypeReducer,
    relationshipStatusReducer
} from './slices/clientSlice';
import {
    archeTypeReducer,
    contactReducer,
    relationshipDegreeReducer
} from './slices/contactSlice';
import {
    industryReducer,
    subIndustryReducer,
    salesStageReducer,
    salesSubStageReducer,
    solutionReducer,
    subSolutionReducer,
    territoryReducer
} from './slices/configurationSlice';

const store = configureStore({
    reducer: {
        // auth: authReducer,
        client: clientReducer,
        classification: classificationReducer,
        incorporationType: incorporationTypeReducer,
        relationshipStatus: relationshipStatusReducer,
        industry: industryReducer,
        subIndustry: subIndustryReducer,
        salesStage: salesStageReducer,
        salesSubStage: salesSubStageReducer,
        solution: solutionReducer,
        subSolution: subSolutionReducer,
        territory: territoryReducer,
        archeType:archeTypeReducer,
        contact: contactReducer,
        relationshipDegree: relationshipDegreeReducer
    },
    devTools: true
})

export default store;