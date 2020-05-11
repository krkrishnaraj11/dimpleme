import { surveyConstants } from '../_constants';
import { surveyService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const surveyActions = {
    create,
    getAll,
    latestSurvey,
    getById,
    submitAnswer,
    update,
    _delete,
    updateStatus,
    downloadReport,
    verifyDecode
};

function updateStatus(id, active) {
    return dispatch => {
        dispatch(request(id, active))

        surveyService.updateStatus(id, active)
            .then(
                survey => {
                    dispatch(success());
                    dispatch(alertActions.success('Survey Updated Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Survey Update Failed"));
                }
            )
    }
    function request(survey) { return { type: surveyConstants.UPDATE_STATUS_REQUEST, survey } }
    function success(survey) { return { type: surveyConstants.UPDATE_STATUS_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.UPDATE_STATUS_FAILURE, error } }
}

function downloadReport(id) {
    return dispatch => {
        dispatch(request(id))

        surveyService.downloadReport(id)
            .then(
                survey => {
                    dispatch(success());
                    dispatch(alertActions.success('Survey Downloaded Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Survey Download Failed"));
                }
            )
    }
    function request(report) { return { type: surveyConstants.DOWNLOAD_REPORT_REQUEST, report } }
    function success(report) { return { type: surveyConstants.DOWNLOAD_REPORT_SUCCESS, report } }
    function failure(error) { return { type: surveyConstants.DOWNLOAD_REPORT_FAILURE, error } }
}

function submitAnswer(surveyCustId, answers){
    return dispatch => {
        dispatch(request(surveyCustId, answers));

        surveyService.submitAnswer(surveyCustId, answers)
            .then(
                survey => { 
                    dispatch(success());
                    dispatch(alertActions.success('Survey Submitted Successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Submit Failed"));
                }
            )
    };
    function request(survey) { return { type: surveyConstants.SUBMIT_ANSWER_REQUEST, survey } }
    function success(survey) { return { type: surveyConstants.SUBMIT_ANSWER_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.SUBMIT_ANSWER_FAILURE, error } }
}

function create(questions, surveyName, dcode) {
    return dispatch => {
        dispatch(request(questions, surveyName, dcode));

        surveyService.create(questions, surveyName, dcode)
            .then(
                survey => { 
                    dispatch(success());
                    dispatch(alertActions.success('Survey Created Successfully'));
                    history.push('/admin/surveys');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Survey Create Failed"));
                }
            );
    };

    function request(survey) { return { type: surveyConstants.CREATE_REQUEST, survey } }
    function success(survey) { return { type: surveyConstants.CREATE_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.CREATE_FAILURE, error } }
}

function update(id, question, surveyName, active, dcode) {
    return dispatch => {
        dispatch(request(id, question, surveyName, active, dcode))

        surveyService.update(id, question, surveyName, active, dcode)
            .then(
                survey => {
                    dispatch(success());
                    dispatch(alertActions.success('Survey Updated Successful'));
                    history.push('/admin/surveys');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error("Survey Update Failed"));
                }
            )
    }
    function request(survey) { return { type: surveyConstants.UPDATE_REQUEST, survey } }
    function success(survey) { return { type: surveyConstants.UPDATE_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.UPDATE_FAILURE, error } }
}

function getById(dcode) {
    return dispatch => {
        dispatch(request(dcode))

        surveyService.getById(dcode)
            .then(
                surveys => {
                    dispatch(success(surveys))
                    // dispatch(alertActions.success('Survey Fetch Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(survey) { return { type: surveyConstants.GETBYID_REQUEST, survey } }
    function success(survey) { return { type: surveyConstants.GETBYID_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.GETBYID_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        surveyService.getAll()
            .then(
                surveys => {
                    dispatch(success(surveys))
                    // dispatch(alertActions.success('Survey List Fetched Successful'));
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: surveyConstants.GETALL_REQUEST } }
    function success(surveys) { return { type: surveyConstants.GETALL_SUCCESS, surveys } }
    function failure(error) { return { type: surveyConstants.GETALL_FAILURE, error } }
}

function latestSurvey() {
    return dispatch => {
        dispatch(request());

        surveyService.getLatest()
            .then(
                latestsurvey => {
                    dispatch(success(latestsurvey))
                    // dispatch(alertActions.success('Survey List Fetched Successful'));
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: surveyConstants.GETLATEST_REQUEST } }
    function success(latestsurveys) { return { type: surveyConstants.GETLATEST_SUCCESS, latestsurveys } }
    function failure(error) { return { type: surveyConstants.GETLATEST_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        surveyService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                    dispatch(alertActions.success('Survey Deleted Successful'));
                    history.push('/admin/surveys');
                },
                error => {
                    dispatch(failure(id, error.toString()))
                    dispatch(alertActions.error("Survey Delete Failed"))
                }
            );
    };

    function request(id) { return { type: surveyConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: surveyConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: surveyConstants.DELETE_FAILURE, id, error } }
}

function verifyDecode(dcode) {
    return dispatch => {
        dispatch(request(dcode));

        surveyService.verifyDcode(dcode)
            .then(
                survey => {
                    dispatch(success(survey))
                    // dispatch(alertActions.success('Survey List Fetched Successful'));
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: surveyConstants.VERIFY_DCODE_REQUEST } }
    function success(survey) { return { type: surveyConstants.VERIFY_DCODE_SUCCESS, survey } }
    function failure(error) { return { type: surveyConstants.VERIFY_DCODE_FAILURE, error } }
}