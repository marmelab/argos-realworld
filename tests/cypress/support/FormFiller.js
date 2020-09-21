export default formClass => ({
    elems: {
        inputs: `.ra-input`,
        input: name => `.${formClass} input[name='${name}']`,
        select: name => `label[for="${name}"]`,
        textarea: name => `.${formClass} textarea[name='${name}']`,
        selectOption: 'ul[role="listbox"]',
        selectOverlay: 'div#menu-',
    },

    setValues(values, clearPreviousValue = true) {
        values.forEach(({ type, name, value, ...options }) => {
            switch (type) {
                case 'input': {
                    this.setInputValue(name, value, clearPreviousValue, options);
                    break;
                }
                case 'boolean': {
                    this.toggleValue(name);
                    break;
                }
                case 'textarea': {
                    this.setTextAreaValue(name, value, clearPreviousValue);
                    break;
                }
                case 'select': {
                    this.setSelectValue(name, value);
                    break;
                }
                case 'multi_select': {
                    this.setSelect2Values(name, value);
                    break;
                }
                case 'multiemail': {
                    value.forEach((email, index) => {
                        cy.get('button[title="Add"]').click();
                        cy.get(`input[type="email"][data-id="${index}"]`).type(email);
                    });
                    break;
                }
                default:
                    break;
            }
        });
    },

    setInputValue(name, value, clearPreviousValue = true, { inputSelect } = {}) {
        if (clearPreviousValue) {
            cy.get(this.elems.input(name)).clear();
        }
        cy.get(this.elems.input(name)).type(value);
        if (inputSelect) {
            cy.get('div[role="listbox"]')
                .contains(value)
                .click({ force: true });
        }
    },

    toggleValue(name) {
        cy.get(this.elems.input(name)).click();
    },

    setTextAreaValue(name, value, clearPreviousValue = true) {
        if (clearPreviousValue) {
            cy.get(this.elems.textarea(name))
                .focus()
                .clear();
        }
        cy.get(this.elems.textarea(name)).type(value);
    },

    setSelectValue(name, value) {
        cy.get(this.elems.select(name))
            .siblings()
            .find('[aria-haspopup="listbox"]')
            .click();

        cy.get(this.elems.selectOption)
            .contains(value)
            .click();
    },

    setSelect2Values(name, values) {
        cy.get(this.elems.select(name))
            .siblings()
            .find('[aria-haspopup="listbox"]')
            .click();

        values.forEach(value =>
            cy
                .get(this.elems.selectOption)
                .contains(value)
                .click()
        );
        cy.get(this.elems.selectOverlay)
            .find('[aria-hidden="true"]')
            .click({ force: true });
    },

    triggerUndo() {
        cy.get('[role="alert"]').contains('Undo');
        cy.get('#react-admin-title').click({ force: true });
    },

    contains(text) {
        return cy.get(this.elements.body).contains(text);
    },

    get(element) {
        return cy.get(`${this.elements.body} ${element}`);
    },
});
