import { VERSION, BETA, DATE, COMMIT, DEVMODE } from '../runtime-info.macro';

const RuntimeInfo = {
    version: VERSION,
    beta: !!BETA,
    buildDate: DATE,
    commit: COMMIT,
    devMode: DEVMODE
};

export { RuntimeInfo };
