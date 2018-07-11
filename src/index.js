//import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import {
    h,
    diff,
    patch
} from 'virtual-dom'
import createElement from 'virtual-dom/create-element';


const node = document.querySelector('#app');
const initModel = 0;
const {
    div,
    button
} = hh(h);

const MSGS = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
};

const elements = {
    BTN_PLUS: 'btn__plus'
}

//pure function

//const view = (dispatch, model) => {
const view = (model) => {
    return div([
        div({
            className: 'mv2'
        }, `Count: ${model}`),
        div({
            className: 'btn'
        }, [
            button({
                className: 'btn__moins pv1 ph2 mr2',
                // onclick: () => dispatch(MSGS.SUBTRACT)
            }, '-'),
            button({

                className: 'btn__plus pv1 ph2',
                // onclick: () => dispatch(MSGS.ADD)
            }, '+')
        ])
    ]);
}

const update = (msg, model) => {
    switch (msg) {
        case MSGS.ADD:
            return model + 1;
        case MSGS.SUBTRACT:
            return model - 1;
        default:
            return model;
    }
}

//impure
const app = (initModel, update, view, node) => {
    let model = initModel;
    //let currentView = view(dispatch, model);
    let currentView = view(model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        model = update(msg, model);
        //const updatedView = view(dispatch, model);
        const updatedView = view(model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        //node.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }

    document.querySelector('.btn').addEventListener('click', e => {
        const msg = (e.target.className.indexOf(elements.BTN_PLUS) !== -1) ? MSGS.ADD : MSGS.SUBTRACT;
        dispatch(msg);
    })
}

app(initModel, update, view, node);