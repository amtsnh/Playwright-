import { Page, Locator } from 'playwright';

export class CaseNotesPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCaseDetailsPage() {
        // Logic to navigate to the case details page
    }

    async isCaseNotesSectionExpanded() {
        // Logic to check if the case notes section is expanded
        const caseNotesCard = await this.page.waitForSelector('.notes-card');
        return caseNotesCard.hasClass('expanded');
    }

    async clickExpandButton() {
        // Logic to click on the expand button of the case notes section
        await this.page.click('.notes-card .expand-button');
    }

    async isRequirementAndStatusColumnsDisplayed() {
        // Logic to check if "requirement" and "status" columns are displayed
        const headerRow = await this.page.waitForSelector('.notes-card thead[role="row"]');
        const headerColumns = await headerRow.$$('th');
        const headerTexts = await Promise.all(headerColumns.map(column => column.innerText()));
        return !headerTexts.includes('requirement') && !headerTexts.includes('status');
    }

    async addNewNote() {
        // Logic to click on the "Add Note" button and add a new note
        await this.page.click('.notes-card .add-note-button');
        await this.page.waitForSelector('.notes-popup');
        // Select value from dropdown, click outside, and confirm
        // Logic for selecting value from dropdown and confirming
    }

    async isNewColumnForDeleteIconVisible() {
        // Logic to check if the new column for delete icon is visible
        const dateTimeColumnValue = await this.page.textContent('.notes-card .notes-table tr:nth-child(1) td:nth-child(2)');
        const isDeleteIconPresent = await this.page.isVisible('.notes-card .notes-table .delete-icon');
        return dateTimeColumnValue === 'Incomplete' && isDeleteIconPresent;
    }

    async areDateAndNotesTypeAndUserColumnsPresent() {
        // Logic to check if "date/time", "notes type", and "user" columns are present
        const tableHeaders = await this.page.$$eval('.notes-card .notes-table th', (elements: Element[]) => elements.map(element => element.textContent));
        return tableHeaders.includes('date/time') && tableHeaders.includes('notes type') && tableHeaders.includes('user');
    }
}
