import { surveyConstants } from '../_constants';
import { surveyService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const surveyActions = {
    create,
    getAll,
    update,
    _delete
};

function create(question) {
    return dispatch => {
        dispatch(request(question));

        questionbankService.create(question)
            .then(
                question => { 
                    dispatch(success());
                    dispatch(alertActions.success('Question Created Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(question) { return { type: questionbankConstants.CREATE_REQUEST, question } }
    function success(question) { return { type: questionbankConstants.CREATE_SUCCESS, question } }
    function failure(error) { return { type: questionbankConstants.CREATE_FAILURE, error } }
}

function update(id, question) {
    return dispatch => {
        dispatch(request(id, question))

        questionbankService.update(id, question)
            .then(
                question => {
                    dispatch(success());
                    dispatch(alertActions.success('Question Updated Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(question) { return { type: questionbankConstants.UPDATE_REQUEST, question } }
    function success(question) { return { type: questionbankConstants.UPDATE_SUCCESS, question } }
    function failure(error) { return { type: questionbankConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        surveyService.getAll()
            .then(
                surveys => dispatch(success(surveys)),
                error => dispatch(failure(error.toString()))
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
        surveyActions.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                    history.push('/admin/survey');
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: surveyConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: surveyConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: surveyConstants.DELETE_FAILURE, id, error } }
}