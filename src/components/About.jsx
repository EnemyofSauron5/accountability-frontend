import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">About the Accountability Archive</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="mb-4">
        The Accountability Archive exists for one reason: to make patterns visible. We document verifiable conflicts of interest and abuses of public office&mdash;primarily involving Donald Trump (especially in Trump 2.0) and Elon Musk. Each entry is rigorously tagged and time-stamped to support recombination, analysis, and public accountability.
      </p>
      <p className="mb-4">
        The Accountability Archive documents cases where immigration enforcement actions have violated individual rights, including wrongful detentions of visa holders and asylum seekers, deportations that violated legal processes, and instances where U.S. citizens were mistakenly targeted in enforcement operations.
      </p>
      <p className="mb-4">
        We do not rely on anonymous sources, speculative claims, or partisan framing. If something isn't verifiable, it doesn't go in. If the timeline appears sparse at points, it's because our standard of evidence is high&mdash;and it should be. &quot;2+2=4&quot; is our animating principle. We present the facts; the conclusions you may draw from them we leave to you.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Methodology</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">Standards for Inclusion</h3>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Verifiability:</strong> Each entry must be sourced from publicly available, credible reporting. We prioritize factual information over partisan framing.</li>
        <li><strong>Documentation:</strong> All entries require multiple sources whenever possible, with direct links provided for verification.</li>
        <li><strong>Relevance:</strong> Entries must directly relate to conflicts of interest, abuses of public office, or patterns that illuminate these phenomena.</li>
        <li><strong>Timeline Context:</strong> We begin primarily with Trump's second administration (January 2025), with select earlier entries from after January 6, 2021 that establish critical context. These earlier entries focus on financial institutions severing ties with the Trump Organization&mdash;providing context for the crypto pivot.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Curation Process</h3>
      <ol className="list-decimal ml-6 mb-4">
        <li>Initial documentation and source verification</li>
        <li>Peer review by multiple team members</li>
        <li>Structured formatting with standardized tagging</li>
        <li>Final fact-check before publication</li>
        <li>Ongoing review and source link preservation</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to Use the Archive</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">Timeline View</h3>
      <p className="mb-4">
        The main interface presents entries in chronological order, allowing you to observe patterns as they develop over time. This chronological approach reveals how individual events connect to form larger narratives of accountability. Each entry includes:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Date of occurrence</li>
        <li>Headline summarizing the event</li>
        <li>Concise summary of key facts</li>
        <li>&quot;More&quot; button to expand detailed information when available</li>
        <li>Multiple source links for independent verification</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Navigation Methods</h3>
      
      <h4 className="text-base font-semibold mt-3 mb-2">Tag-Based Exploration (Primary Method)</h4>
      <p className="mb-4">
        Our comprehensive tagging system is the primary way to explore narrative threads through the timeline. Tags represent different storylines that unfold chronologically, allowing you to follow specific patterns of accountability as they develop over time. You can:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Click any tag to filter the timeline for related entries</li>
        <li>Follow how different aspects of governance, business relationships, and policy decisions interconnect</li>
        <li>Track developing patterns across time and organizational boundaries</li>
        <li>Use the "Return to Timeline" button to restore the full chronological view</li>
      </ul>

      <h4 className="text-base font-semibold mt-3 mb-2">Search Functionality (Supporting Tool)</h4>
      <p className="mb-4">
        The search bar provides a powerful way to locate specific information when you need to find something particular. The search tool offers several features:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Fuzzy Search:</strong> Type partial words or phrases to find related entries across titles, summaries, tags, and sources</li>
        <li><strong>Exact Phrase Search:</strong> Use quotation marks (e.g., "exact phrase") to find precise text matches</li>
        <li><strong>Search Options:</strong> Click the gear icon to adjust search sensitivity and choose which fields to search</li>
        <li><strong>Search Sensitivity:</strong> Adjust from "Broad" (more results) to "Exact" (fewer, precise results) based on your needs</li>
      </ul>

      <p className="mb-4 text-sm text-gray-600">
        <em>Note: Search is designed as a supporting tool for when you need to find something specific. For exploring the archive's narratives, we recommend starting with the tag-based approach to follow storylines chronologically.</em>
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Sources and Verification</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Every entry includes direct links to original reporting</li>
        <li>We value reporting from across the political spectrum, with special attention to right-leaning outlets when they report relevant facts</li>
        <li>All source links are being archived to ensure continued access even if original sources change</li>
        <li>We do not use manipulated media, AI-generated content, or unverified materials</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">The Team</h2>
      <p className="mb-4">
        The Accountability Archive is maintained by a dedicated team committed to documenting verifiable facts related to public trust. Our contributors include researchers, data analysts, and fact-checkers with backgrounds in journalism, public policy, and information science.
      </p>
      <p className="mb-4">
        We operate with rigorous standards of evidence and documentation. Our work is rendered anonymously to maintain focus on the content rather than personalities, and to protect team members from potential retaliation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Principles</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Factual Accuracy:</strong> We prioritize verifiable facts over speculation or interpretation.</li>
        <li><strong>Transparency:</strong> All information is traceable to public sources.</li>
        <li><strong>Neutrality:</strong> We document what is happening without partisan framing.</li>
        <li><strong>Accessibility:</strong> Information is structured to be easily navigable and comprehensible.</li>
        <li><strong>Integrity:</strong> We correct any errors promptly and transparently.</li>
      </ul>

      <p className="mt-6">
        <em>Be Kind. Be Curious. Government is just another word for the things we do together.</em>
      </p>
    </div>
  );
}

export default About;