import { surveyConstants } from '../_constants';
import { surveyService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const surveyActions = {
    create,
    getAll,
    getById,
    update,
    _delete
};

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

function update(id, question, surveyName, active) {
    return dispatch => {
        dispatch(request(id, question, surveyName, active))

        surveyService.update(id, question, surveyName, active)
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