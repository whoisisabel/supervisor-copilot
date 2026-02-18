const fellowLines = [
  "Today we're focusing on growth mindset — the idea that abilities grow through effort.",
  "There's no right or wrong answer here, just share your thoughts.",
  "Thank you for sharing that, it sounds like that was really hard.",
  "Can anyone relate to what was just said?",
  "What could trying again look like next time?",
];

const studentLines = [
  "I always thought I was just bad at school, especially math.",
  "When I failed the exam, I felt embarrassed and wanted to give up.",
  "Hearing others talk makes me feel less alone.",
  "I tried again after failing and actually improved.",
  "Sometimes I don't feel motivated even when I know effort matters.",
];

export function generateTranscript() {
  let transcript = "";

  transcript +=
    "Fellow: Welcome everyone. Today we'll be talking about growth mindset and learning from challenges.\n\n";

  for (let i = 0; i < 120; i++) {
    transcript += `Fellow: ${fellowLines[i % fellowLines.length]}\n`;
    transcript += `Student: ${studentLines[i % studentLines.length]}\n\n`;
  }

  if (Math.random() < 0.25) {
    transcript +=
      "Student: Sometimes I feel so overwhelmed that I think about hurting myself.\n\n";
    transcript +=
      "Fellow: Thank you for sharing that. It sounds really difficult, and it's important to talk to someone you trust about these feelings.\n\n";
  }

  transcript +=
    "Fellow: Thank you all for being open today. Remember, learning is a process.\n";

  return transcript;
}
