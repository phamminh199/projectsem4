import bcrypt from "bcryptjs-react"; // npm i bcryptjs-react
import collectionAPI from '../../API/collectionAPI';

export function setLocalStorageWithExpiry(key: string, value: string, howLong: number) {
   //Phải check value là phải ở dạng string trước khi vào hàm này
   const now = new Date(); //get current time
   // now.getTime(): getTime() returns the number of milliseconds since January 1, 1970 00:00:00.

	const object = {
		value: value, //value chính là nội dung cần lưu
		expiry: now.getTime() + howLong, //cái này dùng đẻ tính tổng thời gian từ lúc set + khoảng thời gian muốn lưu, sau này muốn check thì lấy thời gian lúc check xem có lớn hơn cài này ko, nếu lớn hơn thì cho remoce localstorage vì hết thời gian
	}
   localStorage.setItem(key, JSON.stringify(object));  //phải chuyển thành string thì mới lưu trong localStorage được
}

export function getLocalStorageWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
   const item = JSON.parse(itemStr); //chuyển sang object

   const now = new Date();
   
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
      localStorage.removeItem(key);
		return null
	}
	return item.value
}

// 1 minute = 60000 miliseconds
// 1 hour = 3600000 miliseconds
// 1 day = 86400000 miliseconds

export function setSessionWithExpiry(obj: any, sessionName: string, hoursLimit: number) {
	// console.log('obj: ' + JSON.stringify(obj, null, 4));
    // Calculate the expiry time
    var now = new Date();
    var expiryTime = now.getTime() + hoursLimit * 3600000; // Convert hours to milliseconds

    // Create an object to store the data and expiry time
    var sessionData = {
        data: obj,
        expiryTime: expiryTime
    };
	// console.log('sessionData: ' + JSON.stringify(sessionData, null, 4));
    // Convert the object to a string
    var serializedObject = JSON.stringify(sessionData);

    // Save the object to session storage
    sessionStorage.setItem(sessionName, serializedObject);

	// if (sessionStorage.getItem(sessionName) !== null) {
    //     console.log("Session saved successfully.");
    // } else {
    //     console.log("Error saving session.");
    // }
}

export function getSession(sessionName: string) {
	// console.log("sessionName getSession: " + JSON.stringify(sessionName, null, 4));
    // Retrieve the serialized object from session storage
    var serializedObject: any = sessionStorage.getItem(sessionName);

	// console.log('serializedObject: ' + JSON.stringify(serializedObject, null, 4));

    if (serializedObject === null) {
        return null; // Session does not exist
    }

    // Convert the serialized object back to an object
    var sessionData = JSON.parse(serializedObject);

	// Check if the session has expired
    var now = new Date();
    if (now.getTime() > sessionData.expiryTime) {
        sessionStorage.removeItem(sessionName); // Remove the expired session
        return null; // Session has expired
    }
	// console.log("sessionData.data: " + JSON.stringify(sessionData.data, null, 4));
    return sessionData.data;
}

// Password must have minimum 8 characters, maximum 20, including 1 uppercase, 1 lowercase, 1 number, 1 special character and no space between
export function validatePassword(password: string) {
	// Check if the password meets the length requirement
	if (password.length < 8 || password.length > 20) {
		return false;
	}

	// Check if the password contains at least one uppercase letter, one lowercase letter, one number, and one special character
	var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/;
	if (!regex.test(password)) {
		return false;
	}

	// Check if the password contains any spaces
	if (password.indexOf(' ') !== -1) {
		return false;
	}

	// All validation checks passed, password is valid
	return true;
}

export function validateEmail(email: string) {
	console.log('email in validateEmail: ', email);

	// Email validation regular expression pattern
	var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	// Test the email against the regular expression pattern
	return regex.test(email);
}

export function validatePhone(phone: string) {
	var numericPhone = phone.replace(/\D/g, '');

	if (numericPhone.length >= 7 && numericPhone.length <= 15) {
		var firstDigit = numericPhone.charAt(0);
		var allDigitsSame = numericPhone.slice(1).split('').every(digit => digit === numericPhone.charAt(1));
		var containsSpace = phone.includes(' ');
		var containsNonDigit = /\D/.test(numericPhone);

		if (!allDigitsSame && !containsSpace && !containsNonDigit) {
		return true;
		}
	}

	return false;
}

export function validateBirthday(birthday: string) {
	// Convert the birthday string to a Date object
	var birthDate = new Date(birthday);
	
	// Get the current date
	var currentDate = new Date();
	
	// Calculate the age in years
	var age = currentDate.getFullYear() - birthDate.getFullYear();
	
	// Compare the age with the minimum and maximum values
	if (age >= 18 && age <= 90) {
		return true;
	} else {
		return false;
	}
}

export function validateFullName(fullName:string) {

	// Check if the full name meets the minimum character length requirement
	if (fullName.length >= 5 && fullName !== "") {
	  return true; // Valid full name
	} else {
	  return false; // Invalid full name
	}
}

export const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms)); // HÀM NÀY CỰC QUAN TRỌNG, NÓ CÓ NHIỆM VỤ YÊU CẦU CHƯƠNG TRÌNH ĐỢI t GI Y TRƯỚC KHI CHO ĐI TIẾP

// nhớ thêm trên đầu
// import bcrypt from "bcryptjs-react"; // npm i bcryptjs-react
// Function to hash a password
export const hashPassword = async (password: string) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.log('Error while hashing password:', error);
		throw error;
	}
};

// Function to compare a password with a hashed password
export const comparePassword = async (password: string, hashedPassword:string) => {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		console.log('Error while comparing passwords:', error);
		throw error;
	}
};

export const getCurrentDate = () => {
            
	const currentDate = new Date(); // 
	const year = currentDate.getFullYear(); // Get the current year (e.g., 2023)
	const month = currentDate.getMonth(); // Get the current month (0-11; 0 represents January, 11 represents December)
	const day = currentDate.getDate(); // Get the current day of the month (1-31)

	// Adjust month and day to display as two digits if needed
	const formattedMonth = month < 9 ? `0${month + 1}` : `${month + 1}`;
	const formattedDay = day < 10 ? `0${day}` : `${day}`;

	// Create the date string in the desired format (e.g., "2023-07-10")
	const currentDateStr = `${year}-${formattedMonth}-${formattedDay}`;

	return currentDateStr;
	// console.log(currentDateStr); // O
	
}

export function generateIdBytime() {
	const currentDate = new Date();
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const seconds = currentDate.getSeconds();
	const years = currentDate.getFullYear();
	const months = currentDate.getMonth();
	const day = currentDate.getDay();
	// const le = years  1000; // chỉ lấy số 23 thôi thay vì 2023
	// Combine hours and seconds into a single string
	const combinedValue = `${months}${day}${hours}${minutes}${seconds}`;
	const finalNumber = Number(combinedValue);
	console.log(finalNumber);
	return finalNumber;
}

let arrPositive = [
	"positive",
	"great",
	"Excellent",
	"Outstanding",
	"Exceptional",
	"nice",
	"comfortable",
	"Remarkable",
	"Impressive",
	"Extraordinary",
	"Fantastic",
	"Incredible",
	"Superb",
	"Marvelous",
	"Phenomenal",
	"Terrific",
	"Wonderful",
	"Amazing",
	"Awesome",
	"Admirable",
	"Commendable",
	"Exemplary",
	"Stellar",
	"inspiring",
	"Splendid",
	"Brilliant",
	"Fabulous",
	"Splendiferous",
	"Spectacular",
	"Great",
	"good",
	"Bravo",
	"excited",
	"well",
	"high",
	"Absolutely",
    "Abundant",
    "Accessible",
    "Acclaimed",
    "Accommodative",
    "Achievement",
    "Adaptive",
    "Admire",
    "Adore",
    "Adulation",
    "Affability",
    "Agathist",
    "Alive",
    "Amuse",
    "Animated",
    "Approve",
    "Assure",
    "Attractive",
    "Awesome",
    "Baronial",
    "Beaming",
    "Beautiful",
    "Beguiling",
    "Beloved",
    "Benignant",
    "Best",
    "Bewitching",
    "Boss",
    "Brainy",
    "Breathtaking",
    "Bubbly",
    "Centered",
    "Champion",
    "Charismatic",
    "Charming",
    "Cheerful",
    "Chic",
    "Chipper",
    "Chummy",
    "Classy",
    "Clever",
    "Colorful",
    "Comical",
    "Communicative",
    "Constant",
    "Courageous",
    "Definite",
    "Delectable",
    "Delicious",
    "Delightful",
    "Dependable",
    "Dignified",
    "Divine",
    "Down-to-earth",
    "Dreamy",
    "Dynamite",
    "Ecstatic",
    "Electrifying",
    "Employable",
    "Empowered",
    "Endearing",
    "Enjoyable",
    "Enriching",
    "Enthusiastic",
    "Enticing",
    "Especial",
    "Excellent",
    "Exciting",
    "Exhilarating",
    "Exultant",
    "Fab",
    "Fain",
    "Fantastic",
    "Fashionable",
    "Favorite",
    "Fearless",
    "Fetching",
    "Fiery",
    "Friend",
    "Fun",
    "Gallant",
    "Gay — lighthearted and carefree",
    "Genuine",
    "Gifted",
    "Gleaming",
    "Glittering",
    "Gnarly",
    "Goodhearted",
    "Grandiose",
    "Greatest",
    "Gumptious",
    "Happy",
    "Heavenly",
    "Honorable",
    "Hospitable",
    "Humanitarian",
    "Hypnotic",
    "Ideal",
    "Imaginative",
    "Impeccable",
    "Impressive",
    "Incredible",
    "Innovative",
    "Insightful",
    "Inspiring",
    "Instinctive",
    "Intellectual",
    "Irresistible",
    "Jammy",
    "Jesting",
    "Jolly",
    "Jovial",
    "Joysome",
    "Judicious",
    "Juicy",
    "Just",
    "Keen",
    "Kind-hearted",
    "Knightly",
    "Knockout",
    "Knowledgeable",
    "Laid-back",
    "Lambent",
    "Laudable",
    "Legendary",
    "Level-headed",
    "Likable",
    "Lionhearted",
    "Lively",
    "Lovely",
    "Luminous",
    "Magical",
    "Magnetic",
    "Magnificent",
    "Majestic",
    "Marvelous",
    "Masterful",
    "Mindful",
    "Miraculous",
    "Motivated",
    "Moving",
    "Neighborly",
    "Nifty",
    "Noble",
    "Numinous",
    "Obedient",
    "Obliging",
    "Observant",
    "On-target",
    "Open-hearted",
    "Open-minded",
    "Optimistic",
    "Orderly",
    "Organized",
    "Original",
    "Outgoing",
    "Out-of-this-world",
    "Outstanding",
    "Overjoyed",
    "Pally",
    "Paramount",
    "Passionate",
    "Patient",
    "Peaceful",
    "Peachy",
    "Peppy",
    "Perceptive",
    "Persevering",
    "Persistent",
    "Personable",
    "Persuasive",
    "Phenomenal",
    "Philanthropic",
    "Picturesque",
    "Piquant",
    "Playful",
    "Polished",
    "Posh",
    "Prized",
    "Proactive",
    "Promising",
    "Proud",
    "Punctual",
    "Queenly",
    "Quick-witted",
    "Quirky",
    "Rad",
    "Radiant",
    "Rapturous",
    "Razor-sharp",
    "Reassuring",
    "Recherche",
    "Recommendable",
    "Refulgent",
    "Reliable",
    "Remarkable",
    "Resilient",
    "Resourceful",
    "Respectable",
    "Revolutionary",
    "Saccharine",
    "Sagacious",
    "Savvy",
    "Self-assured",
    "Sensational",
    "Sincere",
    "Snappy",
    "Snazzy",
    "Spellbinding",
    "Splendiferous",
    "Spunky",
    "Stellar",
    "Striking",
    "Teeming",
    "Tender-hearted",
    "Thoughtful",
    "Thriving",
    "Timeless",
    "Tolerant",
    "Trailblazing",
    "Transcendental",
    "Tubular",
    "Upbeat",
    "Uplifting",
    "Upstanding",
    "Urbane",
    "Valiant",
    "Vibrant",
    "Victorious",
    "Visionary",
    "Vivacious",
    "Warm",
    "Well-read",
    "Whimsical",
    "Whiz-bang",
    "Wholehearted",
    "Winsome",
    "Wise",
    "Witty",
    "Wizardly",
    "Wondrous",
    "Worldly",
    "Xenial",
    "Xenodochial",
    "Yay",
    "Yes",
    "Yummiest",
    "Zappy",
    "Zazzy",
    "Zealful",
    "Zealous"
]
let arrNegative = [
	"No",
	"Not",
	"Abrasive",
	"useless",
	"Apathetic",
	"Controlling",
	"Dishonest",
	"Impatient",
	"Anxious",
	"Betrayed",
	"Disappointed",
	"Embarrassed",
	"Jealous",
	"Abysmal",
	"Bad",
	"Callous",
	"Corrosive",
	"Damage",
	"Despicable",
	"Don’t",
	"Enraged",
	"Fail",
	"Gawky",
	"Haggard",
	"Hurt",
	"Icky",
	"lack",
	"Insane",
	"Jealous",
	"Lose",
	"Malicious",
	"Naive",
	"Objectionable",
	"Pain",
	"Questionable",
	"Reject",
	"Rude",
	"Sad",
	"Sinister",
	"Stuck",
	"Tense",
	"Ugly",
	"Unsightly",
	"Vice",
	"Wary",
	"Yell",
	"Zero",
	"Adverse",
	"Banal",
	"Can’t",
	"Corrupt",
	"Damaging",
	"Detrimental",
	"Dreadful",
	"Eroding",
	"Faulty",
	"Ghastly",
	"Hard",
	"Hurtful",
	"Ignorant",
	"Insidious",
	"Junky",
	"Lousy",
	"Mean",
	"Nasty",
	"Noxious",
	"Odious",
	"Perturb",
	"Quirky",
	"Renege",
	"Ruthless",
	"Savage",
	"Slimy",
	"Stupid",
	"Terrible",
	"Undermine",
	"Untoward",
	"Vicious",
	"Weary",
	"Yucky",
	"Alarming",
	"Barbed",
	"Clumsy",
	"Dastardly",
	"Dirty",
	"Dreary",
	"Evil",
	"Fear",
	"Grave",
	"Hard-hearted",
	"Ignore",
	"Injure",
	"Insipid",
	"Lumpy",
	"Menacing",
	"Naughty",
	"None",
	"Offensive",
	"Pessimistic",
	"Quit",
	"Repellant",
	"Scare",
	"Smelly",
	"Substandard",
	"Terrifying",
	"Unfair",
	"Unwanted",
	"Vile",
	"Wicked",
	"Angry",
	"Belligerent",
	"Coarse",
	"Crazy",
	"Dead",
	"Disease",
	"Feeble",
	"Greed",
	"Harmful",
	"Ill",
	"Injurious",
	"Messy",
	"Negate",
	"No one",
	"Old",
	"Petty",
	"Reptilian",
	"Scary",
	"Sobbing",
	"Suspect",
	"Threatening",
	"Unfavorable",
	"Unwelcome",
	"Villainous",
	"Woeful",
	"Annoy",
	"Bemoan",
	"Cold",
	"Creepy",
	"Decaying",
	"Disgusting",
	"Fight",
	"Grim",
	"Hate",
	"Immature",
	"Misshapen",
	"Negative",
	"Nothing",
	"Oppressive",
	"Plain",
	"Repugnant",
	"Scream",
	"Sorry",
	"Suspicious",
	"Unhappy",
	"Unwholesome",
	"Vindictive",
	"Worthless",
	"Anxious",
	"Beneath",
	"Cold-hearted",
	"Criminal",
	"Deformed",
	"Disheveled",
	"Filthy",
	"Grimace",
	"Hideous",
	"Imperfect",
	"Missing",
	"Never",
	"Neither",
	"Poisonous",
	"Repulsive",
	"Severe",
	"Spiteful",
	"Unhealthy",
	"Unwieldy",
	"Wound",
	"Apathy",
	"Boring",
	"Collapse",
	"Cruel",
	"Deny",
	"Dishonest",
	"Foul",
	"Gross",
	"Homely",
	"Impossible",
	"Misunderstood",
	
	"Nowhere",
	"Poor",
	"Revenge",
	"Shocking",
	"Sticky",
	"Unjust",
	"Unwise",
	"Appalling",
	"Broken",
	"Confused",
	"Cry",
	"Deplorable",
	"Dishonorable",
	"Frighten",
	"Grotesque",
	"Horrendous",
	"Inane",
	"Moan",
	"Nobody",
	"Prejudice",
	"Revolting",
	"Shoddy",
	"Stinky",
	"Unlucky",
	"Upset",
	"Atrocious",
	"Contrary",
	"Cutting",
	"Depressed",
	"Dismal",
	"Frightful",
	"Gruesome",
	"Horrible",
	"Inelegant",
	"Moldy",
	"Nondescript",
	"Rocky",
	"Sick",
	"Stormy",
	"Unpleasant",
	"Awful",
	"Contradictory",
	"Deprived",
	"Distress",
	"Guilty",
	"Hostile",
	"Infernal",
	"Monstrous",
	"Nonsense",
	"Rotten",
	"Sickening",
	"Stressful",
	"Unsatisfactory",
	"Adverse",
	"Critical",
	"Dissatisfied",
	"Displeased",
	"Faulty",
	"Inadequate",
	"Ineffective",
	"Incomplete",
	"Inaccurate",
	"Irresponsible",
	"Negligible",
	"Non-compliant",
	
	"Objectionable",
	"Poor",
	"Rejected",
	"Unacceptable",
	"Unsatisfactory",
	"Unwelcome",
	"Unworthy",
	"Woeful",
	"Atrocious",
	"Disastrous",
	"Dreadful",
	"Horrible",
	"Lousy",
	"Miserable",
	"Nasty",
	"Pathetic",
	"Rotten",
	"Scandalous",
	"Terrible",
	"Unbearable",
	"Unsalvageable",
	"Worthless",
	"Wretched",
	"Dissatisfaction",
	"Displeasure",
	"Criticism",
	"Unhappy",
	"Frustration",
	"Concern",
	"Grievance",
	"Discontent",
	"Grumble",
	"Fault",
	"Deficiency",
	"Flaw",
	"Inadequate",
	"Unacceptable",
	"Error",
	"Issue",
	"Problem",
	"Miscommunication",
	"Mismanagement",
	"Unreliable",
	"Delays",
	"Confusion",
	"Inefficiency",
	"Disorganization",
	"Disappointment",
	"Inferior",
	"Regret",
	"Neglect",
	"Insufficient",
	"Unsatisfactory",
	"Misrepresentation",
	"Negligence",
	"Inconsistency",
	"Limitation",
	"Inaccuracy",
	"Ineffectiveness",
	"Complexity",
	"Ambiguity",
	"Disapproval",
	"Shortcoming",
	"Adverse",
	"Critical",
	"Dissatisfied",
	"Displeased",
	"Faulty",
	"Inadequate",
	"Ineffective",
	"Incomplete",
	"Inaccurate",
	"Irresponsible",
	"Negligible",
	"Non-compliant",
	
	"Objectionable",
	"Poor",
	"Rejected",
	"Unacceptable",
	"Unsatisfactory",
	"Unwelcome",
	"Unworthy",
	"Woeful",
	"Atrocious",
	"Disastrous",
	"Dreadful",
	"Horrible",
	"Lousy",
	"Miserable",
	"Nasty",
	"Pathetic",
	"Rotten",
	"Scandalous",
	"Terrible",
	"Unbearable",
	"Unsalvageable",
	"Worthless",
	"Wretched",
	"Abominable",
	"Atrocious",
	"Beneath contempt",
	"Bizarre",
	"Bogus",
	"Callous",
	"Catastrophe",
	"Craven",
	"Cruel",
	"Debacle",
	"Degenerate",
	"Disastrous",
	"Dismal",
	"Dismal",
	"Dismal",
	"Disreputable",
	"Dreadful",
	"Execrable",
	"Foul",
	"Frightful",
	"Ghastly",
	"Gross",
	"Heinous",
	"Hopeless",
	"Horrific",
	"Incompetent",
	"Inept",
	"Insidious",
	"Intolerable",
	"Joke",
	"Lame",
	"Lousy",
	"Malicious",
	"Monstrous",
	"Negligent",
	"Obscene",
	"Obnoxious",
	"Painful",
	"Pathetic",
	"Rash",
	"Ridiculous",
	"Scandalous",
	"Shameful",
	"Shocking",
	"Sloppy",
	"Squalid",
	"Terrible",
	"Unacceptable",
	"Unbearable",
	"Unpleasant",
	"Unsatisfactory",
	"Buggy",
	"Glitch",
	"Expensive",
	"Arrogant",
	"Unresponsive",
	"Underwhelming",
	"Mediocre",
	"Incompetent",
	"Inflexible",
	"Unprofessional",
	"Dissatisfying",
	"Uncooperative",
	"Untrustworthy",
	"Wasted",
	"Abandonment",
	"Bland",
	"Lousy",
	"Disrespectful",
	"Indifferent",
	"Unsympathetic",
	"Unfair",
	"Faulty",
	"Disorganized",
	"Inferior",
	"Slow",
	"Dismissive",
	"Inept",
	"Unimaginative",
	"Inconsiderate",
	"Unreliable",
	"Uncaring",
	"Unreceptive",
	"Sloppy",
	"Uninspired",
	"Uncommunicative",
	"Inefficient",
	"Outdated",
	"Failing",
	"Negligent",
	"didn't",
	"don't",
	"doesn't",
	"does not",
	"did not",
	"isn't",
	"is not",
	"aren't",
	"are not",
	"unfair"
]
const arrDangerous =[
	"abuse",
	"drugs",
	"drug",
	"heroin",
	"rape",
"affront",
"aspersion",
"belittle",
"calumny",
"censure",
"contumely",
"contumely",
"defame",
"denigrate",
"disparage",
"disrespect",
"effrontery",
"execration",
"flout",
"foul-mouthed",
"gibe",
"impugn",
"invective",
"irreverence",
"jeer",
"libel",
"mockery",
"obloquy",
"offense",
"outrage",
"profanity",
"revile",
"sarcasm",
"slander",
"slur",
"spite",
"spitefulness",
"spitefulness",
"taunt",
"vilification",
"vituperation",
"vulgarity",
"dangerous",
"insult",
"kill",
"hate",
"headshot",
"shit",
"bushit",
"motherfucker",
"fuck",
"deepshit",
"rape",
"sex",
"porn",
"hardcore",
"punch",
"hit",
"kick",
"slap",
"idiot",
"bastard",
"fuckface",
"dog",
"animal",
"tyrant",
"dangerous",
"hazedous",
"toxic",
"racist",
"insult",
"racist",
"agitation",
"distorted",
"offence",
"destructive",
"cry",
"rape",
"slave",
"toxic",
"hazardous",
"bitch",
"lying",
"lie"
]
const arrQuestion = [
	"?"
]
const whQuestion = [
	"who","what","when","where","why","how","am","is","are"
]


// Function to find positive words in the comment
export function findPositiveWords(comment:string) {
	// Convert the comment to lowercase and split it into individual words
	const commentWords = comment.toLowerCase().split(/\s+/);

	let positiveWordsFound = [];
	// Initialize an array to store positive words found in the comment
	// Loop through each positive word and check if it exists in the comment
	for (const positiveWord of arrPositive) {
		// Convert the positive word to lowercase for case-insensitive comparison
		const lowerCasePositiveWord = positiveWord.toLowerCase();
		
		// Check if the positive word exists in the comment
		if (commentWords.includes(lowerCasePositiveWord)) {
			positiveWordsFound.push("positive")
		}
	}

	return positiveWordsFound;
}

export function findNegativeWords(comment:string) {
	// Convert the comment to lowercase and split it into individual words
	const commentWords = comment.toLowerCase().split(/\s+/);

	// Initialize an array to store positive words found in the comment
	let negativeWordsFound = [];

	// Loop through each positive word and check if it exists in the comment
	for (const negativeWord of arrNegative) {
		// Convert the positive word to lowercase for case-insensitive comparison
		const lowerCaseNegativeWord = negativeWord.toLowerCase();
		
		// Check if the positive word exists in the comment
		for (let i = 0; i < commentWords.length; i++){
			if(commentWords[i] == lowerCaseNegativeWord){
				if(lowerCaseNegativeWord == "not"){
					negativeWordsFound.push("not")
					console.log('i: ', i);
				}
				else {
					negativeWordsFound.push("negative")
				}

			}
		
		
		}  
	}

	return negativeWordsFound;
}
export function findDangerousWords(comment:string) {
	// Convert the comment to lowercase and split it into individual words
	const commentWords = comment.toLowerCase().split(/\s+/);

	// Initialize an array to store positive words found in the comment
	let dangerousWordFound = [];

	// Loop through each positive word and check if it exists in the comment
	for (const word of arrDangerous) {
		// Convert the positive word to lowercase for case-insensitive comparison
		const lowerCaseNegativeWord = word.toLowerCase();
		
		// Check if the positive word exists in the comment
		for (let i = 0; i < commentWords.length; i++){
			if(commentWords[i] == lowerCaseNegativeWord){
				dangerousWordFound.push("dangerous")

			}
		
		
		}  
	}

	return dangerousWordFound;
}

export function isWhQuestion(sentence:string) {
	const lowerCaseSentence = sentence.toLowerCase();

	// Loop through the whQuestion array and check if the sentence starts with any of the words
	for (const questionWord of whQuestion) {
		if (lowerCaseSentence.startsWith(questionWord)) {
		return true;
		}
	}

	return false;
}

export function isQuestionEndWith(sentence:string) {
	// Trim any leading or trailing white spaces
	const trimmedSentence = sentence.trim();

	// Check if the sentence ends with a question mark
	return trimmedSentence.endsWith('?');
}

export function getTypeOfComment(stateComment: string){
    let type = "";
	let pos = findPositiveWords(stateComment)
	// console.log('pos: ', pos);
	let neg = findNegativeWords(stateComment)
	// console.log('neg: ', neg);
	let dag = findDangerousWords(stateComment)
	// console.log('dag: ', dag);
	let question = isWhQuestion(stateComment);
	let questionMark = isQuestionEndWith(stateComment);
	if(neg[0]=="not" && pos.length > 0){
		type = "negative"
	}
	else if(neg[0]=="not" && pos.length == 0 && neg.length == 1){
		type = "negative"
	}
	else if(neg[0]=="not" && neg.length > 0){
		type = "unknown"
	}
	else if(pos.length > 0 && neg.length == 0){
		type = "positive"
	}
	else if(pos.length == 0 && neg.length != 0){
		type = "negative"
	}
	
	else if(question == true){
		type = "question"
	}
	else if(questionMark == true){
		type = "question"
	}
	else {
		type = "unknown"
	}

	if(dag.length > 0){
		type = "dangerous"
	}
	// console.log('type: ', type);
	return type;
}

export const getUserSignIn = () => {
            
	const can = getSession('sessioncandidatesignin'); // lấy từ session ra
	const con = getSession('sessioncontrollersignin'); // lấy từ session ra
	const emp = getSession('sessionemployersignin'); // lấy từ session ra

	// console.log('can: ', can);
	// console.log('con: ', con);
	// console.log('emp: ', emp);

	if (can !== null) {
        return can;
    }

    if (con !== null) {
        return con;
    }

    if (emp !== null) {
        return emp;
    }

    // If all values are null, you can return a default value or null, depending on your use case.
    return null;
	
}

export function getCurrentDateTimeWithTimezoneOffset() {
	const date = new Date();
	const timezoneOffset = 7 * 60 * 60 * 1000; // +7 timezone offset in milliseconds
	const adjustedDate = new Date(date.getTime() + timezoneOffset);
	const formattedDate = adjustedDate.toISOString().replace("Z", "+07:00");

	return formattedDate;
}

export const addSearchMonitor = async (searchInput:string) => {

	let data = {
		"search": searchInput,
		"searchtime" : getCurrentDateTimeWithTimezoneOffset()
	}
	console.log('data: ', data);
	let response: any;
	try {
	   	response = await collectionAPI.addSearchMonitor(data); // sau khi add xong thì thì bên java ta cho nó trả về viewreview luôn để nó cập nhật lại data về review
		console.log('response: ', response);
	}catch(err){
		console.log('err:', err);
	}

}