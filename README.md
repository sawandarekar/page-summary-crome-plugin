# Page Summarizer Chrome Extension

A Chrome extension that uses Google's Gemini 2.0 AI to generate concise summaries of web pages. The extension allows users to specify the length of the summary and provides an option to clear previous summaries.

## Features

- Summarize any web page content using Gemini 2.0 AI
- Customize summary length (1-10 lines)
- Clear summary functionality
- Automatic storage of last generated summary
- Clean and intuitive user interface

## Prerequisites

- Google Chrome browser
- Gemini API key (obtain from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation

1. Clone or download this repository to your local machine

2. Get your Gemini API Key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

3. Configure the extension:
   - Open `popup.js` in a text editor
   - Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key
   ```javascript
   const API_KEY = 'YOUR_GEMINI_API_KEY';
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the directory containing the extension files

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the number input to select how many lines you want in your summary (1-10)
3. Click "Summarize" to generate a summary of the current page
4. Click "Clear" to remove the current summary

## Files Structure 