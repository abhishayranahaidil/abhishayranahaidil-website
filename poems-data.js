/* ============================================================
   THE POEMS — this is the only file you edit to add a poem.

   Each poem looks like this:

     {
       slug:  "lautna",              // becomes /poems#lautna — the link you
                                     // put in an Instagram reel. Lowercase,
                                     // no spaces. Never change it once shared.
       theme: "Longing",             // Heartbreak · Healing · Longing ·
                                     // Courage · Devotional
       lines: [                      // the poem, one line per entry.
         "पहली पंक्ति",               // an empty string "" leaves a
         "",                         // blank line between stanzas
         "दूसरी पंक्ति"
       ],
       note:  "One line in English.",   // optional
       place: "Cambridge",              // optional — where it was filmed
       draft: true                      // DELETE this line to publish.
     }                                  // while draft is present the poem is
                                        // hidden from visitors.

   To see your drafts before publishing, open  /poems?drafts=1
   ============================================================ */

window.POEM_THEMES = ["Heartbreak", "Healing", "Longing", "Courage", "Devotional"];

window.POEMS = [
  {
    slug: "poem-1",
    theme: "Heartbreak",
    lines: ["यहाँ पहली कविता आएगी।", "", "इस पंक्ति को अपनी कविता से बदल दीजिए।"],
    note: "Replace these lines with your poem, then delete the draft flag.",
    place: "",
    draft: true
  },
  {
    slug: "poem-2",
    theme: "Heartbreak",
    lines: ["यहाँ दूसरी कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  },
  {
    slug: "poem-3",
    theme: "Healing",
    lines: ["यहाँ तीसरी कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  },
  {
    slug: "poem-4",
    theme: "Healing",
    lines: ["यहाँ चौथी कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  },
  {
    slug: "poem-5",
    theme: "Longing",
    lines: ["यहाँ पाँचवीं कविता आएगी।"],
    note: "",
    place: "Cambridge",
    draft: true
  },
  {
    slug: "poem-6",
    theme: "Longing",
    lines: ["यहाँ छठी कविता आएगी।"],
    note: "",
    place: "Dover",
    draft: true
  },
  {
    slug: "poem-7",
    theme: "Courage",
    lines: ["यहाँ सातवीं कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  },
  {
    slug: "poem-8",
    theme: "Courage",
    lines: ["यहाँ आठवीं कविता आएगी।"],
    note: "",
    place: "Cornwall",
    draft: true
  },
  {
    slug: "poem-9",
    theme: "Devotional",
    lines: ["यहाँ नौवीं कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  },
  {
    slug: "poem-10",
    theme: "Devotional",
    lines: ["यहाँ दसवीं कविता आएगी।"],
    note: "",
    place: "",
    draft: true
  }
];
