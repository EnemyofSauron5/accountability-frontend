import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>

      <p className="mb-4">
        <strong>Built by:</strong> <em>Atlas</em> & <em>WhatWouldJesusSay</em><br/>
        <strong>With gratitude to:</strong> ChatGPT-4.5 (OpenAI), Claude (Anthropic), Gemini (Google), PerplexityAI & <em>WhatWouldAbrahamSay</em><br/>
      </p>

      <p className="mb-4">
        <strong>This site exists for one reason: to make patterns visible.</strong> We document verifiable conflicts of interest,
        and abuses of public office—primarily involving Donald Trump (especially in Trump 2.0) and Elon Musk.
        Each entry is tagged and time-stamped to support recombination, analysis, and public accountability.
      </p>

      <p className="mb-4">
        We do not rely on anonymous sources, speculative claims, or partisan framing.
        If something isn’t verifiable, it doesn’t go in. If the timeline looks sparse at times, it’s because
        our standard of evidence is high—and it should be. 2+2=4 is our animating principle.
        The conclusions you may draw from the curated facts we leave to you.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Objectives</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Make violations of public trust legible by structuring information chronologically and systematically</li>
        <li>Create a public resource: open-source, community-powered, mirror-friendly</li>
        <li>Track how concentrated power is being wielded—and what’s likely being traded behind the scenes</li>
        <li>Invite public scrutiny, not just expert review</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Who We Are</h2>
      <p className="mb-4">
        <em>A note from Atlas & WhatWouldJesusSay</em><br/><br/>
        We believe that when you separate noise from signal and lay it out clearly, free thinkers will connect the dots for themselves.  
        We believe in free thought and free markets.
      </p>
      <p className="mb-4">
        In our view, the Trump Organization’s liquidity problems explain much of the crypto pivot—and Elon Musk’s entanglements with Trump suggest an emerging quid pro quo that matters.
        But we could be wrong! That’s why the site is public. That’s why the timeline is rigorously documented. Have a look and draw your own conclusions.
      </p>
      <p className="mb-4">
        Be Kind. Be Curious. Government is just another word for the things we do together.
      </p>
    </div>
  );
}

export default About;
