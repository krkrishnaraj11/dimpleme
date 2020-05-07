
import config from 'config';
import { authHeader } from '../_helpers';
import { surveyActions } from '../_actions';

export const surveyService = {
    create,
    getAll,
    update,
    submitAnswer,
    getById,
    verifyDcode,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/survey/list`, requestOptions).then(handleResponse);
}

function getById(dcode) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({dcode})
    };

    return fetch(`${config.apiUrl}/survey/read_dcode`, requestOptions).then(handleResponse);
}

function submitAnswer(surveyCustId, answers) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({surveyCustId, answers })
    };

    return fetch(`${config.apiUrl}/answer/submit`, requestOptions).then(handleResponse);
}

function create(questions, surveyName, dcode) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({questions, surveyName, dcode})
    };

    return fetch(`${config.apiUrl}/survey/create`, requestOptions).then(handleResponse);
}

function update(id, questions, surveyName, active, dcode) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({surveyName, questions, active, dcode})
    };

    console.log(requestOptions)
    return fetch(`${config.apiUrl}/survey/update/${id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ surveyCustId: id })
    };
    
    return fetch(`${config.apiUrl}/survey/delete`, requestOptions).then(handleResponse);
}

function verifyDcode(dcode) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    console.log(requestOptions)
    return fetch(`${config.apiUrl}/survey/exists/${dcode}`, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}