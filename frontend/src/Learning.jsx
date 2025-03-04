import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlueCurriculumApp = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthSciencesLessons, setHealthSciencesLessons] = useState([]);
  const [showTomTooltip, setShowTomTooltip] = useState(true);
  const navigate = useNavigate();

  // Expanded curriculum structure for all grades
  const curriculumByGrade = {
    // Grade 1
    1: [
      { id: 1, subject: "Mathematics", chapters: ["Numbers and Counting", "Basic Addition", "Basic Subtraction", "Shapes and Patterns"] },
      { id: 2, subject: "EVS", chapters: ["Plants and Animals", "My Family", "Water and Air", "Food and Nutrition"] },
      { id: 3, subject: "Social Studies", chapters: ["My Neighborhood", "Community Helpers", "Festivals", "Transport"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Personal Hygiene", "Healthy Food", "Exercise", "Rest and Sleep"] }
    ],
    // Grade 2
    2: [
      { id: 1, subject: "Mathematics", chapters: ["Place Value", "Addition with Carrying", "Subtraction with Borrowing", "Multiplication Basics"] },
      { id: 2, subject: "EVS", chapters: ["Living and Non-living", "Plants Around Us", "Animal World", "Air and Water"] },
      { id: 3, subject: "Social Studies", chapters: ["Our Country", "Different Cultures", "Means of Communication", "Important Places"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Germs and Diseases", "Healthy Habits", "First Aid Basics", "Nutrition"] }
    ],
    // Grade 3
    3: [
      { id: 1, subject: "Mathematics", chapters: ["Fractions", "Division Basics", "Time", "Measurement"] },
      { id: 2, subject: "Science", chapters: ["Matter", "Energy", "Plant Life Cycle", "Animal Adaptations"] },
      { id: 3, subject: "Social Studies", chapters: ["Maps and Directions", "Our Community", "Natural Resources", "Early Civilizations"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Body Systems", "Balanced Diet", "Exercise and Fitness", "Mental Health Basics"] }
    ],
    // Grades 4-12 (simplified for brevity but included)
    4: [
      { id: 1, subject: "Mathematics", chapters: ["Decimals", "Factors and Multiples", "Geometry", "Data Handling"] },
      { id: 2, subject: "Science", chapters: ["States of Matter", "Force and Motion", "Solar System", "Living World"] },
      { id: 3, subject: "Social Studies", chapters: ["Geography of India", "Indian History", "Government", "Natural Resources"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Digestive System", "Respiratory System", "Physical Fitness", "Disease Prevention"] }
    ],
    5: [
      { id: 1, subject: "Mathematics", chapters: ["Percentages", "Area and Volume", "Algebra Basics", "Patterns"] },
      { id: 2, subject: "Science", chapters: ["Human Body", "Simple Machines", "Earth and Space", "Ecosystems"] },
      { id: 3, subject: "Social Studies", chapters: ["Ancient Civilizations", "Weather and Climate", "Industries", "Transportation"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Puberty and Changes", "Nutrition Science", "Safety and First Aid", "Environmental Health"] }
    ],
    6: [
      { id: 1, subject: "Mathematics", chapters: ["Integers", "Fractions and Decimals", "Ratio and Proportion", "Algebra"] },
      { id: 2, subject: "Science", chapters: ["Food and Nutrition", "Fibre to Fabric", "Sorting Materials", "Motion and Measurement"] },
      { id: 3, subject: "Social Studies", chapters: ["History - Early Societies", "Geography - Earth", "Civics - Rural Administration", "Economics Basics"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["Body Systems Integration", "Nutrition and Metabolism", "Disease and Immunity", "Physical and Mental Health"] }
    ],
    7: [
      { id: 1, subject: "Mathematics", chapters: ["Rational Numbers", "Exponents", "Algebraic Expressions", "Triangles and Quadrilaterals"] },
      { id: 2, subject: "Science", chapters: ["Nutrition in Plants and Animals", "Heat and Temperature", "Acids and Bases", "Physical and Chemical Changes"] },
      { id: 3, subject: "Social Studies", chapters: ["Medieval History", "Environment", "Democracy", "Markets and Trade"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["Adolescent Health", "Communicable Diseases", "First Aid Advanced", "Stress Management"] }
    ],
    8: [
      { id: 1, subject: "Mathematics", chapters: ["Quadrilaterals", "Practical Geometry", "Data Handling", "Squares and Square Roots"] },
      { id: 2, subject: "Science", chapters: ["Crop Production", "Microorganisms", "Synthetic Materials", "Metals and Non-metals"] },
      { id: 3, subject: "Social Studies", chapters: ["Modern History", "Resources", "Law and Justice", "Social Issues"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["Reproductive Health", "Non-Communicable Diseases", "Community Health", "Health and Technology"] }
    ],
    9: [
      { id: 1, subject: "Mathematics", chapters: ["Real Numbers", "Polynomials", "Coordinate Geometry", "Linear Equations"] },
      { id: 2, subject: "Science", chapters: ["Matter", "Cell Structure", "Tissues", "Force and Laws of Motion"] },
      { id: 3, subject: "Social Studies", chapters: ["French Revolution", "Natural Resources", "Democratic Politics", "Economic Development"] },
      { id: 4, subject: "Advanced Health Sciences", chapters: ["Human Physiology", "Nutrition Science", "Medical Ethics", "Public Health"] }
    ],
    10: [
      { id: 1, subject: "Mathematics", chapters: ["Quadratic Equations", "Arithmetic Progressions", "Circles", "Statistics"] },
      { id: 2, subject: "Science", chapters: ["Chemical Reactions", "Control and Coordination", "Heredity and Evolution", "Light Reflection and Refraction"] },
      { id: 3, subject: "Social Studies", chapters: ["Nationalism in Europe", "Resources and Development", "Power Sharing", "Globalization"] },
      { id: 4, subject: "Advanced Health Sciences", chapters: ["Immunity and Disease", "Drugs and Medicine", "Medical Technology", "Environmental Health Impact"] }
    ],
    11: [
      { id: 1, subject: "Mathematics", chapters: ["Sets", "Relations and Functions", "Trigonometric Functions", "Complex Numbers"] },
      { id: 2, subject: "Physics", chapters: ["Units and Measurements", "Motion in a Straight Line", "Laws of Motion", "Work, Energy and Power"] },
      { id: 3, subject: "Chemistry", chapters: ["Basic Concepts", "Structure of Atom", "Chemical Bonding", "States of Matter"] },
      { id: 4, subject: "Biology", chapters: ["Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom"] },
      { id: 5, subject: "Advanced Health Sciences", chapters: ["Cellular Physiology", "Biochemistry Basics", "Pharmacology Introduction", "Health Research Methods"] }
    ],
    12: [
      { id: 1, subject: "Mathematics", chapters: ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants"] },
      { id: 2, subject: "Physics", chapters: ["Electric Charges and Fields", "Current Electricity", "Magnetism", "Electromagnetic Waves"] },
      { id: 3, subject: "Chemistry", chapters: ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics"] },
      { id: 4, subject: "Biology", chapters: ["Reproduction", "Genetics", "Evolution", "Human Health and Disease"] },
      { id: 5, subject: "Advanced Health Sciences", chapters: ["Pathophysiology", "Clinical Diagnostics", "Healthcare Systems", "Global Health Challenges"] }
    ]
  };

  // Sample quiz questions
  const quizzes = {
    "Numbers and Counting": [
      {
        question: "What comes after 5?",
        options: ["4", "5", "6", "7"],
        answer: "6"
      },
      {
        question: "How many fingers do you have on one hand?",
        options: ["3", "4", "5", "10"],
        answer: "5"
      },
      {
        question:"If I give you 3 apples and then 2 more, how many do you have in total?",
        options:["2","3","5","7"],
        answer: "5"
      }
    ],
    "Basic Addition": [
      {
        question: "What is 2 + 3?",
        options: ["4", "5", "6", "7"],
        answer: "5"
      },
      {
        question: "What is 4 + 4?",
        options: ["6", "7", "8", "9"],
        answer: "8"
      },
      {
        question: "What is 2+4?",
        options:["2","4","5","6"],
        answer: "6"
      }
    ],
    "Basic Subtraction": [
              {
                question: "What is 5 - 2?",
                options: ["2", "3", "4", "5"],
                answer: "3"
              },
              {
                question: "What is 7 - 3?",
                options: ["3", "4", "5", "6"],
                answer: "4"
              },
              {
                question: "What is 10 - 6?",
                options: ["2", "3", "4", "5"],
                answer: "4"
              }
    ],
    "Shapes and Patterns": [
    {
      question: "Which shape has three sides?",
      options: ["Square", "Triangle", "Circle", "Rectangle"],
      answer: "Triangle"
    },
    {
      question: "Which shape looks like a ball?",
      options: ["Square", "Triangle", "Circle", "Rectangle"],
      answer: "Circle"
    },
    {
      question: "What comes next in the pattern? ◼️ ◼️ 🔺 ◼️ ◼️ 🔺 ◼️ ◼️ ?",
      options: ["◼️", "🔺", "⬤", "⬛"],
      answer: "🔺"
    }
  ],
  "Plants and Animals": [
    {
      question: "What do plants need to grow?",
      options: ["Sunlight", "Rocks", "Plastic", "Paper"],
      answer: "Sunlight"
    },
    {
      question: "Which of these is a wild animal?",
      options: ["Dog", "Cow", "Lion", "Cat"],
      answer: "Lion"
    },
    {
      question: "What do cows give us?",
      options: ["Milk", "Water", "Eggs", "Honey"],
      answer: "Milk"
    }
  ],
  "My Family": [
    {
      question: "Who is your father’s father called?",
      options: ["Uncle", "Brother", "Grandfather", "Cousin"],
      answer: "Grandfather"
    },
    {
      question: "What do we call our mother’s sister?",
      options: ["Aunt", "Sister", "Cousin", "Niece"],
      answer: "Aunt"
    },
    {
      question: "Who cooks food in most homes?",
      options: ["Doctor", "Teacher", "Chef", "Mother or Father"],
      answer: "Mother or Father"
    }
  ],
  "Water and Air": [
    {
      question: "What do we need to breathe to stay alive?",
      options: ["Water", "Air", "Juice", "Milk"],
      answer: "Air"
    },
    {
      question: "What is the main source of water?",
      options: ["Rivers", "Cars", "Books", "Shoes"],
      answer: "Rivers"
    },
    {
      question: "What do we use water for?",
      options: ["Drinking", "Reading", "Sleeping", "Drawing"],
      answer: "Drinking"
    }
  ],
  "Food and Nutrition": [
    {
      question: "Which of these is a healthy food?",
      options: ["Candy", "Chips", "Apples", "Soda"],
      answer: "Apples"
    },
    {
      question: "What do we get from eating vegetables?",
      options: ["Energy", "Toys", "Clothes", "Cars"],
      answer: "Energy"
    },
    {
      question: "Which drink is good for strong bones?",
      options: ["Milk", "Soda", "Juice", "Coffee"],
      answer: "Milk"
    }
  ],
  "My Neighborhood": [
    {
      question: "What is a place where we buy things?",
      options: ["School", "Market", "Hospital", "Library"],
      answer: "Market"
    },
    {
      question: "Where do we go when we are sick?",
      options: ["School", "Hospital", "Park", "Bank"],
      answer: "Hospital"
    },
    {
      question: "What do we borrow from a library?",
      options: ["Books", "Clothes", "Toys", "Fruits"],
      answer: "Books"
    }
  ],
  "Community Helpers": [
    {
      question: "Who teaches us in school?",
      options: ["Doctor", "Teacher", "Postman", "Policeman"],
      answer: "Teacher"
    },
    {
      question: "Who helps put out fires?",
      options: ["Farmer", "Firefighter", "Chef", "Pilot"],
      answer: "Firefighter"
    },
    {
      question: "Who brings letters to our house?",
      options: ["Doctor", "Postman", "Engineer", "Driver"],
      answer: "Postman"
    }
  ],
  "Festivals": [
    {
      question: "Which festival is known as the festival of lights?",
      options: ["Christmas", "Diwali", "Eid", "Holi"],
      answer: "Diwali"
    },
    {
      question: "Which festival is celebrated with colors?",
      options: ["Diwali", "Holi", "Christmas", "Raksha Bandhan"],
      answer: "Holi"
    },
    {
      question: "On which festival does Santa Claus give gifts?",
      options: ["Diwali", "Eid", "Christmas", "Pongal"],
      answer: "Christmas"
    }
  ],
  "Transport": [
    {
      question: "Which vehicle flies in the sky?",
      options: ["Car", "Bicycle", "Aeroplane", "Bus"],
      answer: "Aeroplane"
    },
    {
      question: "Which transport runs on tracks?",
      options: ["Bus", "Train", "Car", "Boat"],
      answer: "Train"
    },
    {
      question: "Which transport is used to travel on water?",
      options: ["Car", "Aeroplane", "Boat", "Bicycle"],
      answer: "Boat"
    }
  ],
    "Personal Hygiene": [
      {
        question: "How many times should you brush your teeth daily?",
        options: ["Once a week", "Once a day", "Twice a day", "Never"],
        answer: "Twice a day"
      },
      {
        question: "When should you wash your hands?",
        options: ["Before eating", "After using the toilet", "After playing outside", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "Why do we wash our hands?",
        options:["To make them smell nice","To remove dirt and germs","Because it's fun","So they feel cold"],
        answer: "To remove dirt and germs"
      }
    ],
    "Healthy Food": [
    {
      question: "Which of these is a healthy food?",
      options: ["Candy", "Burger", "Apple", "Chips"],
      answer: "Apple"
    },
    {
      question: "Why should we eat vegetables?",
      options: ["They taste sweet", "They make us strong and healthy", "They are colorful", "They are fun to play with"],
      answer: "They make us strong and healthy"
    },
    {
      question: "Which drink is the healthiest?",
      options: ["Soda", "Juice", "Milk", "Water"],
      answer: "Water"
    }
  ],
  "Exercise": [
    {
      question: "Which of these is a good exercise?",
      options: ["Watching TV", "Jumping and running", "Sleeping all day", "Eating snacks"],
      answer: "Jumping and running"
    },
    {
      "question": "Why is exercise important?",
      "options": ["It makes us sleepy", "It keeps us strong and healthy", "It helps us watch more TV", "It makes us eat more junk food"],
      "answer": "It keeps us strong and healthy"
    },
    {
      "question": "Which of these is an outdoor game?",
      "options": ["Reading a book", "Playing video games", "Skipping rope", "Watching cartoons"],
      "answer": "Skipping rope"
    }
  ],
  "Rest and Sleep": [
    {
      "question": "Why do we need sleep?",
      "options": ["To rest and feel fresh", "To play all night", "To eat more food", "To watch TV"],
      "answer": "To rest and feel fresh"
    },
    {
      "question": "How many hours of sleep do children need?",
      "options": ["4 hours", "6 hours", "8-10 hours", "12-15 hours"],
      "answer": "8-10 hours"
    },
    {
      "question": "What should we do before going to bed?",
      "options": ["Brush our teeth", "Eat lots of candy", "Play video games", "Drink soda"],
      "answer": "Brush our teeth"
    }
  ],
  "Place Value": [
    {
      "question": "In the number 45, what does the 4 stand for?",
      "options": ["Four", "Forty", "Five", "Fifty"],
      "answer": "Forty"
    },
    {
      "question": "What is the place value of 7 in 73?",
      "options": ["Seven", "Seventy", "Three", "Seventeen"],
      "answer": "Seventy"
    },
    {
      "question": "In 108, what is the place value of 1?",
      "options": ["One", "Ten", "Hundred", "Eighty"],
      "answer": "Hundred"
    }
  ],
  
  "Addition with Carrying": [
    {
      "question": "What do we do when the sum of two digits is more than 9?",
      "options": ["Write only the first digit", "Ignore the second digit", "Carry over to the next place", "Subtract instead"],
      "answer": "Carry over to the next place"
    },
    {
      "question": "What is 6 + 7?",
      "options": ["12", "14", "13", "16"],
      "answer": "13"
    },
    {
      "question": "If you add 9 + 5, what do you carry over?",
      "options": ["1", "2", "3", "Nothing"],
      "answer": "1"
    }
  ],

  "Subtraction with Borrowing": [
    {
      "question": "What do you do if the top digit is smaller than the bottom digit in subtraction?",
      "options": ["Ignore it", "Borrow from the next place", "Add instead", "Write zero"],
      "answer": "Borrow from the next place"
    },
    {
      "question": "What is 32 - 8?",
      "options": ["24", "26", "22", "20"],
      "answer": "24"
    },
    {
      "question": "In 51 - 9, from which place do we borrow?",
      "options": ["Ones place", "Tens place", "Hundreds place", "We don’t borrow"],
      "answer": "Tens place"
    }
  ],

  "Multiplication Basics": [
    {
      "question": "What is 3 × 2?",
      "options": ["5", "6", "8", "9"],
      "answer": "6"
    },
    {
      "question": "Multiplication is the same as ____.",
      "options": ["Adding the same number many times", "Subtracting many times", "Dividing into groups", "Guessing"],
      "answer": "Adding the same number many times"
    },
    {
      "question": "If there are 4 baskets with 3 apples each, how many apples are there in total?",
      "options": ["7", "12", "10", "15"],
      "answer": "12"
    }
  ],

  "Living and Non-living": [
    {
      "question": "Which of these is a living thing?",
      "options": ["Rock", "Dog", "Chair", "Table"],
      "answer": "Dog"
    },
    {
      "question": "What do all living things need to survive?",
      "options": ["Food, water, and air", "Toys and books", "TV and music", "Clothes and shoes"],
      "answer": "Food, water, and air"
    },
    {
      "question": "Which of these does NOT grow?",
      "options": ["Cat", "Flower", "Car", "Tree"],
      "answer": "Car"
    }
  ],

  "Plants Around Us": [
    {
      "question": "What do plants need to grow?",
      "options": ["Water and sunlight", "Only air", "Only soil", "Only water"],
      "answer": "Water and sunlight"
    },
    {
      "question": "Which part of a plant takes in water from the soil?",
      "options": ["Leaves", "Flowers", "Roots", "Stem"],
      "answer": "Roots"
    },
    {
      "question": "Which plant gives us apples?",
      "options": ["Mango tree", "Banana tree", "Apple tree", "Grapevine"],
      "answer": "Apple tree"
    }
  ],

  "Animal World": [
    {
      "question": "Which animal lives in water?",
      "options": ["Dog", "Cat", "Fish", "Horse"],
      "answer": "Fish"
    },
    {
      "question": "What do birds use to fly?",
      "options": ["Legs", "Hands", "Wings", "Fins"],
      "answer": "Wings"
    },
    {
      "question": "Which animal is the king of the jungle?",
      "options": ["Tiger", "Elephant", "Lion", "Giraffe"],
      "answer": "Lion"
    }
  ],

  "Air and Water": [
    {
      "question": "What do we breathe to stay alive?",
      "options": ["Water", "Air", "Juice", "Milk"],
      "answer": "Air"
    },
    {
      "question": "Which of these is a source of water?",
      "options": ["Sun", "Moon", "River", "Star"],
      "answer": "River"
    },
    {
      "question": "How can we keep water clean?",
      "options": ["Throw garbage in it", "Use it wisely and not waste it", "Drink dirty water", "Pour oil into it"],
      "answer": "Use it wisely and not waste it"
    }
  ],

  "Our Country": [
    {
      "question": "What do we call the leader of our country?",
      "options": ["Teacher", "Doctor", "President or Prime Minister", "Pilot"],
      "answer": "President or Prime Minister"
    },
    {
      "question": "What do we salute during national events?",
      "options": ["A book", "A tree", "The national flag", "A chair"],
      "answer": "The national flag"
    },
    {
      "question": "Which of these shows love for our country?",
      "options": ["Tearing the flag", "Taking care of the environment", "Not following rules", "Throwing trash everywhere"],
      "answer": "Taking care of the environment"
    }
  ],

  "Different Cultures": [
    {
      "question": "What do people in different cultures celebrate?",
      "options": ["Nothing", "Festivals", "Only birthdays", "Only sports"],
      "answer": "Festivals"
    },
    {
      "question": "What do different cultures have?",
      "options": ["Same food and clothes", "Different foods, clothes, and traditions", "Only one type of language", "Only one type of festival"],
      "answer": "Different foods, clothes, and traditions"
    },
    {
      "question": "Why should we respect different cultures?",
      "options": ["Because everyone is different and special", "Because we must not talk to new people", "Because we should only like our culture", "Because some cultures are not important"],
      "answer": "Because everyone is different and special"
    }
  ]
  };

  // Mock health sciences content
  const healthSciencesContent = {
    "Personal Hygiene": "Personal hygiene is how you care for your body. This practice includes bathing, washing your hands, brushing your teeth, and more. Every day, you come into contact with millions of germs and viruses. They can linger on your body, and in some cases, they may make you sick. Good personal hygiene habits are directly related to less illnesses and better health.",
    "Healthy Food": "Healthy food provides your body with the nutrition it needs to function properly. A balanced diet should include fruits, vegetables, whole grains, proteins, and healthy fats. Eating healthy food helps your body grow strong, gives you energy, and helps prevent diseases.",
    "Exercise": "Exercise is any bodily activity that enhances or maintains physical fitness and overall health and wellness. Regular exercise helps strengthen muscles and bones, improve cardiovascular health, and can help maintain a healthy weight. For children, 60 minutes of physical activity daily is recommended.",
    "Rest and Sleep": "Sleep is essential for good health. During sleep, your body works to support healthy brain function and maintain your physical health. Children aged 6-12 need about 9-12 hours of sleep each night. Good sleep habits include having a regular bedtime routine and avoiding screens before bed.",
    "Numbers and Counting": "Numbers help us count things in our daily life. We count our toys, apples, and even how many steps we take! Counting helps us understand how many things we have and how they change!",
    "Basic Addition": "When we put two groups together, we get more! If you have 2 apples and I give you 3 more, now you have 5 apples. Addition helps us find the total and makes counting easier!",
  "Basic Subtraction": "When we take some things away, we have less left! If you have 4 candies and eat 2, now you only have 2. Subtraction helps us know how many things remain after taking some away!",
  "Shapes & Patterns": "Shapes are all around us, like circles, squares, and triangles. Patterns repeat, like red-blue-red-blue! Learning about shapes and patterns helps us see how things fit together!",
  "Plants and Animals": "Plants grow from seeds and need water, air, and sunlight to live. Animals like cats, dogs, birds, and fish move around and eat food. Both plants and animals are important for nature and help us in different ways!",
  "My Family": "Family is the people who love and take care of us. It includes our parents, grandparents, brothers, and sisters. Families help us, keep us safe, and make us feel happy and loved!",
  "Water and Air": "We drink water when we are thirsty, and we need air to breathe. Water helps us stay strong and healthy, and air keeps all living things alive. Without water and air, we cannot live or grow!",
  "Food and Nutrition": "Eating good food makes us strong, smart, and healthy. Fruits, vegetables, milk, and grains give us energy. Junk food is tasty but should be eaten less because it is not always good for our health!",
  "My Neighbourhood": "Our neighborhood is the area around our home where we live. It has places like schools, parks, hospitals, and shops. We meet friends, neighbors, and helpers in our neighborhood, making it a special place!",
  "Community Helpers": "Community helpers are people who work to keep us safe and happy. Teachers help us learn, doctors take care of us when we are sick, and firefighters put out fires. They make our lives better every day!",
  "Festivals": "Festivals are special days when we celebrate with family and friends. We wear new clothes, eat yummy food, and have lots of fun! Some festivals we celebrate are Diwali, Christmas, Eid, and Holi!",
  "Transport": "We use transport to go from one place to another. Cars, buses, and trains take us on roads and tracks, while boats and airplanes help us travel far. Transport makes traveling easy and fun!",
  "Place Value": "Place value helps us understand the value of each number. In 25, the 2 means twenty, and the 5 means five. Knowing place value helps us read and write numbers correctly!",
  "Adding With Carrying": "Sometimes when we add, the total is more than 9, and we need to carry over. Like 8 + 6 = 14, so we write 4 and carry over 1. Carrying helps us add big numbers easily!",
  "Subtracting with Borrowing": "When we subtract and the top number is smaller, we borrow from the next place. Like in 32 - 7, we borrow from the tens. Borrowing helps us subtract bigger numbers easily!",
  "Multiplication Basics": "Multiplication is adding the same number many times. If you have 3 groups of 2 apples, you have 6 apples in total. It helps us count faster and solve problems easily!",
  "Living and Non-living": "Living things grow, move, and need food, like people, animals, and plants. Non-living things don’t grow or eat, like chairs and rocks. Knowing the difference helps us understand our world!",
  "Plants Around Us": "Plants give us food, shade, and oxygen to breathe. Some plants are big like trees, and some are small like flowers. Taking care of plants helps keep the Earth green and healthy!",
  "Animal World": "Animals live in different places like forests, water, and farms. Some have fur, some have feathers, and some lay eggs. Every animal is special and plays a role in nature!",
  "Air and Water": "Air helps us breathe, and water keeps us hydrated. We must keep air clean and save water by not wasting it. Clean air and water help all living things stay healthy!",
  "Our Country": "Our country is where we live with our people, rules, and culture. It has a flag, a national song, and special places. Loving our country means taking care of it and respecting its people!",
  "Different Cultures": "People from different places have their own food, clothes, and celebrations. Some eat with chopsticks, some with spoons! Learning about different cultures helps us understand and respect each other.",
  "Means of Communication": "We talk, write, or use phones to share ideas. Long ago, people wrote letters, but now we use emails and messages. Communication helps us stay connected with family and friends!",
  "Important Places": "Hospitals, schools, and police stations are important places in our community. They help us learn, stay healthy, and keep us safe. We should respect and take care of these places!",
  "Germs and Diseases": "Germs are tiny living things that can make us sick. Washing hands, eating healthy, and covering our mouth when we sneeze can keep germs away. Staying clean helps us stay healthy!",
  "Healthy Habits": "Brushing teeth, eating good food, and sleeping early are healthy habits. Exercising and drinking water help us grow strong. Good habits keep us happy and full of energy!",
  "First Aid Basics": "First aid helps when someone gets hurt. Cleaning a wound and using a bandage can stop bleeding. Knowing first aid can help us take care of small injuries safely!",
  "Nutrition": "Food gives us energy and helps us grow. Fruits and vegetables are healthy, while too much candy is not. Eating the right food keeps our body strong and our mind sharp!"
  };

  // NavItem component with inline styles
  const NavItem = ({ icon, label, id, route }) => {
    const isActive = activeTab === id;
    
    return (
      <div 
        style={{
          ...styles.navItem,
          ...(isActive ? styles.navItemActive : {})
        }}
        onClick={() => {
          setActiveTab(id); 
          if (route) navigate(route);
        }}
      >
        <span style={styles.icon}>{icon}</span>
        <span>{label}</span>
        {isActive && <div style={styles.navItemActiveLine}></div>}
      </div>
    );
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setShowQuiz(false);
    setQuizAnswers({});
    setShowResults(false);
  };

  // Function to get chapter content
  const getChapterContent = (chapter) => {
    if (healthSciencesContent[chapter]) {
      return healthSciencesContent[chapter];
    }
    return "Content for this chapter is currently being developed. Please check back later.";
  };

  // Function to handle chapter selection
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setShowQuiz(false);
    setQuizAnswers({});
    setShowResults(false);
  };

  // Function to get current quiz questions
  const getCurrentQuiz = () => {
    if (!selectedChapter) return [];
    return quizzes[selectedChapter] || [];
  };
  
  // Function to start quiz
  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setShowResults(false);
  };

  // Function to handle quiz submission
  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  return (
    <div style={styles.body}>
      {/* Navbar from MindShireDashboard */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <div style={styles.logo}>MindShire</div>
          <div style={styles.navItems}>
            <NavItem icon="🏠" label="Home" id="home" route="/dashboard" />
            <NavItem icon="📚" label="Learning" id="learning" route="/learning" />
            {/* <NavItem icon="👤" label="Profile" id="profile" /> */}
          </div>
          <div style={styles.avatar}>JS</div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.container}>
          {/* Grade selector */}
          <div style={styles.gradeSelector}>
            <h2 style={styles.sectionTitle}>Select Grade:</h2>
            <div style={styles.buttonContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                <button
                  key={grade}
                  style={{
                    ...styles.gradeButton,
                    backgroundColor: selectedGrade === grade ? '#1e4d8c' : '#e0e0e0',
                    color: selectedGrade === grade ? 'white' : '#333',
                  }}
                  onClick={() => handleGradeSelect(grade)}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
          
          {/* Subject selector */}
          {selectedGrade && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Select Subject:</h2>
              <div style={styles.buttonContainer}>
                {curriculumByGrade[selectedGrade]?.map(subject => (
                  <button
                    key={subject.id}
                    style={{
                      ...styles.subjectButton,
                      backgroundColor: selectedSubject === subject.subject ? '#1e4d8c' : '#e0e0e0',
                      color: selectedSubject === subject.subject ? 'white' : '#333',
                    }}
                    onClick={() => {
                      setSelectedSubject(subject.subject);
                      setSelectedChapter(null);
                      setShowQuiz(false);
                    }}
                  >
                    {subject.subject}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chapter selector */}
          {selectedSubject && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Select Chapter:</h2>
              <div style={styles.chapterGrid}>
                {curriculumByGrade[selectedGrade]
                  ?.find(subject => subject.subject === selectedSubject)
                  ?.chapters.map(chapter => (
                    <button
                      key={chapter}
                      style={{
                        ...styles.chapterButton,
                        backgroundColor: selectedChapter === chapter ? '#1e4d8c' : '#f0f6ff',
                        color: selectedChapter === chapter ? 'white' : '#333',
                      }}
                      onClick={() => handleChapterSelect(chapter)}
                    >
                      {chapter}
                    </button>
                  ))}
              </div>
            </div>
          )}
          
          {/* Chapter content view */}
          {selectedChapter && !showQuiz && (
            <div style={styles.contentCard}>
              <h2 style={styles.contentTitle}>{selectedChapter}</h2>
              <div style={styles.chapterContent}>
                <p>{getChapterContent(selectedChapter)}</p>
              </div>
              
              {getCurrentQuiz().length > 0 && (
                <button 
                  style={styles.actionButton}
                  onClick={handleStartQuiz}
                >
                  Take Quiz
                </button>
              )}
            </div>
          )}
          
          {/* Quiz component */}
          {showQuiz && selectedChapter && (
            <div style={styles.contentCard}>
              <h2 style={styles.contentTitle}>Quiz: {selectedChapter}</h2>
              
              {getCurrentQuiz().length > 0 ? (
                <>
                  {!showResults ? (
                    <div>
                      {getCurrentQuiz().map((q, index) => (
                        <div key={index} style={styles.questionContainer}>
                          <p style={styles.question}>{q.question}</p>
                          <div style={styles.optionsContainer}>
                            {q.options.map((option, optIndex) => (
                              <div key={optIndex} style={styles.option}>
                                <input
                                  type="radio"
                                  id={`q${index}-opt${optIndex}`}
                                  name={`question-${index}`}
                                  checked={quizAnswers[index] === optIndex}
                                  onChange={() => {
                                    setQuizAnswers({
                                      ...quizAnswers,
                                      [index]: optIndex
                                    });
                                  }}
                                />
                                <label htmlFor={`q${index}-opt${optIndex}`} style={styles.optionLabel}>{option}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        style={{
                          ...styles.actionButton,
                          opacity: Object.keys(quizAnswers).length === getCurrentQuiz().length ? 1 : 0.6
                        }}
                        disabled={Object.keys(quizAnswers).length !== getCurrentQuiz().length}
                        onClick={handleSubmitQuiz}
                      >
                        Submit Answers
                      </button>
                    </div>
                  ) : (
                    <div style={styles.resultsContainer}>
                      <h3 style={styles.resultsTitle}>Your Results</h3>
                      {getCurrentQuiz().map((q, index) => {
                        const isCorrect = quizAnswers[index] === q.options.indexOf(q.answer);
                        return (
                          <div 
                            key={index} 
                            style={{
                              ...styles.resultItem,
                              backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
                            }}
                          >
                            <p style={styles.question}>{q.question}</p>
                            <p>Your answer: <span style={{color: isCorrect ? 'green' : 'red'}}>{q.options[quizAnswers[index]]}</span></p>
                            <p>Correct answer: <span style={{color: 'green'}}>{q.answer}</span></p>
                          </div>
                        );
                      })}
                      
                      <button 
                        style={styles.actionButton}
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizAnswers({});
                          setShowResults(false);
                        }}
                      >
                        Back to Chapter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p style={styles.noContent}>No quiz available for this chapter.</p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Professor Tom in right bottom corner */}
      <div 
        style={styles.professorTom}
        onClick={() => setShowTomTooltip(!showTomTooltip)}
      >
        <span style={styles.professorEmoji}>👨‍🏫</span>
        {showTomTooltip && (
          <div style={styles.largeTooltip}>
            Hey! Let's pick up where you left off.
            <div style={styles.largeTooltipArrow}></div>
          </div>
        )}
      </div>
    </div>
  );
};

// CSS styles object combining both components' styles
const styles = {
  // Navbar styles from MindShireDashboard
  body: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    margin: 0,
    padding: 0,
  },
  navbar: {
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  navbarContent: {
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  navItems: {
    display: 'flex',
    gap: '2rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(219, 234, 254, 0.9)',
    cursor: 'pointer',
    position: 'relative',
  },
  navItemActive: {
    color: 'white',
  },
  navItemActiveLine: {
    position: 'absolute',
    bottom: '-1rem',
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '3px 3px 0 0',
  },
  icon: {
    marginRight: '0.5rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  professorTom: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #E5E7EB',
    position: 'fixed',
    right: '40px',
    bottom: '40px',
    zIndex: 5,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  largeTooltip: {
    position: 'absolute',
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    left: '-220px',
    top: '50%',
    transform: 'translateY(-50%)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    width: '200px',
    zIndex: 10,
  },
  largeTooltipArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid #1E40AF',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  professorEmoji: {
    fontSize: '40px',
  },
  
  // BlueCurriculumApp styles
  container: {
    maxWidth: '900px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#f7faff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    color: '#333'
  },
  header: {
    color: '#0d2b4f',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    borderBottom: '2px solid #3f75c1',
    paddingBottom: '10px'
  },
  sectionTitle: {
    color: '#0d2b4f',
    marginBottom: '15px',
    fontSize: '20px'
  },
  gradeSelector: {
    marginBottom: '25px',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  section: {
    marginBottom: '25px',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  gradeButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    minWidth: '40px'
  },
  subjectButton: {
    padding: '12px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    flex: '1 0 auto'
  },
  chapterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px'
  },
  chapterButton: {
    padding: '15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    minHeight: '60px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  contentCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    marginBottom: '25px'
  },
  contentTitle: {
    color: '#1e4d8c',
    marginTop: '0',
    marginBottom: '15px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px'
  },
  chapterContent: {
    lineHeight: '1.6',
    fontSize: '16px',
    marginBottom: '20px'
  },
  actionButton: {
    backgroundColor: '#1e4d8c',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  questionContainer: {
    marginBottom: '25px',
    backgroundColor: '#f0f6ff',
    padding: '15px',
    borderRadius: '8px'
  },
  question: {
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#1e4d8c'
  },
  optionsContainer: {
    marginLeft: '10px'
  },
  option: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  optionLabel: {
    fontSize: '15px'
  },
  resultsContainer: {
    marginTop: '20px'
  },
  resultsTitle: {
    color: '#1e4d8c',
    marginBottom: '15px'
  },
  resultItem: {
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  noContent: {
    fontStyle: 'italic',
    color: '#666'
  }
};

export default BlueCurriculumApp;