import { Character, TimelineEvent, Weapon, Kingdom, FamilyNode } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'krishna',
    name: 'Lord Krishna',
    sanskritName: 'श्रीकृष्ण',
    alliance: 'Divine',
    role: 'Guide, Charioteer, Supreme Divinity',
    avatar: 'krishna_chakra_1783523413370.jpg',
    biography: 'The supreme incarnation of Lord Vishnu who acts as the charioteer and counselor to Arjuna during the Kurukshetra war. His teachings in the Bhagavad Gita establish the path of Dharma, Bhakti, and Karma Yoga.',
    powers: ['Omniscience', 'Universal Cosmic Form (Vishwarupa)', 'Infinite Reality Control', 'Divine Strategy'],
    weapons: ['Sudarshan Chakra', 'Kaumodaki Gada', 'Panchajanya Shankha'],
    relationships: {
      spouse: 'Rukmini',
      siblings: ['Balarama', 'Subhadra'],
      mentor: 'Sage Sandipani',
      rival: 'Shishupala'
    },
    importance: 'The spiritual heart of the epic. Without his strategic guidance, the Pandavas could not have overcome the insurmountable Kuru generals like Bhishma and Drona. He represents absolute righteousness.',
    stats: { strength: 100, wisdom: 100, skill: 98, divinity: 100, dharma: 100 }
  },
  {
    id: 'arjuna',
    name: 'Arjuna',
    sanskritName: 'अर्जुन',
    alliance: 'Pandava',
    role: 'Supreme Archer, Pandava General',
    avatar: 'gita_chariot_1783523429768.jpg',
    biography: 'The third Pandava brother, born of the wind-god Indra and Kunti. He is the master archer of the era, the disciple of Dronacharya, and the recipient of the divine Bhagavad Gita discourse from Krishna.',
    powers: ['Unrivaled Archery Accuracy', 'Ambidexterity (Savyasachi)', 'Concentration Mastery', 'Astral Weapon Invocation'],
    weapons: ['Gandiva Bow', 'Akshaya Tunira (Inexhaustible Quivers)', 'Pashupatastra', 'Brahmashira'],
    relationships: {
      father: 'Pandu (Indra)',
      mother: 'Kunti',
      spouse: 'Draupadi / Subhadra',
      siblings: ['Yudhishthira', 'Bhima', 'Nakula', 'Sahadeva', 'Karna (hidden elder sibling)'],
      mentor: 'Dronacharya',
      rival: 'Karna'
    },
    importance: 'The focal point of the Kurukshetra battlefield. His existential crisis at the onset of war initiates the Bhagavad Gita. He represents the ideal seeker and dedicated warrior.',
    stats: { strength: 88, wisdom: 85, skill: 100, divinity: 80, dharma: 90 }
  },
  {
    id: 'bhishma',
    name: 'Bhishma',
    sanskritName: 'भीष्म',
    alliance: 'Kaurava',
    role: 'Grand Patriarch, Kuru Generalissimo',
    avatar: 'kurukshetra_twilight_1783523399963.jpg',
    biography: 'The grand patriarch of both Pandavas and Kauravas, who took an oath of lifelong celibacy and selfless service to the throne of Hastinapur. Gifted with the boon of choosing his time of death (Iccha-Mrityu).',
    powers: ['Boon of Voluntary Death', 'Invincibility in direct combat', 'Absolute celibate energy', 'Unmatched warfare strategy'],
    weapons: ['Legendary Bow', 'Divine Spear'],
    relationships: {
      father: 'Shantanu',
      mother: 'Ganga',
      siblings: ['Chitrangada', 'Vichitravirya'],
      mentor: 'Parashurama'
    },
    importance: 'The ultimate tragic hero. Bound by his oath, he fights on the Kaurava side despite knowing their cause is unrighteous, symbolizing how loyalty without moral discernment leads to destruction.',
    stats: { strength: 96, wisdom: 95, skill: 98, divinity: 85, dharma: 88 }
  },
  {
    id: 'karna',
    name: 'Karna',
    sanskritName: 'कर्ण',
    alliance: 'Kaurava',
    role: 'King of Anga, Rival Archer',
    avatar: 'krishna_chakra_1783523413370.jpg',
    biography: 'The secret first-born son of Kunti and the Sun god Surya. Abandoned at birth and raised by a charioteer, he faces lifelong discrimination but rises to become the loyal friend of Duryodhana and Arjuna’s greatest competitor.',
    powers: ['Divine Armor & Earrings (Kavach-Kundal)', 'Solar Energy Absorption', 'Inexhaustible Generosity (Daani)', 'Shatter-arrows'],
    weapons: ['Vijaya Bow', 'Vasavi Shakti', 'Bhargavastra', 'Brahmastra'],
    relationships: {
      father: 'Surya (Sun God)',
      mother: 'Kunti',
      siblings: ['Arjuna', 'Yudhishthira', 'Bhima', 'Nakula', 'Sahadeva'],
      mentor: 'Parashurama',
      rival: 'Arjuna'
    },
    importance: 'The tragic embodiment of unrecognized merit and unconditional loyalty. His life explores the complexity of destiny, societal prejudice, and deep-seated friendship over family bonds.',
    stats: { strength: 94, wisdom: 78, skill: 99, divinity: 85, dharma: 70 }
  },
  {
    id: 'draupadi',
    name: 'Draupadi',
    sanskritName: 'द्रौपदी',
    alliance: 'Pandava',
    role: 'Queen of Indraprastha, Empress',
    avatar: 'kurukshetra_twilight_1783523399963.jpg',
    biography: 'Born from a sacrificial fire, she is the proud princess of Panchala and common wife of the five Pandavas. Her public humiliation in the dice hall of Hastinapur becomes the central moral catalyst for the Kurukshetra War.',
    powers: ['Divine Agni-born Resilience', 'Unwavering Devotion to Krishna', 'Empress Command', 'Spiritual Purity'],
    weapons: ['Divine Wrath', 'Words of absolute fire'],
    relationships: {
      father: 'Drupada',
      spouse: 'Five Pandava Brothers',
      siblings: ['Dhrishtadyumna', 'Shikhandi']
    },
    importance: 'The true emotional and ethical catalyst of the epic. Her quest for justice and her sacred hair-oath drives the complete obliteration of the Kaurava dynasty.',
    stats: { strength: 40, wisdom: 90, skill: 50, divinity: 92, dharma: 95 }
  },
  {
    id: 'yudhishthira',
    name: 'Yudhishthira',
    sanskritName: 'युधिष्ठिर',
    alliance: 'Pandava',
    role: 'Dharmaraja, King of Indraprastha',
    avatar: 'gita_chariot_1783523429768.jpg',
    biography: 'The eldest Pandava, born of Dharma (Yama) and Kunti. Renowned for his absolute adherence to truth and righteousness, though his tragic weakness for gambling leads to the loss of his kingdom and exile.',
    powers: ['Absolute Truthfulness (Chariot hovered)', 'Scriptural Wisdom', 'Vyakaran & Spear Combat'],
    weapons: ['Vel (Sacred Spear)', 'Spear of Hastinapur'],
    relationships: {
      father: 'Pandu (Dharma)',
      mother: 'Kunti',
      spouse: 'Draupadi',
      siblings: ['Arjuna', 'Bhima', 'Nakula', 'Sahadeva'],
      mentor: 'Kripacharya / Vidura'
    },
    importance: 'The moral anchor of the Pandavas. He represents the complex journey of a righteous leader navigating political corruption, personal weaknesses, and the ultimate weight of rule.',
    stats: { strength: 75, wisdom: 98, skill: 80, divinity: 88, dharma: 100 }
  },
  {
    id: 'bhima',
    name: 'Bhima',
    sanskritName: 'भीम',
    alliance: 'Pandava',
    role: 'Strength General, Destroyer of Kauravas',
    avatar: 'kurukshetra_twilight_1783523399963.jpg',
    biography: 'The second Pandava, born of the wind-god Vayu and Kunti. Gifted with the strength of ten-thousand elephants, he vowed to slay all one hundred Kaurava brothers to avenge Draupadi’s humiliation.',
    powers: ['Strength of 10,000 Elephants', 'Unsurpassed Mace Combat', 'Immunity to standard poison', 'Fearlessness'],
    weapons: ['Divine Mace', 'Titan Fists'],
    relationships: {
      father: 'Pandu (Vayu)',
      mother: 'Kunti',
      spouse: 'Hidimbi / Draupadi',
      siblings: ['Yudhishthira', 'Arjuna', 'Nakula', 'Sahadeva', 'Hanuman (spiritual brother)']
    },
    importance: 'The physical powerhouse of the Pandavas. He executes the actual destruction of the Kaurava top leadership, including Dushasana and Duryodhana, fulfilling his terrible vows.',
    stats: { strength: 99, wisdom: 72, skill: 85, divinity: 78, dharma: 82 }
  },
  {
    id: 'duryodhana',
    name: 'Duryodhana',
    sanskritName: 'दुर्योधन',
    alliance: 'Kaurava',
    role: 'Eldest Kaurava Prince, King of Hastinapur',
    avatar: 'krishna_chakra_1783523413370.jpg',
    biography: 'The eldest of the hundred Kaurava brothers, born of King Dhritarashtra and Gandhari. Driven by intense jealousy of his cousins, the Pandavas, he schemes to usurp their land, precipitating the world-ending war.',
    powers: ['Vajra-like Iron Body (except thighs)', 'Master Mace Combat', 'Immense political strategy', 'Unyielding Pride'],
    weapons: ['Heavy Iron Gada'],
    relationships: {
      father: 'Dhritarashtra',
      mother: 'Gandhari',
      siblings: ['Dushasana', 'Dussala', '98 other brothers'],
      mentor: 'Balarama',
      rival: 'Bhima'
    },
    importance: 'The primary antagonist. Duryodhana represents the dangers of ego, unbridled ambition, and toxic envy, demonstrating how a single ruler’s pride can destroy an entire empire.',
    stats: { strength: 92, wisdom: 65, skill: 88, divinity: 45, dharma: 25 }
  },
  {
    id: 'shakuni',
    name: 'Shakuni',
    sanskritName: 'शकुनि',
    alliance: 'Kaurava',
    role: 'King of Gandhara, Master Strategist',
    avatar: 'ancient_bharat_map_1783523445581.jpg',
    biography: 'The Prince of Gandhara, maternal uncle to the Kauravas. His father’s bones were used to craft magic dice that would obey his commands. He orchestrated the unfair game of dice that bankrupted the Pandavas.',
    powers: ['Magic Command Dice', 'Absolute psychological manipulation', 'Subversive political intrigue'],
    weapons: ['Command Dice of Bone', 'Dagger'],
    relationships: {
      siblings: ['Gandhari'],
      nephews: ['Duryodhana']
    },
    importance: 'The mastermind behind the scenes. Shakuni operates through deceit and psychology rather than weapons, reminding us that toxic counsel inside a court is deadlier than an army.',
    stats: { strength: 45, wisdom: 95, skill: 50, divinity: 30, dharma: 10 }
  },
  {
    id: 'drona',
    name: 'Drona',
    sanskritName: 'द्रोणाचार्य',
    alliance: 'Kaurava',
    role: 'Royal preceptor, Military Genius',
    avatar: 'gita_chariot_1783523429768.jpg',
    biography: 'The master archer who trained both the Pandava and Kaurava princes. Bound by his employment to the Hastinapur crown, he reluctantly leads the Kaurava army after Bhishma falls, introducing complex battle formations.',
    powers: ['Complete Shastra (Weapon) mastery', 'Chakravyuha design knowledge', 'Celestial weapon summoning'],
    weapons: ['Brahmastra', 'Agneyastra', 'Varunastra'],
    relationships: {
      spouse: 'Kripi',
      children: ['Ashwatthama'],
      rival: 'Drupada'
    },
    importance: 'The teacher who has to fight his favorite student, Arjuna. He represents the tragedy of intellectual compromise, where even a great master’s virtue is stained when tied to corruption.',
    stats: { strength: 85, wisdom: 92, skill: 98, divinity: 80, dharma: 65 }
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'kuru-birth',
    title: 'Origins of the Princes',
    subTitle: 'The Divide Begins',
    year: 'approx 3150 BCE',
    description: 'The Pandavas (sons of King Pandu, born from divine boons) and Kauravas (one hundred sons of the blind King Dhritarashtra and Gandhari) are born in Hastinapur. Mutual jealousy grows from early childhood during training under Kripacharya and Dronacharya.',
    importance: 'The cosmic setup of divine virtues (Pandavas) vs earthly greed and envy (Kauravas).',
    characters: ['yudhishthira', 'duryodhana', 'bhishma'],
    image: 'kurukshetra_twilight_1783523399963.jpg'
  },
  {
    id: 'lac-palace',
    title: 'The Burning Lac Palace',
    subTitle: 'The First Usurpation Attempt',
    year: 'approx 3130 BCE',
    description: 'Duryodhana, fearing Yudhisthira’s claim to the crown, builds a palace of lacquer (highly flammable wax) for the Pandavas in Varnavata, planning to burn them alive. Advised by Vidura, the Pandavas build an underground escape tunnel and flee into the forest.',
    importance: 'This event marks the transition of the Pandavas from royalty to forest dwellers and seals the Kauravas’ treacherous intentions.',
    characters: ['duryodhana', 'yudhishthira'],
    image: 'ancient_bharat_map_1783523445581.jpg'
  },
  {
    id: 'swayamvara',
    title: 'Draupadi’s Swayamvara',
    subTitle: 'The Piercing of the Eye',
    year: 'approx 3125 BCE',
    description: 'Arjuna, disguised as a poor Brahmin, wins the hand of Panchala princess Draupadi by hitting a moving wooden fish’s eye looking only at its reflection in water. Through a mother’s mistaken instruction, Draupadi becomes the common wife of all five brothers.',
    importance: 'This alliance with the powerful Kingdom of Panchala turns the Pandavas back into formidable political rivals.',
    characters: ['arjuna', 'draupadi', 'krishna'],
    image: 'gita_chariot_1783523429768.jpg'
  },
  {
    id: 'dice-game',
    title: 'The Tragic Game of Dice',
    subTitle: 'The Destruction of Honor',
    year: 'approx 3115 BCE',
    description: 'Using loaded magical dice, Shakuni tricks Yudhisthira into wagering his wealth, kingdom, brothers, himself, and finally Queen Draupadi. Draupadi is dragged into the court and publicly humiliated by Dushasana, until Krishna performs a miracle of endless fabric to protect her modesty.',
    importance: 'The turning point of the epic. Draupadi vows not to tie her hair until it is washed in Dushasana’s blood, making war inevitable.',
    characters: ['yudhishthira', 'shakuni', 'draupadi', 'krishna'],
    image: 'krishna_chakra_1783523413370.jpg'
  },
  {
    id: 'forest-exile',
    title: 'Thirteen Years in Exile',
    subTitle: 'Refinement in Fire',
    year: '3115 - 3102 BCE',
    description: 'The Pandavas are exiled for 12 years in forests, followed by one year incognito (Agyatvas) in the Virata Kingdom. During this time, they acquire powerful celestial weapons, learn divine music/dance, and solidify their connection with the suffering masses.',
    importance: 'This period prepares the Pandavas physically and spiritually for the colossal war of civilizations.',
    characters: ['arjuna', 'bhima'],
    image: 'kurukshetra_twilight_1783523399963.jpg'
  },
  {
    id: 'peace-treaty',
    title: 'The Failure of Peace',
    subTitle: 'Krishna’s Final Embassy',
    year: '3102 BCE',
    description: 'Krishna goes to Hastinapur as a peace envoy, asking for just five villages for the five Pandavas. An arrogant Duryodhana refuses, saying he won’t yield land equivalent to the needle’s point, and attempts to arrest Krishna. Krishna reveals his glowing Vishwarupa cosmic form.',
    importance: 'Seals the destiny of the Kauravas. Krishna’s embassy proves that war was the absolute last resort after all peaceful diplomacy failed.',
    characters: ['krishna', 'duryodhana'],
    image: 'krishna_chakra_1783523413370.jpg'
  },
  {
    id: 'bhagavad-gita',
    title: 'The Cosmic Discourse',
    subTitle: 'The Birth of Bhagavad Gita',
    year: '3102 BCE (Day 1 of War)',
    description: 'On the field of Kurukshetra, Arjuna collapses in grief, refusing to kill his relatives, grandfathers, and teachers. Lord Krishna freezes time and delivers the 700-verse Bhagavad Gita, explaining the nature of the soul, cosmic duty (Dharma), and devotion.',
    importance: 'The world’s most renowned spiritual discourse. Arjuna regains his confidence, picks up his Gandiva bow, and stands ready.',
    characters: ['krishna', 'arjuna'],
    image: 'gita_chariot_1783523429768.jpg'
  },
  {
    id: 'war-days',
    title: 'The 18-Day Kurukshetra War',
    subTitle: 'The Clash of Millions',
    year: '3102 BCE',
    description: 'The battle rages for eighteen days. Bhishma falls on Day 10; Abhimanyu is trapped in the Chakravyuha on Day 13; Guru Drona is deceived on Day 15; Karna is slain by Arjuna on Day 17; Duryodhana falls to Bhima on Day 18. An entire civilization’s warrior class is wiped out.',
    importance: 'The cleansing of corrupted forces from earth, paving the way for Yudhishthira to establish an empire of absolute Dharma.',
    characters: ['bhishma', 'drona', 'karna', 'bhima', 'duryodhana'],
    image: 'kurukshetra_twilight_1783523399963.jpg'
  },
  {
    id: 'ending-era',
    title: 'The Golden Sunrise & Departure',
    subTitle: 'The Dawn of Kali Yuga',
    year: 'approx 3066 BCE',
    description: 'After ruling righteously for 36 years, Yudhisthira crowns Abhimanyu’s son Parikshit. Sensing the completion of their cosmic mission, Krishna departs his mortal form, and the Pandavas perform their final pilgrimage, ascending the Himalayas toward heaven.',
    importance: 'The elegant wrap-up of the earthly epic. Transition from Dwapara Yuga to Kali Yuga (the age of machines and mind).',
    characters: ['yudhishthira', 'krishna'],
    image: 'ancient_bharat_map_1783523445581.jpg'
  }
];

export const WEAPONS: Weapon[] = [
  {
    id: 'sudarshan',
    name: 'Sudarshan Chakra',
    sanskritName: 'सुदर्शन चक्र',
    owner: 'Lord Krishna',
    description: 'The legendary spinning disc with 108 serrated edges, created by Vishwakarma from solar matter. It returns to the owner after slicing through any obstacle, and has absolute lock-on properties.',
    origin: 'Forged from cosmic solar sparks by celestial architect Vishwakarma, gifted to Krishna by Agni.',
    capabilities: ['Spins at infinite velocity', 'Unstoppable kinetic force', 'Returns automatically to the wielder’s finger', 'Absolute tracking'],
    astralType: true
  },
  {
    id: 'gandiva',
    name: 'Gandiva Bow',
    sanskritName: 'गाण्डीव',
    owner: 'Arjuna',
    description: 'The giant celestial bow created by Brahma, possessing 100 gold strings and a visual body that glows in darkness. It cannot be damaged by any mortal weapon and doubles the velocity of arrows.',
    origin: 'Crafted by Brahma, passed to Soma, Varuna, and finally gifted to Arjuna by Agni for the Khandava forest battle.',
    capabilities: ['Infallible accuracy', 'Makes a sound like thunder that demoralizes enemy forces', 'Withstands celestial temperatures', 'Allows multi-arrow targeting'],
    astralType: false
  },
  {
    id: 'vasavi',
    name: 'Vasavi Shakti spear',
    sanskritName: 'वासवी शक्ति',
    owner: 'Karna (gifted by Indra)',
    description: 'A divine golden dart of absolute assassination that never misses its target. It can only be used once, after which it returns to the king of gods, Indra.',
    origin: 'Gifted by Indra to Karna in exchange for Karna’s legendary natural body armor (Kavach-Kundal).',
    capabilities: ['Guaranteed single-hit kill', 'Bypasses any divine shield or barrier', 'Dissolves after single activation'],
    astralType: true
  },
  {
    id: 'brahmastra',
    name: 'Brahmastra / Brahmashira',
    sanskritName: 'ब्रह्मास्त्र',
    owner: 'Drona, Arjuna, Ashwatthama, Karna',
    description: 'The absolute weapon representing the concentrated creative and destructive force of Brahma. Invoked by secret chants on a single blade of grass or arrow. Destroys ecological biomes and causes multi-generational droughts.',
    origin: 'Invoked through deep mental mantras using localized cosmic energy.',
    capabilities: ['Total environmental destruction', 'Blinding light equivalent to 1,000 suns', 'Vaporizes armies in a flash', 'Renders land infertile for centuries'],
    astralType: true
  },
  {
    id: 'pashupata',
    name: 'Pashupatastra',
    sanskritName: 'पाशुपतास्त्र',
    owner: 'Arjuna',
    description: 'The supreme personal weapon of Lord Shiva, capable of destroying all creation. It must never be used against lesser foes or mortal warriors, as it would destroy the world. Arjuna obtained it through intense penance.',
    origin: 'Gifted by Lord Shiva himself in deep Himalayan valleys.',
    capabilities: ['Mental projection activation', 'Can obliterate entire planetary bodies', 'Commands armies of phantom spirits to overwhelm opponents'],
    astralType: true
  }
];

export const KINGDOMS: Kingdom[] = [
  {
    id: 'hastinapur',
    name: 'Hastinapur',
    modernLocation: 'Meerut, Uttar Pradesh',
    history: 'The magnificent capital of the Kuru Dynasty, named after King Hasti. It served as the throne over which the colossal Mahabharata war was fought, representing the ultimate center of Indian political gravity.',
    ruler: 'Dhritarashtra / Duryodhana (initially), Yudhishthira (post-war)',
    importance: 'The central city of conflict. The court halls witnessed the tragic dice game and Draupadi’s humiliation.',
    coordinate: { x: 48, y: 35 }
  },
  {
    id: 'indraprastha',
    name: 'Indraprastha',
    modernLocation: 'New Delhi (Purana Qila)',
    history: 'A magnificent futuristic city built over the barren Khandava Forest by the divine architect Maya Danava for the Pandavas. Its royal palace featured floors of optical illusions where water looked like solid marble and vice versa.',
    ruler: 'Yudhishthira',
    importance: 'The jewel of the Pandavas. Its visual splendor and wealth triggered Duryodhana’s toxic envy.',
    coordinate: { x: 45, y: 37 }
  },
  {
    id: 'dwarka',
    name: 'Dwarka',
    modernLocation: 'Submerged off the coast of Gujarat',
    history: 'The legendary marine fortress city built by Vishwakarma under Krishna’s instruction. Rebuilt in the Arabian Sea to protect the Yadavas from repeated attacks by Jarasandha. It was ultimately submerged after Krishna’s departure.',
    ruler: 'Lord Krishna / Ugrasena',
    importance: 'The ultimate sanctuary of wisdom and wealth. Represented high-tech ancient maritime architecture.',
    coordinate: { x: 18, y: 55 }
  },
  {
    id: 'panchala',
    name: 'Panchala',
    modernLocation: 'Rohilkhand, Uttar Pradesh',
    history: 'The powerful kingdom ruled by King Drupada, divided into North and South Panchala. Home of Draupadi and Dhrishtadyumna. Highly sophisticated cultural and educational center of the Vedic era.',
    ruler: 'King Drupada',
    importance: 'Provided the military and matrimonial alliance that revived the Pandava cause after their exile.',
    coordinate: { x: 55, y: 38 }
  },
  {
    id: 'anga',
    name: 'Anga Kingdom',
    modernLocation: 'Bhagalpur, Bihar',
    history: 'A prosperous eastern kingdom gifted to Karna by Duryodhana, who crowned him King of Anga on the spot to make him eligible to challenge Arjuna in a royal tournament.',
    ruler: 'Karna',
    importance: 'Symbol of Karna’s dignity and friendship with Duryodhana, and key eastern ally to the Kuru coalition.',
    coordinate: { x: 75, y: 45 }
  },
  {
    id: 'gandhara',
    name: 'Gandhara',
    modernLocation: 'Kandahar, Afghanistan & Peshawar, Pakistan',
    history: 'The northernmost kingdom of ancient Bharat, situated along the Silk Road. Known for its distinct blue clay art, stone sculptures, and the strategic mastery of its princes. Birthplace of Queen Gandhari and Shakuni.',
    ruler: 'King Subala / Shakuni',
    importance: 'The origin point of the subversive strategy that poisoned the Hastinapur royal court from within.',
    coordinate: { x: 12, y: 15 }
  }
];

export const FAMILY_TREE: FamilyNode[] = [
  // Generation 1 (Ancestors)
  { id: 'shantanu', name: 'King Shantanu', spouse: 'Ganga / Satyavati', generation: 1, children: ['bhishma', 'vichitravirya'], alliance: 'Neutral' },
  { id: 'bhishma', name: 'Bhishma (Devavrata)', generation: 2, alliance: 'Kaurava' },
  { id: 'vichitravirya', name: 'Vichitravirya', spouse: 'Ambika / Ambalika', generation: 2, children: ['dhritarashtra', 'pandu', 'vidura'], alliance: 'Neutral' },
  
  // Generation 3
  { id: 'dhritarashtra', name: 'King Dhritarashtra', spouse: 'Gandhari', generation: 3, children: ['duryodhana', 'dushasana', 'kuru_others'], alliance: 'Kaurava' },
  { id: 'pandu', name: 'King Pandu', spouse: 'Kunti / Madri', generation: 3, children: ['karna', 'yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva'], alliance: 'Pandava' },
  { id: 'vidura', name: 'Sage Vidura (Counselor)', generation: 3, alliance: 'Neutral' },

  // Generation 4 (The Cousins)
  { id: 'karna', name: 'Karna (First born)', generation: 4, alliance: 'Kaurava' },
  { id: 'yudhishthira', name: 'Yudhishthira', spouse: 'Draupadi', generation: 4, children: ['prativindhya'], alliance: 'Pandava' },
  { id: 'bhima', name: 'Bhima', spouse: 'Draupadi / Hidimbi', generation: 4, children: ['ghatotkacha', 'sutasoma'], alliance: 'Pandava' },
  { id: 'arjuna', name: 'Arjuna', spouse: 'Draupadi / Subhadra', generation: 4, children: ['abhimanyu', 'shrutakarma'], alliance: 'Pandava' },
  { id: 'nakula', name: 'Nakula', spouse: 'Draupadi', generation: 4, children: ['shatanika'], alliance: 'Pandava' },
  { id: 'sahadeva', name: 'Sahadeva', spouse: 'Draupadi', generation: 4, children: ['shrutasena'], alliance: 'Pandava' },
  
  { id: 'duryodhana', name: 'Duryodhana', spouse: 'Bhanumati', generation: 4, children: ['lakshman_kumara'], alliance: 'Kaurava' },
  { id: 'dushasana', name: 'Dushasana', generation: 4, alliance: 'Kaurava' },

  // Generation 5
  { id: 'abhimanyu', name: 'Abhimanyu (Arjuna’s Son)', spouse: 'Uttara', generation: 5, children: ['parikshit'], alliance: 'Pandava' },
  { id: 'ghatotkacha', name: 'Ghatotkacha (Bhima’s Giant Son)', generation: 5, alliance: 'Pandava' },
  
  // Generation 6
  { id: 'parikshit', name: 'King Parikshit (Saves the Lineage)', generation: 6, alliance: 'Pandava' }
];

export interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  meaning: string;
  seekerState: string; // What problem it solves for the reader
}

export const GITA_VERSES: GitaVerse[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi",
    english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inactive slacking.",
    meaning: "Focus fully on your effort and process rather than worrying about outcomes. This frees the mind from performance anxiety and allows pure excellence in the present moment.",
    seekerState: "Overwhelmed by fear of failure & results"
  },
  {
    chapter: 2,
    verse: 20,
    sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
    transliteration: "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato ’yaṁ purāṇo\nna hanyate hanyamāne śarīre",
    english: "The soul is never born, nor does it ever die. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, permanent and ancient. It is not destroyed when the body is destroyed.",
    meaning: "Death is merely a transition of the physical shell. The true essence of a human—the consciousness—is absolute, immortal, and eternal. This teaching eliminates the deep existential dread of mortality.",
    seekerState: "Grief, loss of loved ones, existential fear"
  },
  {
    chapter: 4,
    verse: 7,
    sanskrit: "यदा यदा ही धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    english: "Whenever there is a decline in righteousness (Dharma) and a rise in unrighteousness (Adharma), O Bharata, at that time I manifest Myself on Earth.",
    meaning: "There is an inherent self-correcting cosmic mechanism in the universe. When moral order collapses completely, a divine force or collective consciousness emerges to restore balance, truth, and peace.",
    seekerState: "Hopelessness in the face of societal evil & corruption"
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
    english: "Elevate yourself through your own mind, and do not degrade yourself. For the mind is the greatest friend of the self, and the mind is also the greatest enemy of the self.",
    meaning: "Your ultimate potential and your worst downfalls are both governed by your state of mind. Mastery of self is the only true liberation; self-pity is a spiritual trap.",
    seekerState: "Low self-esteem, self-doubt, addiction"
  },
  {
    chapter: 18,
    verse: 78,
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
    transliteration: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama",
    english: "Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the supreme archer, there will surely be wealth, victory, extraordinary power, and moral integrity.",
    meaning: "When divine wisdom (Krishna) is combined with dedicated action and focused skill (Arjuna), victory and moral prosperity are absolutely guaranteed. The alignment of intention and execution leads to triumph.",
    seekerState: "Seeking confidence in collaborative projects or life paths"
  }
];
