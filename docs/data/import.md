---
id: import
title: Importing a Tracking Plan
---

Most companies already have a tracking plan in one of their existing tools or manage their tracking plan in an Excel sheet or similar. To get the most out of Iteratively as quickly as possible, it can be helpful to import what you already have into Iteratively so you can use the collaboration and versioning tools when updating and expanding your tracking plan.

Iteratively supports importing CSVs of the following formats:
- Mixpanel Export
- Amplitude Export
- Iteratively Format

## Importing

1. Click on the Import icon at the top right corner of your Iteratively application:

2. In the Import utility, upload a file one of the supported formats:

<img src="/img/import_modal.png" alt="Import Modal" style={{ width: '400px' }} />

3. You will be navigated to the branch that your changes have been imported into. From here, you can modify the imported tracking plan before merging it into your existing Iteratively Tracking Plan.

### Limitations

Currently, we support importing up to 500 events. If you have more than 500 events, please contact [Amplitude Support](https://support.amplitude.com/) and we'll help you get started with Iteratively.

## Iteratively Format

If you don't use Mixpanel or Amplitude to manage your tracking plan, you can format your data into a CSV with the following columns for importing into Iteratively.

:::note Tip
You can download a sample Iteratively-format tracking plan CSV from <a href='https://docs.google.com/spreadsheets/d/1j82L4xffeJfb8t7YExBRbqfCQJRF_YQWfsLAQia9eyM/edit#gid=0' target='_blank' download>here</a>.
:::

- `Is Template` (an optional column, defaults to `FALSE`)
- `Event` (either the Event or Template name)
- `Event Description` (either the Event or Template description)
- `Event Source` (only relevant for Events, not Templates — e.g. web, ios, backend)
- `Template Name` (Template Name and Property Name are mutually exclusive, must be one per line.)
- `Property Name`
- `Property Description`
- `Property Type` (can be one of: `string`, `number`, `boolean`, `array`, `object`, `enum`)
- `Property Required` (can be one of: `FALSE`, `TRUE`)

Once you receive the CSV file by email, you can upload it following the instructions above to import into Iteratively.

## Exporting from Mixpanel and Amplitude

### Mixpanel

1. To export from Mixpanel, log into your account and navigate to the "Lexicon" as shown:

<img src="/img/mixpanel_lexicon.png" alt="Mixpanel Lexicon" style={{ width: '300px' }} />

2. On the lexicon page, click "Export" in the top right

<img
  src="/img/mixpanel_export_button.png"
  alt="Mixpanel Export Button"
  style={{ width: '400px' }}
/>

:::note Hint
Don't see the Export button? Make sure your account's role is either "Project Owner" or "Admin"
:::

3. Ensure you select "Events & Properties", before clicking "Send CSV"

<img
  src="/img/mixpanel_export_modal.png"
  alt="Mixpanel Export Modal"
  style={{ width: '400px' }}
/>

### Amplitude

1. To export from Amplitude, log in to your account and navigate to the "Govern" tab

<img src="/img/amplitude_govern.png" alt="Amplitude Govern" style={{ width: '400px' }} />

2. On the Govern page, click the "Download" button in the top right

<img
  src="/img/amplitude_download_button.png"
  alt="Amplitude Download Button"
  style={{ width: '400px' }}
/>

3. Ensure "Schema of all events and their event properties" is selected, and click "Download"

<img
  src="/img/amplitude_download_modal.png"
  alt="Amplitude Download Modal"
  style={{ width: '400px' }}
/>

You can now upload the downloaded CSV to iteratively, following the instructions above.
