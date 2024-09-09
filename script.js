function analyzeText() {
    const text = document.getElementById("user-input").value;

    // Counters for Character and space 
    const charCount = text.replace(/\s+/g, '').length;
    const spaceCount = (text.match(/\s/g) || []).length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // Display character, space, and word counts
    document.getElementById("char-count").innerText = `Characters: ${charCount}`;
    document.getElementById("space-count").innerText = `Spaces: ${spaceCount}`;
    document.getElementById("word-count").innerText = `Words: ${wordCount}`;

    // Build the histogram (character frequency count)
    const histogram = buildHistogram(text);
    displayHistogram(histogram);

    // Spellchecking ( > 2 identical consecutive characters)
    checkForRepeatedChars(text);
}

function buildHistogram(text) {
    const histogram = {};
    for (let char of text.replace(/\s+/g, '')) {
        if (histogram[char]) {
            histogram[char]++;
        } else {
            histogram[char] = 1;
        }
    }
    return histogram;
}

function displayHistogram(histogram) {
    const histogramDiv = document.getElementById("histogram");
    histogramDiv.innerHTML = '';
    for (let char in histogram) {
        histogramDiv.innerHTML += `<p>${char}: ${histogram[char]}</p>`;
    }
}

function checkForRepeatedChars(text) {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.classList.remove("active");

    // Regular expression to find repeated characters (more than 2 in a row)
    const repeatedCharPattern = /(.)\1{2,}/g;
    const matches = text.match(repeatedCharPattern);

    if (matches) {
        errorMsg.innerHTML = `Repeated characters detected: ${matches.join(', ')}`;
        errorMsg.classList.add("active"); // Error
    }
}
