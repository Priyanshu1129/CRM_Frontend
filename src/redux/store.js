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
    territoryReducer,
    mastersConfigReducer
} from './slices/configurationSlice';
import { staffReducer } from './slices/staffSlice';
import { userReducer } from './slices/userSlice';
import { teamReducer } from './slices/teamSlice';
import { opportunityReducer } from './slices/opportunitySlice';
import { businessDevelopmentReducer } from './slices/businessDevelopmentSlice';
import { tenderReducer, stageReducer } from './slices/tenderSlice';
import { registrationReducer, registrationStatusReducer } from './slices/registrationSlice';
import { authReducer } from './slices/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        client: clientReducer,
        classification: classificationReducer,
        incorporationType: incorporationTypeReducer,
        relationshipStatus: relationshipStatusReducer,
        mastersConfig: mastersConfigReducer,
        industry: industryReducer,
        subIndustry: subIndustryReducer,
        salesStage: salesStageReducer,
        salesSubStage: salesSubStageReducer,
        solution: solutionReducer,
        subSolution: subSolutionReducer,
        territory: territoryReducer,
        contact: contactReducer,
        archeType: archeTypeReducer,
        relationshipDegree: relationshipDegreeReducer,
        staff: staffReducer,
        team: teamReducer,
        opportunity: opportunityReducer,
        businessDevelopment: businessDevelopmentReducer,
        tender: tenderReducer,
        stage: stageReducer,
        registration: registrationReducer,
        registrationStatus: registrationStatusReducer
    },
    devTools: true
})

export default store;