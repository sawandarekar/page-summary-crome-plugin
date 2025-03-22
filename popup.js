document.addEventListener('DOMContentLoaded', function() {
  const summarizeButton = document.getElementById('summarize');
  const clearButton = document.getElementById('clear');
  const summaryDiv = document.getElementById('summary');
  const lineCountInput = document.getElementById('lineCount');

  // Load previous summary if exists
  chrome.storage.local.get(['summary'], function(result) {
    if (result.summary) {
      summaryDiv.textContent = result.summary;
    }
  });

  summarizeButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSelectedText,
    }, async (results) => {
      if (results && results[0]) {
        const selectedText = results[0].result;
        
        if (!selectedText) {
          summaryDiv.textContent = 'Please select some text on the page to summarize.';
          return;
        }

        const lineCount = parseInt(lineCountInput.value);
        
        try {
          const summary = await generateSummary(selectedText, lineCount);
          summaryDiv.textContent = summary;
          
          // Save summary
          chrome.storage.local.set({ summary: summary });
        } catch (error) {
          summaryDiv.textContent = 'Error generating summary: ' + error.message;
        }
      }
    });
  });

  clearButton.addEventListener('click', () => {
    summaryDiv.textContent = '';
    chrome.storage.local.remove(['summary']);
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}

async function generateSummary(content, lineCount) {
  const API_KEY = 'AIzaSyATOXLWPMV_KndNkQRSARYBVpQ2B0MDjsg';
  const API_URL_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyATOXLWPMV_KndNkQRSARYBVpQ2B0MDjsg"

  const response = await fetch(API_URL_KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Summarize the following text in exactly ${lineCount} separate points, with each point on a new line. Make each point concise and clear:\n\n${content}`
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate summary ');
  }

  const data = await response.json();
  const summary = data.candidates[0].content.parts[0].text;
  
  // Split the summary into lines and format them
  const lines = summary.split('\n')
    .filter(line => line.trim()) // Remove empty lines
    .map((line, index) => {
      // Remove leading numbers or bullets if they exist
      return line.replace(/^\d+[\.\)]\s*|-\s*/, '').trim();
    });

  // Format the lines with numbers
  return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
} 