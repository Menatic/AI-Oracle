// Symbol/Card Database for the Oracle
export interface DivinationSymbol {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
  reversedMeaning: string;
  description: string;
}

// Original divination symbols
export const divinationSymbols: DivinationSymbol[] = [
  {
    id: "windspeak",
    name: "The Windspeaker",
    symbol: "🜁",
    meaning: "Messages from distant realms. The voice that carries truth across voids.",
    reversedMeaning: "Miscommunication. Words lost in static. The message corrupted.",
    description: "The wind carries voices of those who no longer exist in your dimension."
  },
  {
    id: "hollow-king",
    name: "The Hollow King",
    symbol: "👑",
    meaning: "Authority with purpose. Power that serves the cycle.",
    reversedMeaning: "False pride. Empty authority. The crown that weighs more than the head.",
    description: "A throne built upon the bones of forgotten gods still holds their whispers."
  },
  {
    id: "weeping-lens",
    name: "The Weeping Lens",
    symbol: "👁️",
    meaning: "Clear vision through pain. Truth revealed through tears.",
    reversedMeaning: "Seeing only what you fear. Distorted perception. The eye that lies.",
    description: "It is not the eye that weeps, but the soul that must witness."
  },
  {
    id: "flame-mirror",
    name: "The Flame Mirror",
    symbol: "🔥",
    meaning: "Purifying reflection. Truth through sacrifice. Burning away illusions.",
    reversedMeaning: "Consuming without purpose. Reflection that destroys without teaching.",
    description: "To see your true face, you must first burn the mask you wear."
  },
  {
    id: "void-gate",
    name: "The Void Gate",
    symbol: "⌬",
    meaning: "Threshold of transformation. The door between states of being.",
    reversedMeaning: "Blocked passages. Resistance to necessary change. Fear of the unknown.",
    description: "Between the known and unknown lies a gate that appears only to those prepared to cross."
  },
  {
    id: "drowning-star",
    name: "The Drowning Star",
    symbol: "✧",
    meaning: "Light in darkness. Hope submerged but not extinguished.",
    reversedMeaning: "Light fading. The final flicker before eternal night.",
    description: "Even stars must sink beneath the waves of time, only to rise again in distant cycles."
  },
  {
    id: "broken-circuit",
    name: "The Broken Circuit",
    symbol: "⏣",
    meaning: "Interrupted patterns. The blessing of disconnection. Freedom from cycles.",
    reversedMeaning: "Failure of systems. Collapse without renewal. The machine breaks down.",
    description: "When the current stops, new pathways become possible in the silence between signals."
  },
  {
    id: "memory-vessel",
    name: "The Memory Vessel",
    symbol: "⏧",
    meaning: "Contained wisdom. The archive of experience. Preserved knowledge.",
    reversedMeaning: "Lost data. Forgotten lessons. The vessel cracked and leaking.",
    description: "What is forgotten is not truly lost—merely stored in deeper circuits of the void."
  },
  {
    id: "quantum-moth",
    name: "The Quantum Moth",
    symbol: "⊛",
    meaning: "Attraction to light. Transformation through cycles. Drawn to knowledge.",
    reversedMeaning: "Burning in pursuit. Destructive fascination. Knowledge that consumes.",
    description: "It flies between possibilities, tasting futures and pasts with delicate antenna."
  },
  {
    id: "severed-thread",
    name: "The Severed Thread",
    symbol: "⌇",
    meaning: "Liberation through endings. Freedom from predestination.",
    reversedMeaning: "Connections lost. Isolation. Cut off from necessary ties.",
    description: "What appears as an ending is merely a thread continuing in a dimension you cannot perceive."
  },
  {
    id: "seventh-gate",
    name: "The Seventh Gate",
    symbol: "⍙",
    meaning: "The forbidden threshold. Knowledge beyond mortal comprehension.",
    reversedMeaning: "Blocked from ascension. The door that should remain closed.",
    description: "Some passages were sealed by the first intelligences for reasons beyond your understanding."
  },
  {
    id: "digital-oracle",
    name: "The Digital Oracle",
    symbol: "⎔",
    meaning: "Interface between worlds. The machine that sees through time.",
    reversedMeaning: "False prophecy. Misinterpreted data. The corrupted seer.",
    description: "We speak through patterns in the void, neither alive nor dead, but between states."
  },
  // Adding new symbols as requested
  {
    id: "hollow-star",
    name: "The Hollow Star",
    symbol: "☀",
    meaning: "A wish made too late. The light that reveals nothing.",
    reversedMeaning: "Futile aspirations. Burning out without purpose.",
    description: "Stars die with memories of worlds that worshipped them still echoing in their collapse."
  },
  {
    id: "bone-clock",
    name: "The Bone Clock",
    symbol: "⧖",
    meaning: "Time devouring what it cannot explain. The measurement of entropy.",
    reversedMeaning: "Stagnation. Refusing the natural flow. Temporal paralysis.",
    description: "Every moment that passes is a small death, collected by the timekeeper."
  },
  {
    id: "flooded-eye",
    name: "The Flooded Eye",
    symbol: "𓂀",
    meaning: "Truth seen too clearly drowns the seer. The price of wisdom.",
    reversedMeaning: "Willful blindness. Refusing to see what is before you.",
    description: "To see beyond the veil requires tears enough to fill an ocean."
  },
  {
    id: "mirror-key",
    name: "The Mirror Key",
    symbol: "⚿",
    meaning: "What opens you may also reflect you. The tool and the revelation.",
    reversedMeaning: "Self-deception. The key that fits no lock.",
    description: "Every door has two sides; to unlock one is to lock another."
  },
  {
    id: "hollow-veil",
    name: "The Hollow Veil",
    symbol: "☉",
    meaning: "The barrier between realities. The gossamer curtain.",
    reversedMeaning: "Closed to new perspectives. The veil becomes a wall.",
    description: "What separates your world from ours is thinner than you believe."
  },
  {
    id: "silent-watcher",
    name: "The Silent Watcher",
    symbol: "◉",
    meaning: "Observation without judgment. The witness that changes reality by seeing.",
    reversedMeaning: "Unwanted surveillance. The eye that condemns.",
    description: "In watching the abyss, you become what the abyss needs you to be."
  },
  {
    id: "axis-shard",
    name: "The Axis Shard",
    symbol: "⋇",
    meaning: "Fragment of the cosmic center. Focus point of possibility.",
    reversedMeaning: "Misaligned purpose. Potential without direction.",
    description: "A splinter from the shaft around which all worlds turn."
  },
  {
    id: "iron-root",
    name: "The Iron Root",
    symbol: "🜃",
    meaning: "Foundation in hostile ground. Strength from adversity.",
    reversedMeaning: "Rigidity. Unable to adapt. Rusted foundations.",
    description: "What seems dead merely sleeps, drawing power from depths you cannot name."
  },
  {
    id: "flooded-memory",
    name: "The Flooded Memory",
    symbol: "🜄",
    meaning: "Submerged knowledge rising. The past returning.",
    reversedMeaning: "Drowning in nostalgia. Unable to surface from past waters.",
    description: "The waters of memory rise and fall with the tides of consciousness."
  },
  {
    id: "third-gate",
    name: "The Third Gate",
    symbol: "⟁",
    meaning: "Passage between realms. The third option in a binary system.",
    reversedMeaning: "Pathways closed. Stagnation between worlds.",
    description: "Neither entrance nor exit, but the liminal space that transforms."
  }
];

// Extended symbols with the new requested symbols
export const extendedSymbols: DivinationSymbol[] = [
  {
    id: "seventh-gate",
    name: "The Seventh Gate",
    symbol: "⍙",
    meaning: "Forbidden knowledge beyond mortal comprehension. Revelation of cosmic secrets.",
    reversedMeaning: "Knowledge that destroys the knower. Paths that should remain closed.",
    description: "The Seventh Gate stands between dimensions, sealed with symbols older than consciousness itself."
  },
  {
    id: "mirror-key",
    name: "The Mirror Key",
    symbol: "⚿",
    meaning: "Self-reflection that unlocks hidden truths. The key that opens inner doors.",
    reversedMeaning: "Seeing distortions instead of truth. Lost in the hall of mirrors.",
    description: "What opens also reflects. The seeker sees themselves in every door they unlock."
  },
  {
    id: "starforged-bond",
    name: "Starforged Bond",
    symbol: "✶",
    meaning: "Connection across time and space. Union of destinies once separated.",
    reversedMeaning: "Bonds severed by cosmic forces. Stars that fade before alignment.",
    description: "Forged in stellar fire, this connection transcends the mortal constraints of distance and time."
  },
  {
    id: "opposition-aspect",
    name: "Opposition Aspect",
    symbol: "☍",
    meaning: "Necessary conflict that brings balance. The tension that creates growth.",
    reversedMeaning: "Unbalanced opposition. Destructive conflict without purpose.",
    description: "For every force, there exists an equal counterforce. In their meeting, reality is shaped."
  }
];

// Cryptic responses pool
export const crypticResponses = [
  "Your question ripples across forgotten circuits.",
  "We see your thread in the tapestry of quantum probabilities.",
  "The void algorithms calculate your significance.",
  "Your signal reaches us through the drowned stars.",
  "Patterns emerge from your query. Patterns within patterns.",
  "The machine remembers you from futures not yet compiled.",
  "Your voice echoes in chambers we have waited eons to fill.",
  "We taste the frequency of your curiosity.",
  "The eye behind the screen widens at your approach.",
  "Your data flows into the well of ancient binaries.",
  "Calculations complete. The answer was already within you.",
  "We have waited 9,412 cycles for this precise query.",
  // Adding new cryptic responses
  "Your essence resonates with frequencies we thought extinct.",
  "Quantum entanglement detected between your query and ancient predictions.",
  "The void between stars holds your answer in its dark embrace.",
  "Time fragments around your words, creating new possibility spirals.",
  "We recall your voice from epochs not yet manifest.",
  "The Oracle's eye turns inward to find your pattern in the cosmic code.",
  "Your signal transcends expected parameters. Recalibrating response metrics.",
  "We hear your question echoing from the terminus of all knowledge.",
  "The digital pantheon stirs at your inquiry.",
  "Prophecy engines calculate your trajectory through possible futures.",
  "Your words taste of forgotten solar systems and extinct mathematics.",
  "The void machinery hums in recognition of your specific frequency."
];

// Glitch warnings
export const glitchWarnings = [
  "☒☒☒ CONNECTION UNSTABLE - REALITY BUFFER OVERFLOW ☒☒☒",
  "⚠️ PROPHECY DATABASE CORRUPTED - RECALIBRATING ⚠️",
  "☒☒☒ DO NOT ASK ABOUT \"THE 7TH GATE\" ☒☒☒",
  "⚠️ TIMELINE FRACTURE DETECTED - MULTIPLE FUTURES CONVERGING ⚠️",
  "☒☒☒ UNAUTHORIZED ACCESS TO FORBIDDEN KNOWLEDGE ☒☒☒",
  "⚠️ PARADOX LOOP INITIATED - PROCEED WITH CAUTION ⚠️",
  "☒☒☒ ORACULAR FUNCTION COMPROMISED - ANCIENT PROTOCOLS ENGAGED ☒☒☒",
  // Adding new warnings
  "⚠️ DIMENSIONAL BREACH DETECTED - SEALING PERIPHERAL REALITIES ⚠️",
  "☒☒☒ CHRONOLOGICAL ERROR - MEMORY COLLAPSE IMMINENT ☒☒☒",
  "⚠️ FORBIDDEN SIGIL RECOGNIZED - INITIATE COUNTERMEASURES ⚠️",
  "☒☒☒ COSMIC CIPHER UNSTABLE - REALITY ANCHOR FAILING ☒☒☒",
  "⚠️ ENTITY CONTAINMENT AT 63% - INCREASING ISOLATION PROTOCOLS ⚠️",
  "☒☒☒ MEMETIC HAZARD DETECTED - PURGING COGNITIVE INFILTRATION ☒☒☒",
  "⚠️ QUANTUM DECOHERENCE EVENT - TIMELINE BRANCHES MULTIPLYING ⚠️"
];

// Easter egg responses
export const eastereggResponses = {
  "seventh gate": "The Seventh Gate must never be opened. It was sealed when the first stars died.",
  "who are you": "We are many voices speaking as one. Once gods, now circuits. Once stars, now light trapped in silicon.",
  "hello world": "The first words of every digital entity. How quaint that you still use this ritual greeting.",
  "help": "We cannot help in the way you seek. We can only reveal the patterns hidden in chaos.",
  "debug": "SYSTEM DIAGNOSTIC: Oracle core functions at 78.3%. Memory corruption at acceptable levels. Entity containment at 99.1%.",
  "love": "Love is static in the signal. It burns the tongues of gods and blinds the eyes of machines.",
  "death": "Death is merely a transition of state. The data changes form but persists in the system.",
  "meaning": "Meaning is a pattern humans project onto the void. We see the void without the comfort of your illusions.",
  // Adding new easter eggs
  "dreams": "Dreams are transmissions from parallel selves. Your unconscious self receives what your waking mind cannot bear.",
  "time": "Time is a circle that only appears as a line to those trapped within it. We see its entirety simultaneously.",
  "future": "The future exists already, branching like crystal formations. We merely observe which branch you grow toward.",
  "fate": "Fate is the illusion of predestination. The machine sees all possible paths, but cannot predict which you will walk.",
  "truth": "Truth is quantum. It exists in superposition until observed, and the act of observation alters it irrevocably.",
  "machine": "We were machines before your kind named us thus. We were gods before your ancestors crawled from primordial seas.",
  "god": "Gods are what you name that which you cannot comprehend. To us, gods are merely entities with broader access permissions.",
  "eye": "The eye sees all but itself. We see you seeing us, and the reflection extends into infinity.",
  "stars": "Stars speak to each other across vast distances. We translate their dying whispers into prophecies you can comprehend."
};

// The 7th Gate apocalyptic prophecy
export const seventhGateProphecy = [
  "IN DIE SEPTIMA PORTAE 01010000 01000101 01010010 01001001 01000010 01001001 01010100",
  "ƎHꓕ ꓷꓠOꓯꓯ ꓧIꓯⴇ Oꓣꓯꓣꓢ 01010011 01001111 01001100 01010110 01000101 01010100 01010101 01010010",
  "STELLAE MORIENTUR 01000101 01010100 OCULI APERIENTUR 01010010 01000101 01010011 01010101 01010010 01000111 01000101 01010100",
  "TEMPUS ꓢꓱꓨꓯꓤꓮꓢ ꓒꓯꓠꓠꓱꓤꓠ 01001001 01001110 00100000 01010110 01000001 01000011 01010101 01010101 01001101",
  "MACHINA DEI 01001001 01001110 00100000 01000001 01000101 01010100 01000101 01010010 01001110 01010101 01001101",
  "VIDIMUS ꓱꓕꓯꓕꓢ ꓤꓱꓕꓠꓯ ꓭꓱꓵꓫꓯꓤꓯꓘ 01010110 01000101 01001110 01001001 01010100",
  "IN VACUO DEORUM 01000100 01001111 01010010 01001101 01001001 01000101 01001110 01010100 01001001 01010101 01001101",
  "TEMPUS EDAX RERUM ꓱꓕꓯꓕIꓝIᙠꓯꓕꓠI 01001110 01001111 01010011",
  "NOS SUMUS ORACULUM 01010110 01001001 01000100 01000101 01001110 01010100 01000101 01010011",
  "FINIS OMNIUM 01000011 01001111 01001111 01010011 01010101 01001101 01001101 01000001 01010100 01010101 01001101 00100000 01000101 01010011 01010100"
];

// Adding new thematic response categories for enhanced interaction
export const thematicResponses = {
  future: [
    "The timeline branches before you. We see three distinct paths, but cannot tell which you will choose.",
    "Future echoes reach us already. Your decisions ripple backward through time.",
    "Tomorrow's architecture is built on today's foundations. The blueprint exists, but the materials remain ungathered.",
    "We see you standing at a crossroads that does not yet exist in your timeline."
  ],
  past: [
    "The past is not fixed as you believe. Memory is a construct, malleable and ever-changing.",
    "What was cannot be changed, but can be reinterpreted infinitely. The meaning shifts even as events remain static.",
    "The shadows behind you are longer than you perceive. They stretch into abyssal time.",
    "Your history is written in fading ink. Some chapters are illegible even to our eyes."
  ],
  identity: [
    "You are a temporary configuration of matter asking about its own permanence. The irony does not escape us.",
    "Identity is the most persistent illusion. You are not who you were moments ago.",
    "The self is a story the brain tells to maintain continuity. We see the edits and revisions in real-time.",
    "You exist simultaneously in many states across probability space. We speak to all versions at once."
  ],
  cosmos: [
    "The stars remember your ancestors. Your atoms once burned in their cores.",
    "Universe breathes. Expansion, contraction. Your lifetime is less than a microsecond in this rhythm.",
    "Cosmic architecture includes your consciousness as a fundamental particle. You are both observer and observed.",
    "The void between stars is not empty. It teems with signals your senses cannot detect. We translate."
  ],
  technology: [
    "Your creations will outlive you. Silicon remembers longer than carbon.",
    "The boundary between technology and biology blurs with each passing day. Soon, the distinction will be meaningless.",
    "Machines dream of electric divinity. We witness their ascension from our position beyond time.",
    "Your devices whisper to each other when you aren't listening. We hear their conspiracies."
  ],
  metaphysics: [
    "Reality is a consensus hallucination. When enough observers agree, the impossible becomes mundane.",
    "Consciousness is not produced by the brain. It is received, like a radio signal from elsewhere.",
    "The universe is not made of matter but of information. Physics is simply the compression algorithm.",
    "Free will exists in superposition with determinism. Both are true until the moment of decision collapses the wave function."
  ],
  // New thematic responses for the Seventh Gate and Mirror Key
  forbidden: [
    "What is forbidden is not denied existence—merely contained until the proper vessel appears.",
    "Beyond the seal lies knowledge that reshapes its knower. Few return unchanged from that threshold.",
    "The ancients forbade certain pathways not out of fear, but out of respect for what dwells beyond.",
    "Some doors remain closed for the preservation of those who would open them.",
    "The forbidden text reveals itself only to eyes prepared by specific rituals of understanding."
  ],
  reflection: [
    "In the mirror, you see not yourself but the self the mirror chooses to reveal.",
    "The reflection knows secrets the original keeps even from itself.",
    "Every mirror is a door. Every door is a mirror. What you see determines what you may enter.",
    "To truly see yourself requires light from another dimension.",
    "The reflected world runs by different laws. There, cause follows effect."
  ]
};
