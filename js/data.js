/* =========================================================
   J. R. P Islamic Dawat Committee — Central Data
   All content lives here. Update in one place; pages reflect.
   ========================================================= */

const JRP = {
    orgName: "J. R. P Islamic Dawat Committee",
    tagline: "Calling towards goodness, knowledge and a life guided by the Qur'an and Sunnah.",
    // Replace with real details when provided
    contact: {
        phone: "[Phone Number]",
        whatsapp: "[WhatsApp Number]",
        email: "[Email Address]",
        address: "[Organization Address]"
    },
    social: {
        youtube: "[YouTube URL]",
        facebook: "[Facebook URL]",
        whatsapp: "[WhatsApp URL]"
    },
    donate: {
        upi: "[UPI ID]",
        accountName: "[Account Name]",
        accountNumber: "[Bank Account Number]",
        ifsc: "[IFSC Code]",
        bank: "[Bank Name]",
        qr: "images/donate-qr.png"
    }
};

/* ---------- Activities ---------- */
const activities = [
    {
        id: "discussions",
        icon: "book",
        title: "Islamic Discussion Sessions",
        short: "Community discussions about Islamic knowledge, youth issues, life purpose, and guidance from Qur'an and Sunnah.",
        long: "Our regular discussion circles bring the community together to reflect on authentic Islamic teachings, address contemporary questions, and strengthen faith through knowledge and brotherhood."
    },
    {
        id: "quran-hadith",
        icon: "quran",
        title: "Qur'an & Hadith Education",
        short: "Educational sessions focused on understanding authentic Islamic teachings.",
        long: "Structured learning circles covering Qur'anic recitation, tafsir basics, and authentic Hadith studies with proper references and scholarly context."
    },
    {
        id: "quiz",
        icon: "trophy",
        title: "Islamic Quiz Competition",
        short: "Online/offline Islamic quiz competitions designed to encourage learning.",
        long: "Fun and educational quiz events for youth and adults to test and grow their Islamic knowledge in a healthy, encouraging environment."
    },
    {
        id: "youth",
        icon: "users",
        title: "Youth Programs",
        short: "Programs addressing youth development, Islamic character, responsibilities, and positive community participation.",
        long: "Dedicated initiatives helping young Muslims build strong character, understand their purpose, and contribute positively to society."
    },
    {
        id: "community",
        icon: "hands",
        title: "Community Activities",
        short: "Beneficial activities organized for the local Muslim community.",
        long: "From iftar gatherings to relief efforts and educational drives — practical programs that strengthen community bonds."
    },
    {
        id: "mosque",
        icon: "mosque",
        title: "Mosque Activities",
        short: "Educational, organizational, cleanliness, and other beneficial mosque-related initiatives.",
        long: "Supporting the local masjid through educational programs, maintenance initiatives, and community service — because the masjid is the heart of the community."
    }
];

/* ---------- Events ---------- */
/* Dates use ISO format (YYYY-MM-DD) so they can be sorted/filtered easily. */
const events = [
    {
        id: "event-01",
        title: "Islamic Discussion Session",
        date: "2026-09-11",
        time: "9:30 PM",
        venue: "Joyrampur Jame Mosque",
        organizer: "J. R. P Islamic Dawat Committee",
        category: "upcoming",
        description: "A community discussion on understanding life's purpose through the Qur'an and Sunnah. Open to all brothers and youth.",
        image: "images/events/event-01.jpg",
        registrationOpen: true
    },
    {
        id: "event-02",
        title: "Youth Islamic Quiz Competition",
        date: "2026-10-05",
        time: "5:00 PM",
        venue: "[Venue TBD]",
        organizer: "J. R. P Islamic Dawat Committee",
        category: "upcoming",
        description: "An interactive Islamic quiz for youth — a chance to learn, compete and grow in knowledge together.",
        image: "images/events/event-02.jpg",
        registrationOpen: true
    },
    {
        id: "event-03",
        title: "Qur'an & Hadith Study Circle",
        date: "2026-08-20",
        time: "8:00 PM",
        venue: "Joyrampur Jame Mosque",
        organizer: "J. R. P Islamic Dawat Committee",
        category: "past",
        description: "A focused study session on selected authentic Hadith with explanation and practical guidance.",
        image: "images/events/event-03.jpg",
        registrationOpen: false
    }
];

/* ---------- Committee ---------- */
/* Placeholders — replace with real names/photos when provided. */
const committee = {
    leadership: [
        { name: "[President Name]", position: "President", image: "images/committee/president.jpg", bio: "[Short introduction]" },
        { name: "[Vice President Name]", position: "Vice President", image: "images/committee/vp.jpg", bio: "[Short introduction]" },
        { name: "[Secretary Name]", position: "Secretary", image: "images/committee/secretary.jpg", bio: "[Short introduction]" },
        { name: "[Treasurer Name]", position: "Treasurer", image: "images/committee/treasurer.jpg", bio: "[Short introduction]" }
    ],
    members: [
        { name: "[Member Name]", position: "Committee Member", image: "images/committee/member-01.jpg", bio: "[Short introduction]" },
        { name: "[Member Name]", position: "Committee Member", image: "images/committee/member-02.jpg", bio: "[Short introduction]" },
        { name: "[Member Name]", position: "Committee Member", image: "images/committee/member-03.jpg", bio: "[Short introduction]" }
    ]
};

/* ---------- Gallery ---------- */
const galleryItems = [
    { src: "images/gallery/gallery-01.jpg", category: "programs",  title: "Islamic Program" },
    { src: "images/gallery/gallery-02.jpg", category: "youth",     title: "Youth Event" },
    { src: "images/gallery/gallery-03.jpg", category: "quiz",      title: "Quiz Competition" },
    { src: "images/gallery/gallery-04.jpg", category: "mosque",    title: "Mosque Activity" },
    { src: "images/gallery/gallery-05.jpg", category: "community", title: "Community Activity" },
    { src: "images/gallery/gallery-06.jpg", category: "programs",  title: "Islamic Program" },
    { src: "images/gallery/gallery-07.jpg", category: "youth",     title: "Youth Event" },
    { src: "images/gallery/gallery-08.jpg", category: "quiz",      title: "Quiz Competition" }
];

/* ---------- Islamic Resources ---------- */
/* NOTE: Qur'an/Hadith entries must always include authentic references. */
const resources = [
    {
        category: "Qur'an",
        title: "Qur'anic Guidance",
        description: "Selected Qur'anic verses with translation and brief reflection. Each entry must include the Surah name and verse reference.",
        reference: "[Surah : Ayah] — translation to be added with verification."
    },
    {
        category: "Hadith",
        title: "Authentic Hadith",
        description: "Only authentic (sahih/hasan) narrations from reliable sources such as Sahih al-Bukhari, Sahih Muslim, and other recognised collections.",
        reference: "[Collection — Book/Number] — to be added with verification."
    },
    {
        category: "Articles",
        title: "Islamic Articles",
        description: "Educational articles on aqeedah, worship, character, family, and community life.",
        reference: null
    },
    {
        category: "Quiz",
        title: "Islamic Quiz",
        description: "Interactive quizzes to test and grow your Islamic knowledge.",
        reference: null
    },
    {
        category: "Useful Links",
        title: "Trusted Islamic Resources",
        description: "Links to reliable Islamic educational platforms and scholarly resources.",
        reference: null
    }
];