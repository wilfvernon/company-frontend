const defaultState={
    all: [],
    tanks: [],
    dps: [],
    healers: []
}

const jobFilter = (jobs, type) =>{
    return jobs.filter(job=>job.role===type)
}

const jobReducer= (prevState=defaultState, action) => {
    switch (action.type) {
        case "JOB_ACTION":
            return ({
                defaultState, 
                all: action.payload, 
                tanks: jobFilter(action.payload, "tank"), 
                healers: jobFilter(action.payload, "healer"), 
                dps: jobFilter(action.payload, "dps")
            })
        default:
            return prevState
    }
}

export default jobReducer