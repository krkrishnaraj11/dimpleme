const BASE_URL = 'https://dimpleme-apis.herokuapp.com'
const HOMEPAGE_URL = 'https://dimpleme.herokuapp.com/'
const APP_NAME = 'DimpleMe'

const apiCallURL = {
    SURVEY_URL: `${BASE_URL}/survey/`
}

export const urlConstants = {
    BASE_URL,
    APP_NAME,
    HOMEPAGE_URL,
    ...apiCallURL,
};
