# Olivero - Proof of Concept HTML

## Overview
This repository contains prototyping work for the new Drupal new front-end theme called Olivero. The new design that we're proposing in Olivero includes new components/features that are different from its predecessor. We'd like to utilize this static HTML page as a way to validate the new features and help answer potential UI/UX issues that might arise during the design process.

The following are key items that we're examining:
- Investigate the use of the header on scroll interaction on mobile and tablet devices.
- Validate the use of the CSS grid in legacy browsers such as Internet Explorer 11 and identify if progressive enhancement features will need to be accounted for.
- Verify that the markup is semantic and meets the accessibility requirements.

This proof of concept is still a work-in-progress and not all of the elements meet accessibility guidelines. Our plan is to give a full sign-off from the Drupal accessibility team, which will hopefully alleviate last-minute time-crunches when the patch is submitted to Drupal core.

## Example

The proof of concept is currently hosted on Netlify. Please check out the full build at https://olivero-poc.netlify.com.

## Reporting bugs

If you need to submit a bug report for this POC, create an issue in the [Olivero issue queue](https://www.drupal.org/project/issues/olivero?component=Proof+of+Concept), with `Proof of Concept` selected as the component. Please follow the Drupal.org issue guidelines as it helps us and the community better understand your report, reproduce the bug, and find related issues.

## Installation

### Prerequisites:

- Node (12+)

### Install Dev Dependencies

`$ npm install`

## Usage

`$ npm start` or `$ gulp watch`

This will watch for any styles and JS changes.

`$ npm run build` or `$ gulp build`

This will handle the compilation of all the CSS files, creation of accompanying source maps, concatenation of all CSS files into one CSS stylesheet within the `/dist` directory.
