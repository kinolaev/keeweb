import { connect } from 'react-redux';
import { getOpenRows } from 'selectors/open';
import { getLastFiles } from 'selectors/files';
import Open from 'components/Open';
import { setView } from 'store/ui/set-view';
import { toggleSecondRow } from 'store/ui/open/toggle-second-row';
import saveLastFiles from 'logic/files/save-last-files';
import loadFileContent from 'logic/files/load-file-content';
import { removeLastFile } from 'store/files/remove-last-file';

const mapStateToProps = state => {
    return {
        secondRowVisible: state.uiOpen.secondRowVisible,
        file: state.uiOpen.file,
        locale: state.locale,
        canOpen: state.settings.canOpen,
        canRemoveLatest: state.settings.canRemoveLatest,
        canOpenKeyFromDropbox: false,
        lastFiles: getLastFiles(state),
        rows: getOpenRows(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick(e) {
            switch (e.button) {
                case 'more':
                    return dispatch(toggleSecondRow());
                case 'settings':
                    return dispatch(setView('settings'));
            }
        },
        onFileClick() {},
        onFileInputChange(e) {
            switch (e.button) {
                case 'open':
                    dispatch(loadFileContent(e.file));
                    break;
            }
        },
        onFileDeleteClick({ id }) {
            // TODO: question about in-memory files
            dispatch(removeLastFile(id));
            dispatch(saveLastFiles());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);
