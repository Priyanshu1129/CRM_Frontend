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
    mastersConfigReducer,
    currencyReducer,
    configurationReducer
} from './slices/configurationSlice';
import { pipeViewReducer, funnelViewReducer } from './slices/dashboardSlice';
import { userReducer } from './slices/userSlice';
import { teamReducer } from './slices/teamSlice';
import { opportunityReducer } from './slices/opportunitySlice';
import { businessDevelopmentReducer } from './slices/businessDevelopmentSlice';
import { tenderReducer, stageReducer } from './slices/tenderSlice';
import { registrationReducer, registrationStatusReducer } from './slices/registrationSlice';
import { roleReducer } from './slices/roleAndPermissionSlice';
import { authReducer } from './slices/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        pipeView: pipeViewReducer,
        funnelView: funnelViewReducer,
        client: clientReducer,
        classification: classificationReducer,
        incorporationType: incorporationTypeReducer,
        relationshipStatus: relationshipStatusReducer,
        mastersConfig: mastersConfigReducer,
        configuration: configurationReducer,
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
        user: userReducer,
        team: teamReducer,
        role: roleReducer,
        opportunity: opportunityReducer,
        businessDevelopment: businessDevelopmentReducer,
        tender: tenderReducer,
        stage: stageReducer,
        registration: registrationReducer,
        registrationStatus: registrationStatusReducer,
        currency: currencyReducer
    }
})

export default store;