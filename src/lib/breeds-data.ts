export interface Breed {
  id: string;
  name: string;
  type: string;
  typeSlug: string;
  image: string;
  size: string;
  temperament: string[];
  lifespan: string;
  weight: string;
  height: string;
  origin: string;
  description: string;
  characteristics: {
    friendliness: number;
    energyLevel: number;
    trainability: number;
    groomingNeeds: number;
    healthIssues: number;
  };
  funFacts: string[];
  careInfo: {
    exercise: string;
    grooming: string;
    nutrition: string;
    training: string;
  };
  price: string;
}

export interface BreedType {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  breedCount: number;
}

export const breedTypes: BreedType[] = [
  {
    id: "1",
    slug: "sporting",
    name: "Sporting Dogs",
    description:
      "Active, alert, and friendly dogs bred for hunting and retrieving. Perfect for active families who love outdoor adventures.",
    image: "/sporting.jpg",
    breedCount: 8,
  },
  {
    id: "2",
    slug: "working",
    name: "Working Dogs",
    description:
      "Strong, intelligent dogs bred for tasks like guarding, pulling sleds, and rescue work. Loyal protectors and hardworking companions.",
    image: "/working.jpg",
    breedCount: 10,
  },
  {
    id: "3",
    slug: "herding",
    name: "Herding Dogs",
    description:
      "Highly intelligent dogs with natural instincts for controlling livestock. Excellent family pets known for their loyalty and trainability.",
    image: "/herding.jpg",
    breedCount: 7,
  },
  {
    id: "4",
    slug: "toy",
    name: "Toy Dogs",
    description:
      "Small, affectionate companions perfect for apartment living. Big personalities in tiny packages, ideal for those seeking a loving lap dog.",
    image: "/toy.jpg",
    breedCount: 9,
  },
  {
    id: "5",
    slug: "terrier",
    name: "Terrier Dogs",
    description:
      "Feisty, energetic dogs with bold personalities. Originally bred for hunting vermin, they make spirited and entertaining family pets.",
    image: "/terrier.jpg",
    breedCount: 8,
  },
  {
    id: "6",
    slug: "hound",
    name: "Hound Dogs",
    description:
      "Dogs with exceptional scenting or sight abilities. From gentle giants to speedy athletes, hounds offer diverse personalities and sizes.",
    image: "/hound.jpg",
    breedCount: 7,
  },
];

export const breeds: Breed[] = [
  // Sporting Dogs
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    type: "Sporting Dogs",
    typeSlug: "sporting",
    image: "/golden-retriever.jpg",
    size: "Large",
    temperament: ["Friendly", "Intelligent", "Devoted", "Reliable"],
    lifespan: "10-12 years",
    weight: "55-75 lbs",
    height: "21-24 inches",
    origin: "Scotland",
    description:
      "The Golden Retriever is one of the most popular dog breeds in the world, known for their friendly, tolerant attitude. They are excellent family pets, known for their patience with children and other animals. Originally bred for retrieving game, they excel at obedience training and make wonderful therapy and service dogs.",
    characteristics: {
      friendliness: 5,
      energyLevel: 4,
      trainability: 5,
      groomingNeeds: 4,
      healthIssues: 3,
    },
    funFacts: [
      "Golden Retrievers were originally bred in Scotland in the mid-19th century",
      "They're the third most popular dog breed in the United States",
      "Their mouths are so soft they can carry a raw egg without breaking it",
    ],
    careInfo: {
      exercise:
        "Golden Retrievers need at least 1-2 hours of exercise daily. They love swimming, fetching, and hiking.",
      grooming:
        "Brush their double coat 2-3 times per week. Regular baths and nail trimming are essential.",
      nutrition:
        "Feed 2-3 cups of high-quality dog food daily, divided into two meals. Monitor weight to prevent obesity.",
      training:
        "Highly trainable and eager to please. Start socialization and basic obedience early for best results.",
    },
    price: "₹15,000 - ₹30,000",
  },
  {
    id: "labrador-retriever",
    name: "Labrador Retriever",
    type: "Sporting Dogs",
    typeSlug: "sporting",
    image: "/labrador-retriever.jpg",
    size: "Large",
    temperament: ["Outgoing", "Active", "Gentle", "Trusting"],
    lifespan: "10-14 years",
    weight: "55-80 lbs",
    height: "21-24 inches",
    origin: "Newfoundland, Canada",
    description:
      "Labrador Retrievers are America's most popular dog breed for good reason. They're friendly, outgoing, and high-spirited companions who have more than enough affection to go around. Labs are excellent family dogs and are known for their intelligence and trainability.",
    characteristics: {
      friendliness: 5,
      energyLevel: 5,
      trainability: 5,
      groomingNeeds: 3,
      healthIssues: 3,
    },
    funFacts: [
      "Labs come in three colors: black, yellow, and chocolate",
      "They have been the most popular dog breed in the US for over 30 years",
      "Labs have webbed toes, making them excellent swimmers",
    ],
    careInfo: {
      exercise:
        "Labs need vigorous daily exercise - at least 1-2 hours. Swimming is an excellent activity for them.",
      grooming:
        "Weekly brushing is sufficient. They shed moderately year-round and heavily during shedding season.",
      nutrition:
        "Labs love to eat and are prone to obesity. Measure food carefully and limit treats.",
      training:
        "Extremely trainable and eager to please. They excel in obedience, agility, and service work.",
    },
    price: "₹10,000 - ₹25,000",
  },
  {
    id: "cocker-spaniel",
    name: "Cocker Spaniel",
    type: "Sporting Dogs",
    typeSlug: "sporting",
    image: "/cocker-spaniel.jpg",
    size: "Medium",
    temperament: ["Happy", "Smart", "Gentle", "Playful"],
    lifespan: "12-15 years",
    weight: "20-30 lbs",
    height: "13-15 inches",
    origin: "United Kingdom",
    description:
      "The Cocker Spaniel is a beloved companion known for their cheerful disposition and beautiful, silky coat. Originally bred as hunting dogs, they have transitioned into wonderful family pets that thrive on human companionship.",
    characteristics: {
      friendliness: 5,
      energyLevel: 4,
      trainability: 4,
      groomingNeeds: 5,
      healthIssues: 3,
    },
    funFacts: [
      "The name 'Cocker' comes from their skill in hunting woodcock",
      "Lady from Disney's 'Lady and the Tramp' is a Cocker Spaniel",
      "Their long ears help waft scents toward their nose",
    ],
    careInfo: {
      exercise:
        "Moderate exercise needs - about 1 hour daily of walks and playtime.",
      grooming:
        "Requires frequent grooming. Brush daily and professional grooming every 6-8 weeks.",
      nutrition:
        "Feed 1.5-2.5 cups of quality food daily. Watch for ear infections related to diet.",
      training:
        "Responds well to positive reinforcement. Can be sensitive, so gentle training methods work best.",
    },
    price: "₹10,000 - ₹20,000",
  },
  // Working Dogs
  {
    id: "german-shepherd",
    name: "German Shepherd",
    type: "Working Dogs",
    typeSlug: "working",
    image: "/german-shepherd.jpg",
    size: "Large",
    temperament: ["Confident", "Courageous", "Smart", "Loyal"],
    lifespan: "9-13 years",
    weight: "50-90 lbs",
    height: "22-26 inches",
    origin: "Germany",
    description:
      "German Shepherds are the world's leading police, guard, and military dog. But they're equally prized as loving family companions. Known for their intelligence, courage, and versatility, they excel in almost any task they're given.",
    characteristics: {
      friendliness: 4,
      energyLevel: 5,
      trainability: 5,
      groomingNeeds: 4,
      healthIssues: 3,
    },
    funFacts: [
      "German Shepherds were the first guide dogs for the blind",
      "They're the second most popular dog breed in America",
      "A German Shepherd named Rin Tin Tin was nominated for an Academy Award",
    ],
    careInfo: {
      exercise:
        "High energy dogs needing 2+ hours of exercise daily. Mental stimulation is equally important.",
      grooming:
        "Heavy shedders! Brush daily during shedding season, weekly otherwise.",
      nutrition:
        "Feed 2-4 cups of high-quality food daily. Prone to bloat, so avoid exercise after meals.",
      training:
        "Highly trainable and eager to work. Early socialization is crucial for well-rounded adults.",
    },
    price: "₹15,000 - ₹40,000",
  },
  {
    id: "siberian-husky",
    name: "Siberian Husky",
    type: "Working Dogs",
    typeSlug: "working",
    image: "/siberian-husky.jpg",
    size: "Medium",
    temperament: ["Outgoing", "Mischievous", "Loyal", "Friendly"],
    lifespan: "12-14 years",
    weight: "35-60 lbs",
    height: "20-23 inches",
    origin: "Siberia, Russia",
    description:
      "Siberian Huskies are pack dogs with a great need for family and companionship. They're friendly, fastidious, and dignified. Known for their striking blue or multi-colored eyes and wolf-like appearance, they're athletic dogs who love outdoor adventures.",
    characteristics: {
      friendliness: 5,
      energyLevel: 5,
      trainability: 3,
      groomingNeeds: 4,
      healthIssues: 2,
    },
    funFacts: [
      "Huskies can run up to 28 miles per hour",
      "They can change their metabolism to conserve energy on long runs",
      "Their thick double coat can withstand temperatures as low as -75°F",
    ],
    careInfo: {
      exercise:
        "Extremely high energy - needs 2+ hours of vigorous exercise daily. Running and hiking are ideal.",
      grooming:
        "Brush 2-3 times weekly. They 'blow' their coat twice a year with heavy shedding.",
      nutrition:
        "Surprisingly low food requirements for their size - about 2 cups daily.",
      training:
        "Independent and can be stubborn. Requires patient, consistent training from an experienced owner.",
    },
    price: "₹10,000 - ₹30,000",
  },
  {
    id: "rottweiler",
    name: "Rottweiler",
    type: "Working Dogs",
    typeSlug: "working",
    image: "/rottweiler.jpg",
    size: "Large",
    temperament: ["Loyal", "Confident", "Calm", "Courageous"],
    lifespan: "8-10 years",
    weight: "80-135 lbs",
    height: "22-27 inches",
    origin: "Germany",
    description:
      "Rottweilers are robust working dogs of great strength. They're confident and calm, with a self-assured aloofness that doesn't lend itself to immediate friendships. A well-bred and properly raised Rottweiler will be calm and confident, courageous but not unduly aggressive.",
    characteristics: {
      friendliness: 3,
      energyLevel: 4,
      trainability: 4,
      groomingNeeds: 2,
      healthIssues: 3,
    },
    funFacts: [
      "Rottweilers are descended from Roman drover dogs",
      "They were among the earliest police dogs",
      "The name comes from the German town of Rottweil",
    ],
    careInfo: {
      exercise:
        "Moderate to high - 1-2 hours daily. Mental stimulation is important to prevent boredom.",
      grooming:
        "Easy to maintain. Weekly brushing and occasional baths are sufficient.",
      nutrition:
        "Feed 4-10 cups daily depending on size and activity. Watch for obesity.",
      training:
        "Intelligent and trainable, but requires firm, consistent leadership. Early socialization is essential.",
    },
    price: "₹15,000 - ₹40,000",
  },
  // Herding Dogs
  {
    id: "border-collie",
    name: "Border Collie",
    type: "Herding Dogs",
    typeSlug: "herding",
    image: "/border-collie.jpg",
    size: "Medium",
    temperament: ["Intelligent", "Energetic", "Alert", "Responsive"],
    lifespan: "12-15 years",
    weight: "30-55 lbs",
    height: "18-22 inches",
    origin: "Anglo-Scottish Border",
    description:
      "The Border Collie is widely considered the most intelligent dog breed. They're remarkably bright workhorses who thrive on having a job to do. Originally bred for herding sheep, they excel at virtually any canine sport or activity.",
    characteristics: {
      friendliness: 4,
      energyLevel: 5,
      trainability: 5,
      groomingNeeds: 3,
      healthIssues: 2,
    },
    funFacts: [
      "A Border Collie named Chaser knew 1,022 words",
      "They can learn a new command in under 5 repetitions",
      "Border Collies are champion Frisbee dogs",
    ],
    careInfo: {
      exercise:
        "Extremely high needs - 2+ hours of intense activity daily. Mental stimulation is crucial.",
      grooming:
        "Weekly brushing for smooth coat, more frequent for rough coat varieties.",
      nutrition:
        "Feed 1.5-2 cups of high-quality food daily based on activity level.",
      training:
        "The most trainable of all breeds. They need mental challenges to stay happy.",
    },
    price: "₹8,000 - ₹25,000",
  },
  {
    id: "australian-shepherd",
    name: "Australian Shepherd",
    type: "Herding Dogs",
    typeSlug: "herding",
    image: "/australian-shepherd.jpg",
    size: "Medium",
    temperament: ["Smart", "Work-Oriented", "Exuberant", "Good-Natured"],
    lifespan: "12-15 years",
    weight: "40-65 lbs",
    height: "18-23 inches",
    origin: "United States",
    description:
      "Despite the name, Australian Shepherds were developed in California. They're highly intelligent herding dogs known for their striking merle coat patterns. Aussies are eager to please and highly trainable, making them excellent family companions.",
    characteristics: {
      friendliness: 4,
      energyLevel: 5,
      trainability: 5,
      groomingNeeds: 4,
      healthIssues: 2,
    },
    funFacts: [
      "They're not actually from Australia - developed in the American West",
      "Many Aussies have naturally bobbed tails",
      "They often have heterochromia (different colored eyes)",
    ],
    careInfo: {
      exercise:
        "Very high energy - needs 2+ hours of exercise daily. Loves agility and frisbee.",
      grooming: "Brush 2-3 times weekly. More during heavy shedding seasons.",
      nutrition:
        "Feed 1.5-2.5 cups of quality food daily based on size and activity.",
      training:
        "Highly trainable and eager to please. Excels in obedience, agility, and herding trials.",
    },
    price: "₹10,000 - ₹25,000",
  },
  {
    id: "pembroke-welsh-corgi",
    name: "Pembroke Welsh Corgi",
    type: "Herding Dogs",
    typeSlug: "herding",
    image: "/corgi.jpg",
    size: "Small",
    temperament: ["Affectionate", "Smart", "Alert", "Playful"],
    lifespan: "12-13 years",
    weight: "25-30 lbs",
    height: "10-12 inches",
    origin: "Wales",
    description:
      "The Pembroke Welsh Corgi is the favorite breed of Queen Elizabeth II. Despite their small stature, they're herding dogs at heart, with big personalities and surprising athleticism. Their low-set bodies and short legs made them perfect for nipping at cattle heels.",
    characteristics: {
      friendliness: 5,
      energyLevel: 4,
      trainability: 4,
      groomingNeeds: 3,
      healthIssues: 3,
    },
    funFacts: [
      "Queen Elizabeth II owned more than 30 Corgis during her reign",
      "In Welsh legend, fairies used them to pull carriages",
      "They're the smallest of the herding breeds",
    ],
    careInfo: {
      exercise:
        "Moderate to high - about 1 hour daily. Enjoys agility and herding activities.",
      grooming:
        "Brush 2-3 times weekly. Heavy shedders, especially during coat-blowing season.",
      nutrition:
        "Feed 3/4-1.5 cups daily. Prone to obesity, so portion control is essential.",
      training:
        "Smart and trainable but can be independent. Use positive reinforcement methods.",
    },
    price: "₹10,000 - ₹25,000",
  },
  // Toy Dogs
  {
    id: "pomeranian",
    name: "Pomeranian",
    type: "Toy Dogs",
    typeSlug: "toy",
    image: "/pomeranian.jpg",
    size: "Toy",
    temperament: ["Lively", "Bold", "Inquisitive", "Playful"],
    lifespan: "12-16 years",
    weight: "3-7 lbs",
    height: "6-7 inches",
    origin: "Pomerania (Germany/Poland)",
    description:
      "Pomeranians are tiny dogs with big personalities. These fluffy companions are curious, playful, and self-confident. Despite their small size, they have bold spirits and make excellent watchdogs with their alert, attentive nature.",
    characteristics: {
      friendliness: 4,
      energyLevel: 4,
      trainability: 4,
      groomingNeeds: 5,
      healthIssues: 3,
    },
    funFacts: [
      "Queen Victoria had a Pomeranian that weighed only 12 pounds",
      "Two Pomeranians survived the Titanic sinking",
      "They descended from large sled-pulling dogs",
    ],
    careInfo: {
      exercise: "Moderate - 30 minutes to 1 hour of walks and play daily.",
      grooming:
        "Brush daily to prevent matting. Professional grooming every 4-6 weeks.",
      nutrition: "Feed 1/4-1/2 cup of high-quality small-breed food daily.",
      training:
        "Smart and trainable but can be stubborn. Consistent training is key.",
    },
    price: "₹10,000 - ₹30,000",
  },
  {
    id: "chihuahua",
    name: "Chihuahua",
    type: "Toy Dogs",
    typeSlug: "toy",
    image: "/chihuahua.jpg",
    size: "Toy",
    temperament: ["Charming", "Graceful", "Sassy", "Devoted"],
    lifespan: "14-16 years",
    weight: "3-6 lbs",
    height: "5-8 inches",
    origin: "Mexico",
    description:
      "The Chihuahua is the smallest recognized dog breed, named after the Mexican state. These tiny dogs have huge personalities and are fiercely loyal to their owners. They come in smooth and long coat varieties with various colors.",
    characteristics: {
      friendliness: 3,
      energyLevel: 4,
      trainability: 3,
      groomingNeeds: 2,
      healthIssues: 3,
    },
    funFacts: [
      "The smallest dog ever recorded was a Chihuahua named Miracle Milly",
      "They have the largest brain-to-body ratio of any dog breed",
      "Ancient Aztecs believed Chihuahuas guided souls to the underworld",
    ],
    careInfo: {
      exercise:
        "Low to moderate - 30 minutes daily. Short walks and indoor play are sufficient.",
      grooming:
        "Minimal for smooth coat, weekly brushing for long coat varieties.",
      nutrition:
        "Feed 1/4-1/2 cup of small-breed food daily. Prone to hypoglycemia.",
      training:
        "Can be challenging due to stubbornness. Early socialization is very important.",
    },
    price: "₹5,000 - ₹20,000",
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    type: "Toy Dogs",
    typeSlug: "toy",
    image: "/french-bulldog.jpg",
    size: "Small",
    temperament: ["Adaptable", "Playful", "Smart", "Affectionate"],
    lifespan: "10-12 years",
    weight: "16-28 lbs",
    height: "11-13 inches",
    origin: "France/England",
    description:
      "French Bulldogs are charming, adaptable companions known for their bat-like ears and playful personalities. They're the perfect city dog - compact, quiet, and easy-going. Frenchies are one of the world's most popular small-dog breeds.",
    characteristics: {
      friendliness: 5,
      energyLevel: 3,
      trainability: 4,
      groomingNeeds: 2,
      healthIssues: 4,
    },
    funFacts: [
      "They cannot swim due to their body structure",
      "French Bulldogs are currently the most popular breed in America",
      "Most Frenchies are born via C-section due to their large heads",
    ],
    careInfo: {
      exercise:
        "Low to moderate - 30-60 minutes of walks daily. Avoid overexertion in heat.",
      grooming:
        "Weekly brushing. Clean facial wrinkles regularly to prevent infections.",
      nutrition:
        "Feed 1-1.5 cups of quality food daily. Monitor weight carefully.",
      training:
        "Eager to please and trainable. Responds well to positive reinforcement.",
    },
    price: "₹20,000 - ₹50,000",
  },
  // Terrier Dogs
  {
    id: "jack-russell-terrier",
    name: "Jack Russell Terrier",
    type: "Terrier Dogs",
    typeSlug: "terrier",
    image: "/jack-russell-terrier.jpg",
    size: "Small",
    temperament: ["Fearless", "Athletic", "Clever", "Energetic"],
    lifespan: "13-16 years",
    weight: "13-17 lbs",
    height: "10-15 inches",
    origin: "England",
    description:
      "Jack Russell Terriers are small dogs with big personalities. These athletic, clever dogs were bred for fox hunting and have boundless energy. They're fearless, vocal, and endlessly entertaining companions for active owners.",
    characteristics: {
      friendliness: 4,
      energyLevel: 5,
      trainability: 4,
      groomingNeeds: 2,
      healthIssues: 2,
    },
    funFacts: [
      "They can jump up to 5 feet in the air",
      "The breed was developed by Parson John Russell in the 1800s",
      "Eddie from Frasier was a Jack Russell Terrier",
    ],
    careInfo: {
      exercise:
        "Very high - 1-2 hours of vigorous exercise daily. Loves agility and fetch.",
      grooming:
        "Minimal - weekly brushing for smooth coat, more for rough coat.",
      nutrition:
        "Feed 1.25-1.75 cups of high-quality food daily based on activity level.",
      training:
        "Intelligent but independent. Requires firm, consistent training and lots of mental stimulation.",
    },
    price: "₹8,000 - ₹25,000",
  },
  {
    id: "yorkshire-terrier",
    name: "Yorkshire Terrier",
    type: "Terrier Dogs",
    typeSlug: "terrier",
    image: "/yorkshire-terrier.jpg",
    size: "Toy",
    temperament: ["Sprightly", "Tomboyish", "Affectionate", "Feisty"],
    lifespan: "11-15 years",
    weight: "4-7 lbs",
    height: "7-8 inches",
    origin: "Yorkshire, England",
    description:
      "Yorkshire Terriers are known for their long, silky coats and big personalities. Don't let their small size fool you - Yorkies are feisty and tomboyish, with true terrier spirit. They're devoted companions who love to be pampered.",
    characteristics: {
      friendliness: 4,
      energyLevel: 4,
      trainability: 4,
      groomingNeeds: 5,
      healthIssues: 3,
    },
    funFacts: [
      "Yorkies were originally bred to catch rats in clothing mills",
      "Their coat is similar to human hair and is hypoallergenic",
      "A Yorkie named Smoky was a WWII war hero",
    ],
    careInfo: {
      exercise:
        "Moderate - 30 minutes to 1 hour of activity daily. Indoor play works well.",
      grooming:
        "Daily brushing required for long coats. Many owners opt for shorter 'puppy cuts'.",
      nutrition: "Feed 1/4-1/2 cup of quality small-breed food daily.",
      training:
        "Smart and trainable. Can be stubborn, so patience and consistency are key.",
    },
    price: "₹12,000 - ₹30,000",
  },
  // Hound Dogs
  {
    id: "beagle",
    name: "Beagle",
    type: "Hound Dogs",
    typeSlug: "hound",
    image: "/beagle.jpg",
    size: "Small to Medium",
    temperament: ["Friendly", "Curious", "Merry", "Determined"],
    lifespan: "10-15 years",
    weight: "20-30 lbs",
    height: "13-15 inches",
    origin: "England",
    description:
      "Beagles are merry, friendly hounds known for their incredible sense of smell. Originally bred for hunting rabbits, they're now beloved family pets. Their compact size, easy-care coat, and happy-go-lucky personality make them wonderful companions.",
    characteristics: {
      friendliness: 5,
      energyLevel: 4,
      trainability: 3,
      groomingNeeds: 2,
      healthIssues: 2,
    },
    funFacts: [
      "Beagles have about 220 million scent receptors",
      "Snoopy from Peanuts is the world's most famous Beagle",
      "They're used at airports to sniff out contraband",
    ],
    careInfo: {
      exercise:
        "Moderate to high - 1-2 hours daily. Love to follow scents, so secure fencing is essential.",
      grooming:
        "Easy care - weekly brushing is sufficient. Clean ears regularly.",
      nutrition:
        "Feed 3/4-1.5 cups daily. Very food-motivated and prone to obesity.",
      training:
        "Can be stubborn due to their scent-driven nature. Food rewards work well.",
    },
    price: "₹8,000 - ₹20,000",
  },
  {
    id: "dachshund",
    name: "Dachshund",
    type: "Hound Dogs",
    typeSlug: "hound",
    image: "/dachshund.jpg",
    size: "Small",
    temperament: ["Clever", "Stubborn", "Devoted", "Lively"],
    lifespan: "12-16 years",
    weight: "16-32 lbs (standard), 11 lbs and under (miniature)",
    height: "8-9 inches (standard), 5-6 inches (miniature)",
    origin: "Germany",
    description:
      "Dachshunds, affectionately called 'wiener dogs,' are known for their distinctive long bodies and short legs. Originally bred to hunt badgers, they're courageous and lively. They come in three coat types: smooth, wirehaired, and longhaired.",
    characteristics: {
      friendliness: 4,
      energyLevel: 3,
      trainability: 3,
      groomingNeeds: 2,
      healthIssues: 4,
    },
    funFacts: [
      "The name means 'badger dog' in German",
      "They were bred to fight badgers in their dens",
      "Hot dogs were originally called 'dachshund sausages'",
    ],
    careInfo: {
      exercise:
        "Moderate - 30 minutes to 1 hour daily. Avoid excessive jumping to protect their backs.",
      grooming:
        "Varies by coat type. Smooth needs minimal, longhaired needs daily brushing.",
      nutrition:
        "Feed 1/2-1.5 cups daily based on size. Watch weight to protect their spine.",
      training:
        "Intelligent but stubborn. Consistent, patient training with positive reinforcement works best.",
    },
    price: "₹8,000 - ₹25,000",
  },
  {
    id: "basset-hound",
    name: "Basset Hound",
    type: "Hound Dogs",
    typeSlug: "hound",
    image: "/basset-hound.jpg",
    size: "Medium",
    temperament: ["Patient", "Low-Key", "Charming", "Friendly"],
    lifespan: "12-13 years",
    weight: "40-65 lbs",
    height: "Up to 15 inches",
    origin: "France/Belgium",
    description:
      "Basset Hounds are among the most good-natured and easy-going of all breeds. Their sad, droopy expression belies their cheerful personality. Originally bred for hunting, they have an exceptional sense of smell, second only to the Bloodhound.",
    characteristics: {
      friendliness: 5,
      energyLevel: 2,
      trainability: 3,
      groomingNeeds: 2,
      healthIssues: 3,
    },
    funFacts: [
      "They have the second-best sense of smell of any dog breed",
      "Their long ears help waft scents toward their nose",
      "The name 'basset' comes from the French word for 'low'",
    ],
    careInfo: {
      exercise:
        "Moderate - 1 hour daily. Enjoy leisurely walks and scent-based activities.",
      grooming: "Weekly brushing. Clean ears frequently to prevent infections.",
      nutrition:
        "Feed 1.5-2.5 cups daily. Very prone to obesity, so careful portion control is essential.",
      training:
        "Can be stubborn. Use patience and food rewards for best results.",
    },
    price: "₹8,000 - ₹20,000",
  },
];

export function getBreedsByType(typeSlug: string): Breed[] {
  return breeds.filter((breed) => breed.typeSlug === typeSlug);
}

export function getBreedById(id: string): Breed | undefined {
  return breeds.find((breed) => breed.id === id);
}

export function getBreedTypeBySlug(slug: string): BreedType | undefined {
  return breedTypes.find((type) => type.slug === slug);
}
