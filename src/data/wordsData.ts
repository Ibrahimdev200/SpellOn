import type { Word, ClassLevel } from '../types';

export const INITIAL_WORDS: Word[] = [
  // PRIMARY 1
  {
    id: 'p1-1',
    word: 'cat',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Animals',
    phonetic: 'KAT',
    meaning: 'A small furry animal often kept as a pet.',
    exampleSentence: 'The cat sleeps on the soft mat.'
  },
  {
    id: 'p1-2',
    word: 'dog',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Animals',
    phonetic: 'DOG',
    meaning: 'A friendly animal that barks and guards homes.',
    exampleSentence: 'My dog loves to run in the park.'
  },
  {
    id: 'p1-3',
    word: 'sun',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Nature',
    phonetic: 'SUN',
    meaning: 'The bright star in the sky that gives light and warmth.',
    exampleSentence: 'The sun shines brightly in the morning.'
  },
  {
    id: 'p1-4',
    word: 'ball',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Toys & Play',
    phonetic: 'BAWL',
    meaning: 'A round object used in games and sports.',
    exampleSentence: 'I kick the red ball to my friend.'
  },
  {
    id: 'p1-5',
    word: 'book',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'School',
    phonetic: 'BOOK',
    meaning: 'Pages bound together with words and pictures for reading.',
    exampleSentence: 'She reads a fun story book.'
  },
  {
    id: 'p1-6',
    word: 'pen',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'School',
    phonetic: 'PEN',
    meaning: 'A tool used for writing with ink.',
    exampleSentence: 'Use a blue pen to write your name.'
  },
  {
    id: 'p1-7',
    word: 'boy',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'People',
    phonetic: 'BOY',
    meaning: 'A young male child.',
    exampleSentence: 'The boy plays happily outside.'
  },
  {
    id: 'p1-8',
    word: 'girl',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'People',
    phonetic: 'GURL',
    meaning: 'A young female child.',
    exampleSentence: 'The girl sings a sweet song.'
  },
  {
    id: 'p1-9',
    word: 'bag',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'School',
    phonetic: 'BAG',
    meaning: 'A container used to hold and carry items.',
    exampleSentence: 'Put your books inside your school bag.'
  },
  {
    id: 'p1-10',
    word: 'cup',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Everyday',
    phonetic: 'KUP',
    meaning: 'A small container used for drinking liquids.',
    exampleSentence: 'He drinks warm milk from his cup.'
  },
  {
    id: 'p1-11',
    word: 'star',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Nature',
    phonetic: 'STAR',
    meaning: 'A tiny point of light in the night sky.',
    exampleSentence: 'Look at the bright star up above!'
  },
  {
    id: 'p1-12',
    word: 'fish',
    classLevel: 'Primary 1',
    difficulty: 1,
    category: 'Animals',
    phonetic: 'FISH',
    meaning: 'A creature that lives and swims in water.',
    exampleSentence: 'The little fish swims in the clear pond.'
  },

  // PRIMARY 2
  {
    id: 'p2-1',
    word: 'happy',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Feelings',
    phonetic: 'HAP-ee',
    meaning: 'Feeling or showing joy and pleasure.',
    exampleSentence: 'We feel happy when we learn new words.'
  },
  {
    id: 'p2-2',
    word: 'school',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'School',
    phonetic: 'SKOOL',
    meaning: 'A place where students learn from teachers.',
    exampleSentence: 'I walk to school with my friends.'
  },
  {
    id: 'p2-3',
    word: 'garden',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Nature',
    phonetic: 'GAR-dn',
    meaning: 'A piece of ground used for growing flowers or plants.',
    exampleSentence: 'Beautiful flowers bloom in the garden.'
  },
  {
    id: 'p2-4',
    word: 'mother',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Family',
    phonetic: 'MUTH-er',
    meaning: 'A female parent.',
    exampleSentence: 'My mother prepares a delicious breakfast.'
  },
  {
    id: 'p2-5',
    word: 'father',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Family',
    phonetic: 'FAH-ther',
    meaning: 'A male parent.',
    exampleSentence: 'My father helps me with my homework.'
  },
  {
    id: 'p2-6',
    word: 'window',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Home',
    phonetic: 'WIN-doh',
    meaning: 'An opening in a wall that lets in light and air.',
    exampleSentence: 'Please open the window to get fresh air.'
  },
  {
    id: 'p2-7',
    word: 'yellow',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Colors',
    phonetic: 'YEL-oh',
    meaning: 'The color of ripe bananas or the sun.',
    exampleSentence: 'She wears a bright yellow dress.'
  },
  {
    id: 'p2-8',
    word: 'morning',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Time',
    phonetic: 'MOR-ning',
    meaning: 'The early part of the day from sunrise to noon.',
    exampleSentence: 'Say good morning to your teacher.'
  },
  {
    id: 'p2-9',
    word: 'teacher',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'School',
    phonetic: 'TEE-cher',
    meaning: 'A person who helps students learn.',
    exampleSentence: 'Our teacher explains the lesson clearly.'
  },
  {
    id: 'p2-10',
    word: 'friend',
    classLevel: 'Primary 2',
    difficulty: 1,
    category: 'Social',
    phonetic: 'FREND',
    meaning: 'A person you know, like, and trust.',
    exampleSentence: 'She is a kind and helpful friend.'
  },

  // PRIMARY 3
  {
    id: 'p3-1',
    word: 'animal',
    classLevel: 'Primary 3',
    difficulty: 1,
    category: 'Nature',
    phonetic: 'AN-uh-muhl',
    meaning: 'A living creature such as a dog, bird, or elephant.',
    exampleSentence: 'The zoo has many wild animals.'
  },
  {
    id: 'p3-2',
    word: 'beautiful',
    classLevel: 'Primary 3',
    difficulty: 2,
    category: 'Adjectives',
    phonetic: 'BYOO-ti-ful',
    meaning: 'Something that is very pleasant to look at or hear.',
    exampleSentence: 'The garden is beautiful in springtime.'
  },
  {
    id: 'p3-3',
    word: 'holiday',
    classLevel: 'Primary 3',
    difficulty: 2,
    category: 'Life',
    phonetic: 'HOL-i-day',
    meaning: 'A day of rest or celebration away from school or work.',
    exampleSentence: 'We travel to visit family during the holiday.'
  },
  {
    id: 'p3-4',
    word: 'market',
    classLevel: 'Primary 3',
    difficulty: 1,
    category: 'Community',
    phonetic: 'MAR-kit',
    meaning: 'A place where people buy and sell goods and food.',
    exampleSentence: 'We bought fresh fruit at the weekend market.'
  },
  {
    id: 'p3-5',
    word: 'village',
    classLevel: 'Primary 3',
    difficulty: 2,
    category: 'Geography',
    phonetic: 'VIL-ij',
    meaning: 'A small town or settlement in a countryside area.',
    exampleSentence: 'My grandparents live in a peaceful village.'
  },
  {
    id: 'p3-6',
    word: 'kitchen',
    classLevel: 'Primary 3',
    difficulty: 1,
    category: 'Home',
    phonetic: 'KICH-en',
    meaning: 'A room where food is cooked and prepared.',
    exampleSentence: 'The kitchen smells like warm cookies.'
  },
  {
    id: 'p3-7',
    word: 'brother',
    classLevel: 'Primary 3',
    difficulty: 1,
    category: 'Family',
    phonetic: 'BRUTH-er',
    meaning: 'A male sibling with the same parents.',
    exampleSentence: 'My older brother plays football with me.'
  },
  {
    id: 'p3-8',
    word: 'picture',
    classLevel: 'Primary 3',
    difficulty: 1,
    category: 'Art',
    phonetic: 'PIK-cher',
    meaning: 'A painting, drawing, or photograph of something.',
    exampleSentence: 'Draw a colorful picture of your home.'
  },
  {
    id: 'p3-9',
    word: 'country',
    classLevel: 'Primary 3',
    difficulty: 2,
    category: 'Geography',
    phonetic: 'KUN-tree',
    meaning: 'A nation with its own government and territory.',
    exampleSentence: 'Our country is full of vibrant cultures.'
  },
  {
    id: 'p3-10',
    word: 'hospital',
    classLevel: 'Primary 3',
    difficulty: 2,
    category: 'Health',
    phonetic: 'HOS-pi-tl',
    meaning: 'A place where doctors care for sick people.',
    exampleSentence: 'The doctor works hard at the regional hospital.'
  },

  // PRIMARY 4
  {
    id: 'p4-1',
    word: 'important',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Vocabulary',
    phonetic: 'im-POR-tnt',
    meaning: 'Of great value, significance, or consequence.',
    exampleSentence: 'Eating healthy food is very important.'
  },
  {
    id: 'p4-2',
    word: 'different',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Vocabulary',
    phonetic: 'DIF-er-uhnt',
    meaning: 'Not the same as another; distinct or varied.',
    exampleSentence: 'Everyone has different skills and talents.'
  },
  {
    id: 'p4-3',
    word: 'carefully',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Adverbs',
    phonetic: 'KAIR-fuh-lee',
    meaning: 'Done with attention, caution, and clear thought.',
    exampleSentence: 'Read the exam instructions carefully.'
  },
  {
    id: 'p4-4',
    word: 'remember',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Verbs',
    phonetic: 'ri-MEM-ber',
    meaning: 'To keep something in mind or recall from memory.',
    exampleSentence: 'Always remember to say thank you.'
  },
  {
    id: 'p4-5',
    word: 'discover',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Science',
    phonetic: 'dih-SKUV-er',
    meaning: 'To find or learn something new for the first time.',
    exampleSentence: 'Scientists discover fascinating facts about space.'
  },
  {
    id: 'p4-6',
    word: 'together',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Social',
    phonetic: 'tuh-GETH-er',
    meaning: 'In company with others; working as a unit.',
    exampleSentence: 'We complete our team project together.'
  },
  {
    id: 'p4-7',
    word: 'wonderful',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Adjectives',
    phonetic: 'WUN-der-ful',
    meaning: 'Extremely good, marvelous, or inspiring awe.',
    exampleSentence: 'What a wonderful speech you gave today!'
  },
  {
    id: 'p4-8',
    word: 'question',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'School',
    phonetic: 'KWES-chuhn',
    meaning: 'A sentence asked to get information or answers.',
    exampleSentence: 'Raise your hand if you have a question.'
  },
  {
    id: 'p4-9',
    word: 'answer',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'School',
    phonetic: 'AN-ser',
    meaning: 'A response given to a question or problem.',
    exampleSentence: 'She gave the correct answer to the math problem.'
  },
  {
    id: 'p4-10',
    word: 'exercise',
    classLevel: 'Primary 4',
    difficulty: 2,
    category: 'Health',
    phonetic: 'EK-ser-size',
    meaning: 'Physical activity done to keep healthy and strong.',
    exampleSentence: 'Daily exercise keeps your body energetic.'
  },

  // PRIMARY 5
  {
    id: 'p5-1',
    word: 'environment',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Science',
    phonetic: 'en-VY-ruhn-muhnt',
    meaning: 'The natural surroundings in which plants and animals live.',
    exampleSentence: 'We must protect our natural environment.'
  },
  {
    id: 'p5-2',
    word: 'education',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Learning',
    phonetic: 'ej-uh-KAY-shuhn',
    meaning: 'The process of receiving or giving systematic instruction.',
    exampleSentence: 'Good education opens doors to great opportunities.'
  },
  {
    id: 'p5-3',
    word: 'knowledge',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Learning',
    phonetic: 'NOL-ij',
    meaning: 'Information, understanding, and skills gained through learning.',
    exampleSentence: 'Reading books expands your general knowledge.'
  },
  {
    id: 'p5-4',
    word: 'community',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Society',
    phonetic: 'kuh-MYOO-ni-tee',
    meaning: 'A group of people living together in the same area.',
    exampleSentence: 'Our community organized a neighborhood cleanup.'
  },
  {
    id: 'p5-5',
    word: 'responsibility',
    classLevel: 'Primary 5',
    difficulty: 3,
    category: 'Character',
    phonetic: 'ri-spon-suh-BIL-i-tee',
    meaning: 'The duty to care for something or make wise decisions.',
    exampleSentence: 'Taking responsibility builds trustworthy character.'
  },
  {
    id: 'p5-6',
    word: 'successful',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Achievement',
    phonetic: 'suhk-SES-ful',
    meaning: 'Achieving desired goals or positive outcomes.',
    exampleSentence: 'Hard work leads to a successful outcome.'
  },
  {
    id: 'p5-7',
    word: 'information',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Technology',
    phonetic: 'in-fer-MAY-shuhn',
    meaning: 'Facts or details learned about a topic or event.',
    exampleSentence: 'Look up accurate information in the library.'
  },
  {
    id: 'p5-8',
    word: 'experience',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Life',
    phonetic: 'ik-SPEER-ee-uhns',
    meaning: 'Practical contact with and observation of events.',
    exampleSentence: 'Volunteering is a rewarding life experience.'
  },
  {
    id: 'p5-9',
    word: 'adventure',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Stories',
    phonetic: 'ad-VEN-cher',
    meaning: 'An exciting, unusual, or daring experience.',
    exampleSentence: 'The explorer went on a jungle adventure.'
  },
  {
    id: 'p5-10',
    word: 'dictionary',
    classLevel: 'Primary 5',
    difficulty: 2,
    category: 'Language',
    phonetic: 'DIK-shuh-ner-ee',
    meaning: 'A reference book listing words and their meanings.',
    exampleSentence: 'Use a dictionary to check difficult words.'
  },

  // PRIMARY 6
  {
    id: 'p6-1',
    word: 'communication',
    classLevel: 'Primary 6',
    difficulty: 3,
    category: 'Language',
    phonetic: 'kuh-myoo-ni-KAY-shuhn',
    meaning: 'The exchanging of information, ideas, or thoughts.',
    exampleSentence: 'Clear communication resolves misunderstandings.'
  },
  {
    id: 'p6-2',
    word: 'opportunity',
    classLevel: 'Primary 6',
    difficulty: 3,
    category: 'Life',
    phonetic: 'op-er-TOO-ni-tee',
    meaning: 'A favorable time or situation to achieve something.',
    exampleSentence: 'Seize every opportunity to learn new skills.'
  },
  {
    id: 'p6-3',
    word: 'development',
    classLevel: 'Primary 6',
    difficulty: 3,
    category: 'Growth',
    phonetic: 'dih-VEL-uhp-muhnt',
    meaning: 'The process of growing, improving, or advancing.',
    exampleSentence: 'Technology plays a major role in modern development.'
  },
  {
    id: 'p6-4',
    word: 'government',
    classLevel: 'Primary 6',
    difficulty: 2,
    category: 'Civics',
    phonetic: 'GUV-ern-muhnt',
    meaning: 'The governing body of a nation, state, or community.',
    exampleSentence: 'The government builds schools and hospitals.'
  },
  {
    id: 'p6-5',
    word: 'confidence',
    classLevel: 'Primary 6',
    difficulty: 2,
    category: 'Character',
    phonetic: 'KON-fi-duhns',
    meaning: 'A feeling of self-assurance and belief in one’s abilities.',
    exampleSentence: 'Practice speaking aloud to boost your confidence.'
  },
  {
    id: 'p6-6',
    word: 'achievement',
    classLevel: 'Primary 6',
    difficulty: 3,
    category: 'Success',
    phonetic: 'uh-CHEEV-muhnt',
    meaning: 'A thing done successfully with effort, courage, or skill.',
    exampleSentence: 'Winning the spelling bee was a proud achievement.'
  },
  {
    id: 'p6-7',
    word: 'relationship',
    classLevel: 'Primary 6',
    difficulty: 3,
    category: 'Social',
    phonetic: 'ri-LAY-shuhn-ship',
    meaning: 'The way in which two or more people are connected.',
    exampleSentence: 'Building a strong relationship requires respect.'
  },
  {
    id: 'p6-8',
    word: 'imagination',
    classLevel: 'Primary 6',
    difficulty: 2,
    category: 'Creative',
    phonetic: 'ih-maj-uh-NAY-shuhn',
    meaning: 'The ability to form new ideas or mental images.',
    exampleSentence: 'Creative writing sparks your imagination.'
  },
  {
    id: 'p6-9',
    word: 'technology',
    classLevel: 'Primary 6',
    difficulty: 2,
    category: 'Science',
    phonetic: 'tek-NOL-uh-jee',
    meaning: 'Application of scientific knowledge for practical purposes.',
    exampleSentence: 'Modern technology connects people around the globe.'
  },
  {
    id: 'p6-10',
    word: 'leadership',
    classLevel: 'Primary 6',
    difficulty: 2,
    category: 'Character',
    phonetic: 'LEE-der-ship',
    meaning: 'The action or position of guiding and inspiring a group.',
    exampleSentence: 'Good leadership encourages team cooperation.'
  },

  // JSS 1
  {
    id: 'j1-1',
    word: 'responsibility',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Ethics',
    phonetic: 'ri-spon-suh-BIL-i-tee',
    meaning: 'The state or fact of having a duty to deal with something.',
    exampleSentence: 'Students have the responsibility to study hard.'
  },
  {
    id: 'j1-2',
    word: 'independent',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Character',
    phonetic: 'in-dih-PEN-duhnt',
    meaning: 'Free from outside control; self-governing and self-reliant.',
    exampleSentence: 'Learning to work independently builds strong focus.'
  },
  {
    id: 'j1-3',
    word: 'understanding',
    classLevel: 'JSS 1',
    difficulty: 2,
    category: 'Academics',
    phonetic: 'un-der-STAN-ding',
    meaning: 'The ability to comprehend and perceive full meaning.',
    exampleSentence: 'Deep understanding comes from asking questions.'
  },
  {
    id: 'j1-4',
    word: 'application',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Technology',
    phonetic: 'ap-li-KAY-shuhn',
    meaning: 'Putting a practical idea or computer code into action.',
    exampleSentence: 'We built a functional web application for learning.'
  },
  {
    id: 'j1-5',
    word: 'organization',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Management',
    phonetic: 'or-guh-nuh-ZAY-shuhn',
    meaning: 'An organized body of people with a particular purpose.',
    exampleSentence: 'Good organization keeps study schedules efficient.'
  },
  {
    id: 'j1-6',
    word: 'investigation',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Science',
    phonetic: 'in-ves-tuh-GAY-shuhn',
    meaning: 'A formal inquiry or systematic search for facts.',
    exampleSentence: 'The science investigation revealed surprising findings.'
  },
  {
    id: 'j1-7',
    word: 'collaboration',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Teamwork',
    phonetic: 'kuh-lab-uh-RAY-shuhn',
    meaning: 'The action of working with someone to produce something.',
    exampleSentence: 'Team collaboration brings diverse ideas together.'
  },
  {
    id: 'j1-8',
    word: 'atmosphere',
    classLevel: 'JSS 1',
    difficulty: 2,
    category: 'Geography',
    phonetic: 'AT-muhs-feer',
    meaning: 'The envelope of gases surrounding the earth or another planet.',
    exampleSentence: 'The earth atmosphere shields us from radiation.'
  },
  {
    id: 'j1-9',
    word: 'philosophy',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Humanities',
    phonetic: 'fuh-LOS-uh-fee',
    meaning: 'The study of fundamental nature of knowledge and reality.',
    exampleSentence: 'Ancient philosophy explored wisdom and ethics.'
  },
  {
    id: 'j1-10',
    word: 'efficiency',
    classLevel: 'JSS 1',
    difficulty: 3,
    category: 'Performance',
    phonetic: 'ih-FISH-uhn-see',
    meaning: 'Achieving maximum productivity with minimum wasted effort.',
    exampleSentence: 'Time management increases academic efficiency.'
  },

  // JSS 2
  {
    id: 'j2-1',
    word: 'pronunciation',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Phonetics',
    phonetic: 'pruh-nuhn-see-AY-shuhn',
    meaning: 'The way in which a word is correctly spoken aloud.',
    exampleSentence: 'Clear pronunciation makes spoken communication effective.'
  },
  {
    id: 'j2-2',
    word: 'communication',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Language',
    phonetic: 'kuh-myoo-ni-KAY-shuhn',
    meaning: 'Imparting or exchanging of information by speaking or writing.',
    exampleSentence: 'Effective communication is essential in leadership.'
  },
  {
    id: 'j2-3',
    word: 'environmental',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Ecology',
    phonetic: 'en-vy-ruhn-MEN-tl',
    meaning: 'Relating to the natural environment and its conservation.',
    exampleSentence: 'Environmental protection requires global effort.'
  },
  {
    id: 'j2-4',
    word: 'determination',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Character',
    phonetic: 'dih-tur-mi-NAY-shuhn',
    meaning: 'Firmness of purpose and resoluteness to achieve a goal.',
    exampleSentence: 'Her determination helped her master difficult words.'
  },
  {
    id: 'j2-5',
    word: 'concentration',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Focus',
    phonetic: 'kon-suhn-TRAY-shuhn',
    meaning: 'The action or power of focusing one’s full attention.',
    exampleSentence: 'Quiet rooms improve concentration during revision.'
  },
  {
    id: 'j2-6',
    word: 'qualification',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Academics',
    phonetic: 'kwol-uh-fi-KAY-shuhn',
    meaning: 'A quality or accomplishment that makes one suitable for a task.',
    exampleSentence: 'Earning your academic qualification takes dedication.'
  },
  {
    id: 'j2-7',
    word: 'significant',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Vocabulary',
    phonetic: 'sig-NIF-i-kuhnt',
    meaning: 'Sufficiently great or important to be worthy of attention.',
    exampleSentence: 'Daily practice makes a significant difference.'
  },
  {
    id: 'j2-8',
    word: 'contribution',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Society',
    phonetic: 'kon-truh-BYOO-shuhn',
    meaning: 'A gift or effort given to help achieve or provide something.',
    exampleSentence: 'Every student made a valuable contribution to class.'
  },
  {
    id: 'j2-9',
    word: 'sustainability',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Ecology',
    phonetic: 'suh-stay-nuh-BIL-i-tee',
    meaning: 'The ability to maintain ecological balance without depletion.',
    exampleSentence: 'Renewable energy promotes environmental sustainability.'
  },
  {
    id: 'j2-10',
    word: 'comprehension',
    classLevel: 'JSS 2',
    difficulty: 3,
    category: 'Reading',
    phonetic: 'kom-pri-HEN-shuhn',
    meaning: 'The ability to understand the meaning of written text.',
    exampleSentence: 'Reading daily sharpens your reading comprehension.'
  },

  // JSS 3
  {
    id: 'j3-1',
    word: 'extraordinary',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Vocabulary',
    phonetic: 'ik-STROR-dn-er-ee',
    meaning: 'Very unusual, remarkable, or exceptional in quality.',
    exampleSentence: 'She displayed extraordinary talent in public speaking.'
  },
  {
    id: 'j3-2',
    word: 'entrepreneurship',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Business',
    phonetic: 'ahn-truh-pruh-NUR-ship',
    meaning: 'The activity of setting up businesses and taking risks for profit.',
    exampleSentence: 'Youth entrepreneurship drives economic innovation.'
  },
  {
    id: 'j3-3',
    word: 'administration',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Management',
    phonetic: 'ad-min-uh-STRAY-shuhn',
    meaning: 'The process or activity of running a business or institution.',
    exampleSentence: 'School administration ensures smooth daily operations.'
  },
  {
    id: 'j3-4',
    word: 'consideration',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Ethics',
    phonetic: 'kuhn-sid-uh-RAY-shuhn',
    meaning: 'Careful thought over a period of time, or empathy for others.',
    exampleSentence: 'Show thoughtful consideration for different viewpoints.'
  },
  {
    id: 'j3-5',
    word: 'characteristic',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Science',
    phonetic: 'kair-ik-tuh-RIS-tik',
    meaning: 'A feature or quality belonging typically to a person or thing.',
    exampleSentence: 'Curiosity is a key characteristic of great inventors.'
  },
  {
    id: 'j3-6',
    word: 'misunderstanding',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Language',
    phonetic: 'mis-uhn-der-STAN-ding',
    meaning: 'A failure to understand something correctly.',
    exampleSentence: 'Polite dialogue can clear up any misunderstanding.'
  },
  {
    id: 'j3-7',
    word: 'international',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Global Studies',
    phonetic: 'in-ter-NASH-nuhl',
    meaning: 'Existing, occurring, or carried on between two or more nations.',
    exampleSentence: 'English is a major language for international trade.'
  },
  {
    id: 'j3-8',
    word: 'professional',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Career',
    phonetic: 'pruh-FESH-uh-nuhl',
    meaning: 'Relating to or belonging to a profession; highly skilled.',
    exampleSentence: 'He maintains a respectful and professional attitude.'
  },
  {
    id: 'j3-9',
    word: 'infrastructure',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Civics',
    phonetic: 'IN-fruh-struk-cher',
    meaning: 'Basic physical and organizational structures needed for society.',
    exampleSentence: 'Good digital infrastructure connects schools across cities.'
  },
  {
    id: 'j3-10',
    word: 'transformation',
    classLevel: 'JSS 3',
    difficulty: 3,
    category: 'Growth',
    phonetic: 'trans-fer-MAY-shuhn',
    meaning: 'A thorough or dramatic change in form, appearance, or character.',
    exampleSentence: 'Education brings positive transformation to communities.'
  }
];

export const CLASS_LEVELS: ClassLevel[] = [
  'Primary 1',
  'Primary 2',
  'Primary 3',
  'Primary 4',
  'Primary 5',
  'Primary 6',
  'JSS 1',
  'JSS 2',
  'JSS 3'
];
