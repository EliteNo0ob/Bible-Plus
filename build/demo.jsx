import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [username, setUsername] = useState('Brandon'); // Username set to Brandon
  const [currentVerse, setCurrentVerse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false); // State for the More menu

  // User-provided image URLs (using contentFetchId for direct access)
  const profilePicUrl = "uploaded:propic.jpg-649c31f3-f10c-47b8-a3dc-9bca8da72276";
  const verseBgImageUrl = "uploaded:view-mountain-with-dreamy-aesthetic.jpg-f2124927-265f-4d19-be5c-796c1270ed0b";

  // Function to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Array of Verses for "Verse of the Day"
  const versesOfTheDay = [
    {
      text: "For where two or three are gathered in my name, there am I among them.",
      reference: "Matthew 18:20 (ESV)"
    },
    {
      text: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13 (NKJV)"
    },
    {
      text: "The Lord is my shepherd; I shall not want.",
      reference: "Psalm 23:1 (KJV)"
    },
    {
      text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      reference: "Matthew 6:33 (NIV)"
    },
    {
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      reference: "John 3:16 (ESV)"
    }
  ];

  // Effect to set a random verse on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * versesOfTheDay.length);
    setCurrentVerse(versesOfTheDay[randomIndex]);
  }, []);

  // Simulated AI responses based on keywords
  const simulatedResponses = {
    "john 3:16": {
      text: "John 3:16 is one of the most well-known verses in the Bible, summarizing the core of Christian belief regarding God's love and the path to salvation. It states: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.'\n\nThis verse emphasizes God's immense love (agape love) for all humanity, demonstrated by the ultimate sacrifice of His Son, Jesus Christ. It highlights the condition for receiving eternal life: belief (faith) in Jesus. The contrast between 'perish' and 'eternal life' underscores the profound stakes of this divine offer. The Greek word for 'world' (kosmos) signifies all of humanity, not just a select group.",
      sources: ["John 3:16 (ESV)", "NIV Study Bible Notes on John 3:16", "Strong's Concordance (G2889 - kosmos)"]
    },
    "genesis 1": {
      text: "Genesis 1 describes the creation of the heavens and the earth by God. It presents a majestic, orderly account of creation over six 'days,' culminating in the creation of humanity in God's image. Key themes include God's sovereignty, the power of His spoken word ('God said...'), the goodness of creation, and the establishment of order from chaos. It lays the theological foundation for God as Creator and humanity's unique place within His creation.",
      sources: ["Genesis 1:1-31 (NIV)", "Tremper Longman III, 'Genesis' (Baker Commentary on the Old Testament)", "John Walton, 'The Lost World of Genesis One'"]
    },
    "paul's letters": {
      text: "Paul's letters (or epistles) are a significant portion of the New Testament, offering foundational theological teaching and practical guidance for early Christian communities. Written by the Apostle Paul, they address various churches and individuals, covering doctrines such as justification by faith, the nature of the church, Christian living, and eschatology. Key letters include Romans, 1 & 2 Corinthians, Galatians, Ephesians, Philippians, and Colossians, among others.",
      sources: ["Romans (NLT)", "Gordon Fee, 'God's Empowering Presence: The Holy Spirit in the Letters of Paul'", "N.T. Wright, 'Paul and the Faithfulness of God'"]
    },
    "what is prayer": {
      text: "Prayer, in a biblical context, is communication with God. It involves speaking to God (adoration, confession, thanksgiving, supplication) and listening to Him. It's a vital aspect of a believer's relationship with God, allowing for communion, expressing dependence, and seeking divine intervention. The Bible presents various forms of prayer, from spontaneous cries to structured petitions, emphasizing sincerity and faith.",
      sources: ["Matthew 6:5-15 (Sermon on the Mount)", "Philippians 4:6-7", "Richard Foster, 'Celebration of Discipline'"]
    },
    "scripture deep dive": {
      text: "Let's dive deep into a significant passage. Consider Romans 8, often called the 'Magna Carta of Christian liberty.' It speaks profoundly about life in the Spirit, freedom from condemnation, the hope of glory, and God's unwavering love. It's a rich chapter for understanding the believer's security in Christ and the work of the Holy Spirit.",
      sources: ["Romans 8 (NIV)", "John Stott, 'The Message of Romans'", "D. Martyn Lloyd-Jones, 'Romans: An Exposition of Chapter 8'"]
    },
    "prayer & reflection": {
      text: "Prayer is a conversation with God, not a monologue. Take a moment to reflect on Psalm 46:10: 'Be still, and know that I am God.' Consider what it means to be still in His presence, to listen, and to truly 'know' Him in a deeper way today. What burdens can you release to Him? What gratitude can you express?",
      sources: ["Psalm 46:10 (KJV)", "Andrew Murray, 'With Christ in the School of Prayer'"]
    },
    "theological concepts": {
      text: "The concept of the Trinity is central to Christian theology: one God existing in three co-equal, co-eternal Persons—Father, Son (Jesus Christ), and Holy Spirit. While a mystery, it's revealed in Scripture and essential for understanding God's nature, salvation, and the Christian life. It's not three gods, but one God in three persons.",
      sources: ["Matthew 28:19", "2 Corinthians 13:14", "Wayne Grudem, 'Systematic Theology'"]
    },
    "historical context": {
      text: "Understanding the historical context of the Gospels is crucial. For example, the political and religious landscape of 1st-century Judea under Roman rule heavily influenced Jesus' ministry and the early church. The tension between Jewish religious leaders (Pharisees, Sadducees), Roman authorities, and various Jewish sects (like the Zealots) provides essential background for many biblical narratives.",
      sources: ["Josephus, 'Antiquities of the Jews'", "Craig Keener, 'The IVP Bible Background Commentary: New Testament'"]
    }
  };

  // Function to simulate AI response
  const getSimulatedAiResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const key in simulatedResponses) {
      if (lowerQuery.includes(key)) {
        return simulatedResponses[key];
      }
    }
    // Default response if no keyword matches
    return {
      text: "I'm still learning and growing! For now, I can provide insights on common biblical topics like 'John 3:16', 'Genesis 1', 'Paul's letters', 'What is prayer?', or try clicking one of the 'AI Guided Journeys' cards!",
      sources: ["The Bible Plus Development Team"]
    };
  };

  // Handle question submission
  const handleSubmit = async (prefilledQuestion = '') => {
    const queryToSubmit = prefilledQuestion || question;
    if (!queryToSubmit.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setShowDisclaimer(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate AI response
    const response = getSimulatedAiResponse(queryToSubmit);
    setAiResponse(response);
    setIsLoading(false);
    setQuestion(''); // Clear input after submission
  };

  const handleSocialAction = (action) => {
    setModalContent(`${action} feature coming soon!`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // Hide modal after 2 seconds
  };

  const handleProfileOrNotificationsClick = (type) => {
    setModalContent(`${type} functionality coming soon!`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleMoreMenuItemClick = (item) => {
    setModalContent(`${item} feature coming soon!`);
    setShowModal(true);
    setShowMoreMenu(false); // Close the menu
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      {/* Tailwind CSS CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Simulated Mobile App Frame */}
      <div className="relative w-full max-w-md h-[90vh] bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-inter text-gray-100 border-8 border-gray-950">
        {/* Top Navigation Menu */}
        <nav className="bg-[#C62828] text-white flex justify-around items-center h-16 shadow-lg rounded-t-2xl">
          {/* Home */}
          <button className="flex flex-col items-center p-2 text-xs font-medium hover:text-[#FFD0D0] transition-colors">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </button>
          {/* Read */}
          <button className="flex flex-col items-center p-2 text-xs font-medium hover:text-[#FFD0D0] transition-colors">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
            Read
          </button>
          {/* Community */}
          <button className="flex flex-col items-center p-2 text-xs font-medium hover:text-[#FFD0D0] transition-colors">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m-2 7h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zm0 0h10"></path></svg>
            Community
          </button>
          {/* Discover */}
          <button className="flex flex-col items-center p-2 text-xs font-medium hover:text-[#FFD0D0] transition-colors">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Discover
          </button>
          {/* More */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center p-2 text-xs font-medium hover:text-[#FFD0D0] transition-colors"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            More
          </button>
        </nav>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 pb-4 bg-gray-800">
          {/* Search Bar */}
          <section className="mb-6">
            <input
              type="text"
              placeholder="Search the Bible, topics, or insights..."
              className="w-full p-3 rounded-full bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:border-transparent text-base shadow-sm"
            />
          </section>

          {/* Greeting & Verse of the Day */}
          <section className="text-center mb-8">
            <p className="text-xl font-medium text-gray-300 mb-2">{getGreeting()}, {username}!</p>
            <h2 className="text-2xl font-bold text-[#C62828] mb-4">Verse of the Day</h2>
            <div className="relative bg-gray-700 p-5 rounded-xl shadow-md border border-gray-600 overflow-hidden">
              {/* Background Image for Verse of the Day */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url('${verseBgImageUrl}')` }}
                onError={(e)=>{e.target.onerror = null; e.target.style.backgroundImage = `url('https://placehold.co/400x200/4B5563/FFFFFF?text=Image+Load+Error')`}}
              ></div>
              <div className="relative z-10"> {/* Ensure text is above image */}
                <p className="text-lg italic text-gray-200 mb-3">
                  "{currentVerse.text}"
                </p>
                <p className="text-md font-semibold text-[#C62828]">— {currentVerse.reference}</p>
              </div>
            </div>
            {/* Like, Comment, Share Buttons */}
            <div className="flex justify-around items-center mt-4 px-4">
              <button onClick={() => handleSocialAction('Like')} className="flex items-center space-x-1 text-gray-300 hover:text-[#C62828] transition-colors active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span className="text-sm">Like</span>
              </button>
              <button onClick={() => handleSocialAction('Comment')} className="flex items-center space-x-1 text-gray-300 hover:text-[#C62828] transition-colors active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.004 9.004 0 01-7.504-4.588M12 2.982c4.97 0 9 3.582 9 8s-4.03 8-9 8-9-3.582-9-8 4.03-8 9-8z"></path></svg>
                <span className="text-sm">Comment</span>
              </button>
              <button onClick={() => handleSocialAction('Share')} className="flex items-center space-x-1 text-gray-300 hover:text-[#C62828] transition-colors active:scale-95">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 6.684m0 6.632a3 3 0 110-6.632m0 6.632l-6.632 3.316m0-3.316l6.632-3.316"></path></svg>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </section>

          {/* AI Guided Items */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-[#C62828] mb-5 text-center">AI Guided Journeys</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => handleSubmit('Scripture Deep Dive')}
                className="bg-gray-700 p-4 rounded-xl shadow-md border border-gray-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-600 transition-colors active:scale-95"
              >
                <svg className="w-8 h-8 text-[#C62828] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                <p className="text-base font-medium text-gray-200">Scripture Deep Dive</p>
              </div>
              <div
                onClick={() => handleSubmit('Prayer & Reflection')}
                className="bg-gray-700 p-4 rounded-xl shadow-md border border-gray-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-600 transition-colors active:scale-95"
              >
                <svg className="w-8 h-8 text-[#C62828] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 0A9.002 9.002 0 0012 21a9.002 9.002 0 00-5.636-3.536m0 0L5.636 18.364m0 0A9.002 9.002 0 013 12c0-5.523 4.477-10 10-10a9.002 9.002 0 015.636 3.536m0 0L18.364 5.636M12 6v6m0 0l-3 3m3-3l3 3"></path></svg>
                <p className="text-base font-medium text-gray-200">Prayer & Reflection</p>
              </div>
              <div
                onClick={() => handleSubmit('Theological Concepts')}
                className="bg-gray-700 p-4 rounded-xl shadow-md border border-gray-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-600 transition-colors active:scale-95"
              >
                <svg className="w-8 h-8 text-[#C62828] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.004 9.004 0 01-7.504-4.588M12 2.982c4.97 0 9 3.582 9 8s-4.03 8-9 8-9-3.582-9-8 4.03-8 9-8z"></path></svg>
                <p className="text-base font-medium text-gray-200">Theological Concepts</p>
              </div>
              <div
                onClick={() => handleSubmit('Historical Context')}
                className="bg-gray-700 p-4 rounded-xl shadow-md border border-gray-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-600 transition-colors active:scale-95"
              >
                <svg className="w-8 h-8 text-[#C62828] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m-2 7h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zm0 0h10"></path></svg>
                <p className="text-base font-medium text-gray-200">Historical Context</p>
              </div>
            </div>
          </section>

          {/* My Saved Insights Section (New Placeholder) */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-[#C62828] mb-5 text-center">My Saved Insights</h3>
            <div className="bg-gray-700 p-5 rounded-xl shadow-md border border-gray-600 text-center text-gray-400 italic">
              <p>Your personalized insights and notes will appear here.</p>
              <p className="text-sm mt-2">Start exploring to save your first insight!</p>
            </div>
          </section>

          {/* Original Demo Section - Ask The AI */}
          <section className="bg-gray-700 rounded-xl shadow-inner p-5 border border-gray-600">
            <h3 className="text-2xl font-semibold text-[#C62828] mb-6 text-center">
              Ask The AI
            </h3>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-500 rounded-lg focus:ring-[#C62828] focus:border-[#C62828] text-base resize-y min-h-[80px] shadow-sm bg-gray-800 text-gray-100"
                placeholder="e.g., What is the meaning of John 3:16? or Tell me about Genesis 1."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => handleSubmit()} // Call with no prefilled question for direct input
                disabled={isLoading || !question.trim()}
                className={`px-6 py-3 text-lg font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#D04045]
                  ${isLoading || !question.trim() ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#C62828] text-white hover:bg-[#A02025]'}`}
              >
                {isLoading ? 'Thinking...' : 'Get Insight'}
              </button>
            </div>

            {/* AI Response Display */}
            {isLoading && (
              <div className="text-center text-[#C62828] text-lg font-medium mt-4">
                <div className="animate-pulse">Processing your query<span className="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>
              </div>
            )}

            {aiResponse && (
              <div className="bg-gray-600 p-5 rounded-lg border border-gray-500 shadow-sm">
                <h4 className="text-xl font-semibold text-[#C62828] mb-3">AI Insight:</h4>
                <p className="text-base text-gray-100 leading-relaxed whitespace-pre-wrap">{aiResponse.text}</p>
                <div className="mt-5 pt-3 border-t border-gray-500">
                  <p className="text-xs font-medium text-[#C62828] mb-1">Sources Cited (Simulated):</p>
                  <ul className="list-disc list-inside text-xs text-gray-300">
                    {aiResponse.sources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {showDisclaimer && (
              <div className="mt-6 p-3 bg-yellow-900 border border-yellow-700 text-yellow-300 rounded-lg text-xs text-center">
                **Disclaimer:** This is a demo. Responses and sources are simulated to showcase the app's potential. "The Bible Plus" is currently in its strategic planning and architectural structuring phase, focused on building a truly ethical and trustworthy AI foundation.
              </div>
            )}
          </section>

          {/* Footer - Simplified for app context */}
          <footer className="text-center text-gray-400 text-xs mt-8">
            <p>&copy; {new Date().getFullYear()} The Bible Plus. Built with a vision for truth.</p>
          </footer>
        </main>

        {/* Bottom Bar (Profile, Notifications, AI Button) */}
        <footer className="flex items-center justify-between p-4 bg-[#C62828] text-white shadow-md rounded-b-2xl h-16">
          {/* Profile Picture */}
          <button onClick={() => handleProfileOrNotificationsClick('Profile')} className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white overflow-hidden">
              <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" onError={(e)=>{e.target.onerror = null; e.target.src='https://placehold.co/40x40/C62828/FFFFFF?text=BR'}} />
            </div>
          </button>
          {/* AI Button (Centered and less apparent) */}
          <button className="p-2 bg-[#A02025] rounded-full shadow-lg hover:bg-[#801A1E] transition-colors transform active:scale-95 flex-grow-0">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </button>
          {/* Notifications Bell */}
          <button onClick={() => handleProfileOrNotificationsClick('Notifications')} className="text-white p-2 rounded-full hover:bg-[#A02025] transition-colors flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </footer>

        {/* Modal for "Coming Soon" messages */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-700 p-8 rounded-xl shadow-lg text-center border border-gray-600">
              <p className="text-xl text-gray-100 font-semibold mb-4">{modalContent}</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-[#C2B027] text-white rounded-full hover:bg-[#A19020] transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}

        {/* More Menu Overlay */}
        {showMoreMenu && (
          <div className="absolute inset-0 flex justify-end z-40 bg-black bg-opacity-75"> {/* Overlay within app frame */}
            <div className="w-64 bg-gray-900 h-full shadow-lg p-6 flex flex-col rounded-l-2xl">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* User Profile in Menu */}
              <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-700">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" onError={(e)=>{e.target.onerror = null; e.target.src='https://placehold.co/48x48/C1272D/FFFFFF?text=BR'}} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">{username}</p>
                </div>
              </div>

              {/* Menu Items */}
              <ul className="space-y-4 flex-1">
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Friends')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m-2 7h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zm0 0h10"></path></svg>
                    <span>Friends</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Prayer')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                    <span>Prayer</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Your Activity')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    <span>Your Activity</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Saved')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    <span>Saved</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Share The Bible +')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 6.684m0 6.632a3 3 0 110-6.632m0 6.632l-6.632 3.316m0-3.316l6.632-3.316"></path></svg>
                    <span>Share The Bible +</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('About')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>About</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Giving')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span>Giving</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Language')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0112 15c0 1.657 1.007 3 2.238 3h.027a2.5 2.5 0 002.238-2.238V12c0-1.657-1.007-3-2.238-3H12c-1.231 0-2.238 1.343-2.238 3v.027a2.5 2.5 0 01-2.238 2.238H7.5M14 12h.01M17 12h.01"></path></svg>
                    <span>Language</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Settings')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Settings</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleMoreMenuItemClick('Help')} className="flex items-center space-x-3 text-gray-300 hover:text-[#C2B027] transition-colors text-lg w-full text-left">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.228a4.5 4.5 0 116.364 0M12 20V10m0 0a4 4 0 01-4-4h8a4 4 0 01-4 4z"></path></svg>
                    <span>Help</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CSS for typing animation dots */}
        <style>
          {`
          .typing-dots span {
            opacity: 0;
            animation: blink 1s infinite;
          }
          .typing-dots span:nth-child(1) {
            animation-delay: 0s;
          }
          .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          `}
        </style>
      </div>
    </div>
  );
};

export default App;