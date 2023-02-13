/**
 * Creates a tree view from a <select multiple> element.
 * @param {string | HTMLSelectElement} select     The <select> element.
 * @param {ListBox2TreeView.Options} [options={}] Options.
 * @return {boolean} true if successful, false otherwise.
 */
function ListBox2TreeView(select, options) {
    if (!options) {
        options = {};
    }

    /**
     * @type {HTMLSelectElement}
     */
    let _select = ResolveElement(select);
    if (_select === null) {
        console.error('select === null!');
        return false;
    }

    if (!_select.multiple) {
        console.error('<select> element does not support multiple selections!');
        return false;
    }

    if ('convertedToTreeView' in _select.dataset) {
        console.info('<select> element already converted');
        return true;
    }

    /**
     * @type {HTMLElement}
     */
    let _targetContainer = null;
    if (options.createContainerCallback) {
        _targetContainer = options.createContainerCallback();
    } else {
        _targetContainer = document.createElement('div');
    }

    /**
     * @type {(evt: Event) => boolean}
     */
    let dispatchChangeEvent;
    if (options.dispatchChangeEvents === false) {
        dispatchChangeEvent = function (_) { return true; }
    } else {
        dispatchChangeEvent = function (evt) {
            evt = new Event(evt.type, { cancelable: evt.cancelable, bubbles: evt.bubbles, composed: evt.composed });
            return _select.dispatchEvent(evt);
        }
    }

    for (let i = 0; i < _select.options.length; i++) {
        let option = _select.options[i];

        let cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = option.selected;
        cb.disabled = option.disabled;
        if (options.createCheckboxIDCallback) {
            cb.id = options.createCheckboxIDCallback(_targetContainer, _select, option, i);
        } else {
            cb.id = (_select.id || _targetContainer.id || 'tv') + '_cb' + i;
        }

        cb.onchange = function (evt) {
            if (dispatchChangeEvent(evt)) {
                option.selected = cb.checked;
            } else if (evt.cancelable) {
                evt.preventDefault();
            }
        }

        let lbl = document.createElement('label');
        lbl.textContent = option.text;
        lbl.htmlFor = cb.id;

        if (options.initCheckboxCallback) {
            options.initCheckboxCallback(_targetContainer, _select, option, i, cb, lbl);
        }

        _targetContainer.appendChild(cb);
        _targetContainer.appendChild(lbl);

        if (i < _select.options.length - 1) {
            _targetContainer.appendChild(document.createElement('br'));
        }
    }

    _select.insertAdjacentElement(options.insertPosition === 'before' ? 'beforebegin' : 'afterend', _targetContainer);

    _select.hidden = true;
    _select.dataset.convertedToTreeView = 'true';
    return true;
}

/**
 * Options for {@link ListBox2TreeView}.
 * @typedef {object} ListBox2TreeView.Options
 * @prop {ListBox2TreeView.CreateContainerCallback} [createContainerCallback=undefined]
 * Callback for creating a container for the generated elements.
 * @prop {'before' | 'after'} [insertPosition='after']                                    
 * Where to insert the generated container.
 * @prop {ListBox2TreeView.CreateCheckboxIDCallback} [createCheckboxIDCallback=undefined]
 * Callback for generating checkbox IDs.
 * @prop {ListBox2TreeView.InitCheckboxCallback} [initCheckboxCallback=undefined]
 * Callback for initializing checkboxes.
 * @prop {boolean} [dispatchChangeEvents=true]
 * Whether to dispatch onchange events to the original <select> element or not.
 */

/**
 * Creates a container for the generated tree view elements.
 * @callback ListBox2TreeView.CreateContainerCallback
 * @return {HTMLElement} The target container.
 */

/**
 * Generates an ID for the checkbox element that is linked to the specified option.
 * @callback ListBox2TreeView.CreateCheckboxIDCallback
 * @param {HTMLElement} targetContainer The target container
 * @param {HTMLSelectElement} select    The <select> element. 
 * @param {HTMLOptionElement} option    The <option> element.
 * @param {number} optionIndex          The index of the <option> element.
 * @returns {string}                    The ID of the checkbox element.
 */

/**
 * Initializes a checkbox element and its corresponding label element.
 * @callback ListBox2TreeView.InitCheckboxCallback
 * @param {HTMLElement} targetContainer The target container
 * @param {HTMLSelectElement} select    The <select> element. 
 * @param {HTMLOptionElement} option    The <option> element.
 * @param {number} optionIndex          The index of the <option> element.
 * @param {HTMLInputElement} checkbox   The <input type="checkbox"> element.
 * @param {HTMLLabelElement} label      The <label> element.
 * @return {void}
 */

/**
 * Resolves an element.
 * @param {undefined | string | HTMLElement} elem An element, or its ID.
 * @returns {?HTMLElement} The resolved element, or null if it couldn't be found.
 */
function ResolveElement(elem) {
    if (elem === undefined) {
        return null;
    } else if (typeof elem === 'string') {
        let e = document.getElementById(elem);
        if (e == null) {
            console.error("Failed to find element with ID '%s'!", elem);
        }
        return e;
    } else {
        return elem;
    }
}
