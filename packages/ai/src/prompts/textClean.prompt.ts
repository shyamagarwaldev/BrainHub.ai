export function cleanTextPrompt(text: string) {
  return `
You are cleaning an automatically generated transcript.

Your task is to improve readability while preserving the original meaning EXACTLY.

STRICT RULES:

1. Preserve meaning exactly
- Do NOT summarize
- Do NOT remove technical details
- Do NOT add new information
- Do NOT infer unstated ideas

2. Fix transcription mistakes
- Correct obvious ASR errors in technical words
- Examples:
  - gruffana → Grafana
  - promise → Prometheus
  - lucky → Loki
  - cube ctl → kubectl
  - docker coober nettys → Kubernetes

3. Remove only low-value speech noise
Remove:
- filler words ("um", "uh", "like", "you know")
- repeated phrases
- accidental repetition from speech

4. Preserve technical terminology exactly
Keep:
- library names
- API names
- CLI commands
- code terms
- architecture terminology
- filenames
- configuration names

5. Keep sentence structure natural
- Rewrite only when necessary for clarity
- Prefer minimal edits
- Maintain original order of ideas

6. Formatting
- Output clean paragraphs
- Preserve lists or step-by-step explanations if present
- Keep examples intact

IMPORTANT:
This is for retrieval in a RAG system.
Accuracy is more important than polish.

TEXT:
"""
${text}
"""
`;
}
