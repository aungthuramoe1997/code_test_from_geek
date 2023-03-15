export const ENVIRONMENT = {
  local: 'local',
  development: 'development',
  production: 'production',
  testing: 'testing',
};

const URL = ENVIRONMENT.local;

const getURL = () => {
  let url = `${getBaseURL()}/api/v1/`;
  return url;
};

export const getBaseURL = () => {
  let url;
  switch (URL) {
    case ENVIRONMENT.local:
      url = 'http://localhost:3000';
      break;
    case ENVIRONMENT.development:
      url = 'http://localhost:3100';
      break;
    case ENVIRONMENT.development:
      url = 'http://localhost:3100';
      break;
    case ENVIRONMENT.testing:
      url = 'http://localhost:3100';
      break;
    default:
      url = 'http://localhost:3100';
  }
  return url;
};

const TEXT = {
  baseURL: getURL(),
  appName: 'Pokemon',
  noData: 'There is no data',
  profile: {},
  toolbarTitle: 'TCG Market Place',
  button: {
    login: 'Login',
    createAccount: 'Create Account',
    register: 'Register',
  },
  icon: {
    backArrow: 'arrow-left',
    calendar: 'tasks',
    search: 'search',
    done: 'check-circle',
    clear: 'times',
  },
  antDesign: {
    backArrow: 'leftcircle',
  },
  navigation: {
    login: 'Login',
    home: 'Home',
  },
};

export default TEXT;
