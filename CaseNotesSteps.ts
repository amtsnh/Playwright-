import { Given, When, Then } from '@cucumber/cucumber';
import { CaseNotesPage } from './CaseNotesPage';

const page = new CaseNotesPage(page); // Assuming you have initialized the page object elsewhere

Given('I am on the case details page', async () => {
    await page.navigateToCaseDetailsPage();
});

When('I check the case notes section', async () => {
    // No action needed, as the page object methods will handle this
});

Then('I should see the case notes card expanded', async () => {
    const isExpanded = await page.isCaseNotesSectionExpanded();
    // Add assertion to check if the case notes section is expanded
});

Then('"requirement" and "status" columns should not be displayed', async () => {
    const areColumnsDisplayed = await page.isRequirementAndStatusColumnsDisplayed();
    // Add assertion to check if "requirement" and "status" columns are not displayed
});

When('I add a new note', async () => {
    await page.addNewNote();
});

Then('a new column for delete icon should appear only when the "Date/Time" column value is "incomplete"', async () => {
    const isNewColumnVisible = await page.isNewColumnForDeleteIconVisible();
    // Add assertion to check if the new column for delete icon appears only when "Date/Time" column value is "incomplete"
});

Then('"date/time", "notes type", and "user" columns should be present in the table', async () => {
    const areColumnsPresent = await page.areDateAndNotesTypeAndUserColumnsPresent();
    // Add assertion to check if "date/time", "notes type", and "user" columns are present in the table
});
