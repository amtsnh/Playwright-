import { UiElement, UiTable, waitForPageLoad } from ",,/,,/wrapper-lib/playwright";
import customAssert from "../../wrappers-lib/assert";

export class CaseSummaryPage {
    // Locators
    locator_caseNotes = '.notes-card';
    locator_caseNotesHeader = '.notes-card thead[role="row"]';
    locator_addNoteButton = '.notes-card .ecp-ucl-items';
    locator_noNotesAddedText = '.notes-card tr>td';

    // Page Objects
    btnCaseNotes = new UiElement(this.locator_caseNotes, { description: "Case Notes" });
    btnAddNote = new UiElement(this.locator_addNoteButton, { description: "Add Note Button" });
    tableCaseNotesHeader = new UiTable(this.locator_caseNotesHeader, { description: "Case Notes Header" });
    txtNoNotesAdded = new UiElement(this.locator_noNotesAddedText, { description: "No Notes Added Text" });

    // Page Functions
    async isCaseNotesSectionExpanded() {
        const caseNotesCard = await this.btnCaseNotes.waitForElementState('visible');
        return caseNotesCard.hasClass('expanded');
    }

    async clickAddNoteButton() {
        await this.btnAddNote.click();
        await waitForPageLoad();
    }

    async verifyNoNotesAddedText() {
        const noNotesText = await this.txtNoNotesAdded.getText();
        customAssert.assertContains(noNotesText, "No notes have been added");
    }

    // Add more page functions as needed
}
